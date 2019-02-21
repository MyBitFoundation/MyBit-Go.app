/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import React from 'react';
import Web3 from 'web3';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'next/router';
import { withAirtableContext } from 'components/Airtable';
import { withNotificationsContext } from 'components/Notifications';
import * as Brain from '../apis/brain';
import getConfig from 'next/config';

import {
  ErrorTypes,
  InternalLinks,
  NotificationTypes,
  NotificationsMetamask,
  NotificationStatus,
  MYBIT_TICKER_COINMARKETCAP,
  ETHEREUM_TICKER_COINMARKETCAP,
  CORRECT_NETWORK,
  FETCH_ASSETS_TIME,
  LOAD_METAMASK_USER_DETAILS_TIME,
  FETCH_TRANSACTION_HISTORY_TIME,
  LOAD_PRICES_TIME,
} from '../constants';

import {
  debug,
} from '../utils/helpers';

const { Provider, Consumer } = React.createContext({});

export const withBlockchainContext = (Component) =>
  (props) => (
    <Consumer>
        {state => <Component {...props} blockchainContext={state} />}
    </Consumer>
  )

class BlockchainProvider extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAssets = this.fetchAssets.bind(this);
    this.loadMetamaskUserDetails = this.loadMetamaskUserDetails.bind(this);
    this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
    this.loadPrices = this.loadPrices.bind(this);
    this.fundAsset = this.fundAsset.bind(this);
    this.handleMetamaskUpdate = this.handleMetamaskUpdate.bind(this);
    this.handleAssetFavorited = this.handleAssetFavorited.bind(this);
    this.handleListAsset = this.handleListAsset.bind(this);
    this.withdrawInvestorProfit = this.withdrawInvestorProfit.bind(this);
    this.withdrawCollateral = this.withdrawCollateral.bind(this);
    this.withdrawProfitAssetManager = this.withdrawProfitAssetManager.bind(this);
    this.isReadOnlyMode = this.isReadOnlyMode.bind(this);
    this.airtableContextUpdates = 0;
    this.state = {
      loading: {
        assets: true,
        priceMybit: true,
        priceEther: true,
        user: true,
        transactionHistory: true,
      },
      transactions: [],
      assets: [],
      prices: {},
      fetchAssets: this.fetchAssets,
      fetchTransactionHistory: this.fetchTransactionHistory,
      fetchMyBit: this.getMYB,
      fundAsset: this.fundAsset,
      user: this.props.user || {},
      userHasMetamask: this.props.isMetamaskInstalled,
      network: this.props.network,
      isBraveBrowser: this.props.isBraveBrowser,
      extensionUrl: this.props.extensionUrl,
      enabled: this.props.enabled,
      userIsLoggedIn: this.props.isLoggedIn,
      handleAssetFavorited: this.handleAssetFavorited,
      handleListAsset: this.handleListAsset,
      withdrawInvestorProfit: this.withdrawInvestorProfit,
      withdrawCollateral: this.withdrawCollateral,
      withdrawProfitAssetManager: this.withdrawProfitAssetManager,
      isReadOnlyMode: this.isReadOnlyMode,
      isUserContributing: false,
      withdrawingAssetIds: [],
      withdrawingCollateral: [],
      withdrawingAssetManager: [],
      isLoadingUserInfo: false,
    };
  }

  componentDidMount = async () => {
    try {

      await this.loadPrices()
      const { publicRuntimeConfig } = getConfig();

      //case where user has metamask but is connected to the wrong network, we
      //still need to load the data properly from the correct network
      if(this.state.userHasMetamask && (this.state.network !== CORRECT_NETWORK)){
        window.web3js = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${publicRuntimeConfig.REACT_APP_INFURA_API_KEY}`))
      }

      this.loadMetamaskUserDetails();
      this.fetchAssets();
      this.fetchTransactionHistory();

    } catch (err) {
      debug(err);
    }
    this.createIntervals();
  }

  componentWillReceiveProps = (nextProps) => {
    const currentEnabled = this.state.enabled;
    const currentUsername = this.state.user.userName;
    const currentUserIsLoggedIn = this.state.userIsLoggedIn;
    const currentBalance = this.state.user.balance;

    const newUserAddress = nextProps.user.userName;
    const newIsUserLoggedIn = nextProps.isLoggedIn;
    const newEnabled = nextProps.enabled;
    const newBalance = nextProps.balance;

    // case where account, login or enabled variable change
    if((newUserAddress && (currentUsername !== newUserAddress)) || (currentUserIsLoggedIn !== newIsUserLoggedIn) || (currentEnabled !== newEnabled)){
      console.log("updating state 1")
      this.setState({
        user: nextProps.user,
        userIsLoggedIn: nextProps.isLoggedIn,
        enabled: nextProps.enabled
      }, () => this.handleMetamaskUpdate());
    }
    if(newBalance && (currentBalance !== newBalance)){
      console.log("updating state 2")
      this.setState({
        user: {
          ...this.state.user,
          balance: nextProps.user.balance,
        },
      })
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    const {
      assets,
      prices,
      user,
      userHasMetamask,
      userIsLoggedIn,
      airtableContext,
      enabled,
      withdrawingAssetIds,
      withdrawingCollateral,
      withdrawingAssetManager,
      isUserContributing,
    } = this.state;

    const {
      router,
    } = this.props;

    if(nextProps.user.ethBalance !== user.ethBalance){
      console.log("\n\nupdated balance\n\n")
      return true;
    } else if(nextProps.user.userName !== user.userName){
      console.log("\n\nupdated username\n\n")
      return true;
    } else if(nextProps.isLoggedIn !== userIsLoggedIn){
      console.log("\n\nupdated login\n\n")
      return true;
    } else if(nextProps.enabled !== enabled){
      console.log("\n\nupdated enabled\n\n")
      return true;
    } else if(assets != nextState.assets){
      return true;
    } else if((prices.ether && nextState.prices.ether) && (prices.ether.price !== nextState.prices.ether.price)){
      console.log("\n\nupdated prices\n\n");
      return true;
    } else if(withdrawingAssetIds !== nextState.withdrawingAssetIds){
      console.log("\n\nupdated withdrawingAssetIds\n\n");
      return true;
    } else if(withdrawingCollateral !== nextState.withdrawingCollateral){
      console.log("\n\nupdated withdrawingCollateral\n\n");
      return true;
    } else if(withdrawingAssetManager !== nextState.withdrawingAssetManager){
      console.log("\n\nupdated withdrawingAssetManager\n\n");
      return true;
    } else if(isUserContributing !== nextState.isUserContributing){
      console.log("\n\nupdated isUserContributing\n\n");
      return true;
    } else if(router.pathname !== nextProps.router.pathname){
      console.log("\n\nupdated pathname\n\n");
      return true;
    }

    return false;
  }

  componentWillUnmount = () => {
    this.resetIntervals();
  }

  createIntervals = () => {
    this.intervalFetchAssets =
      setInterval(this.fetchAssets, FETCH_ASSETS_TIME);
    this.intervalFetchTransactionHistory =
      setInterval(this.fetchTransactionHistory, FETCH_TRANSACTION_HISTORY_TIME);
    this.intervalLoadMetamaskUserDetails =
      setInterval(this.loadMetamaskUserDetails, LOAD_METAMASK_USER_DETAILS_TIME);
    this.intervalLoadPrices = setInterval(this.loadPrices, LOAD_PRICES_TIME);
  }

  resetIntervals = () => {
    clearInterval(this.intervalFetchAssets);
    clearInterval(this.intervalFetchTransactionHistory);
    clearInterval(this.intervalLoadMetamaskUserDetails);
    clearInterval(this.intervalLoadPrices);
  }

  isReadOnlyMode = () => {
    const {
      userHasMetamask,
      userIsLoggedIn,
      network,
      enabled,
    } = this.state;

    return !userHasMetamask || !userIsLoggedIn || network !== CORRECT_NETWORK || !enabled;
  }

  pullFileInfoForAssets = async (assets) => {
    try{
      const response = await axios(InternalLinks.S3_ASSET_FILES);

      const filesByassetId = response.data.filesByAssetId;

      for(const asset of assets){
        const assetId = asset.assetId;
        if(filesByassetId[assetId]){
          asset.files = filesByassetId[assetId];
        }
      }
      return assets;
    }catch(err){
      debug("Error pulling files from server");
      debug(err)
      return assets;
    }
  }

  withdrawProfitAssetManager = async (asset, amount, updateAssetCollateralPage) => {
    const {
      assetId,
      name: assetName,
    } = asset;

    const {
      buildNotification,
    } = this.props.notificationsContext;

    const notificationId = Date.now();

    //update state so users can't trigger the withdrawal multiple times
    const withdrawingAssetManager = this.state.withdrawingAssetManager.slice();
    withdrawingAssetManager.push(assetId);
    this.setState({
      withdrawingAssetManager,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.WITHDRAW_MANAGER,
      assetName,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.INFO, {
        assetName,
      });
    }

    const onReceipt = (wasSuccessful) => {
      if(wasSuccessful){
        onSuccess();
      } else{
        onError(ErrorTypes.ETHEREUM);
      }
    }

    const onError = (type) => {
      updatewithdrawingAssetManager();
      if(type === ErrorTypes.METAMASK){
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.WITHDRAW_MANAGER,
          assetName,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.ERROR, {
          assetName,
        });
      }
    }

    const updatewithdrawingAssetManager = () => {
      let withdrawingAssetManager = this.state.withdrawingAssetManager.slice();
      withdrawingAssetManager = withdrawingAssetManager.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        withdrawingAssetManager,
      });
    }

    const onSuccess = () => {
      updateAssetCollateralPage(() => {
        updatewithdrawingAssetManager();
        buildNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.SUCCESS, {
          assetName,
          amount,
        });
      })
    }

    await Brain.withdrawAssetManager(
      this.state.user.userName,
      assetId,
      onTransactionHash,
      onReceipt,
      onError,
    );
  }

  withdrawCollateral = async (asset, percentage, amount, updateAssetCollateralPage) => {
    const {
      assetId,
      name: assetName,
    } = asset;

    const {
      buildNotification,
    } = this.props.notificationsContext;

    const notificationId = Date.now();

    //update state so users can't trigger the withdrawal multiple times
    const withdrawingCollateral = this.state.withdrawingCollateral.slice();
    withdrawingCollateral.push(assetId);
    this.setState({
      withdrawingCollateral,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.WITHDRAW_COLLATERAL,
      assetName,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.INFO, {
        assetName,
      });
    }

    const onReceipt = (wasSuccessful) => {
      if(wasSuccessful){
        onSuccess();
      } else{
        onError(ErrorTypes.ETHEREUM);
      }
    }

    const onError = (type) => {
      updateWithdrawingCollateral();
      if(type === ErrorTypes.METAMASK){
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.WITHDRAW_COLLATERAL,
          assetName,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.ERROR, {
          assetName,
        });
      }
    }

    const updateWithdrawingCollateral = () => {
      let withdrawingCollateral = this.state.withdrawingCollateral.slice();
      withdrawingCollateral = withdrawingCollateral.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        withdrawingCollateral,
      });
    }

    const onSuccess = () => {
      updateAssetCollateralPage(() => {
        updateWithdrawingCollateral();
        buildNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.SUCCESS, {
          assetName,
          percentage,
          amount,
        });
      })
    }

    await Brain.withdrawEscrow(
      this.state.user.userName,
      assetId,
      onTransactionHash,
      onReceipt,
      onError,
    );

  }

  handleListAsset = async (formData, setUserListingAsset) => {
    const {
      asset: assetName,
      userCountry: country,
      userCity: city,
      managementFee,
      category,
      fileList,
      collateralMyb,
      collateralPercentage
    } = formData;

    const {
      categoriesAirTable,
    } = this.props.airtableContext;

    const {
      buildNotification,
    } = this.props.notificationsContext;

    const userAddress =  this.state.user.userName;
    const notificationId = Date.now();

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.LIST_ASSET,
      assetName,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
        assetName,
      });
    }

    const onReceipt = (wasSuccessful, assetId) => {
      if(wasSuccessful){
        onSuccess(assetId);
      } else{
        onError(ErrorTypes.ETHEREUM);
      }
    }

    const onSuccess = async (assetId) => {
      const numberOfInternalActions = 2;
      const numberOfInternalActionsWithFileUpload = numberOfInternalActions + 1;
      const filesUploaded = fileList.length > 0;
      const requiredCallsToInternalActions = filesUploaded ? numberOfInternalActionsWithFileUpload : numberOfInternalActions;
      let counterCallsToInternalActions = 0;

      // we need to perform a few actions before declaring the listing of the asset as successful
      const performInternalAction = async () => {
        counterCallsToInternalActions++;
        if(counterCallsToInternalActions === requiredCallsToInternalActions){
          await this.getAssetsFromAirTable();
          await this.fetchAssets();

          buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
            assetName,
            assetId,
          });
          setUserListingAsset(false, assetId);
        }
      }

      const collateral = window.web3js.utils.toWei(collateralMyb.toString(), 'ether');

      Brain.updateAirTableWithNewAsset(assetId, assetName, country, city, collateralMyb, collateralPercentage, performInternalAction)
      Brain.createEntryForNewCollateral(userAddress, collateral, assetId, performInternalAction);
      filesUploaded && Brain.uploadFilesToAWS(assetId, fileList, performInternalAction);
    }

    const onError = (type) => {
      setUserListingAsset(false);
      if(type === ErrorTypes.METAMASK){
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          assetName,
          operationType: NotificationsMetamask.LIST_ASSET,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.ERROR, {
          assetName,
        });
      }
    }

    const {
      getAssetByName,
      assetsAirTable,
    } = this.props.airtableContext;

    await Brain.createAsset(onTransactionHash, onReceipt, onError, {
      managerPercentage: managementFee,
      assetType: categoriesAirTable[category].encoded,
      amountToBeRaisedInUSD: getAssetByName(assetName, assetsAirTable).amountToBeRaisedInUSDAirtable,
      assetName,
      country,
      city,
      fileList,
      collateralMyb,
      collateralPercentage,
      userAddress,
    });
  }

  fundAsset(assetId, amount, onSuccessConfirmationPopup, onFailureContributionPopup, amountDollars) {
    try {
      const currentAsset = this.state.assets.find(item => item.assetId === assetId);
      const notificationId = Date.now();
      const {
        name : assetName,
      } = currentAsset;

      const {
        buildNotification,
      } = this.props.notificationsContext;

      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.FUNDING,
        assetName,
      });

      const onTransactionHash = () => {
        buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.INFO, {
          assetName,
          amount: amountDollars,
        });
      }

      const onReceipt = (wasSuccessful) => {
        if(wasSuccessful){
          onSuccessRefreshData();
        } else {
          onError(ErrorTypes.ETHEREUM)
        }
      }

      const onError = (type) => {
        onFailureContributionPopup();
        if(type === ErrorTypes.METAMASK){
          buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.FUNDING,
          });
        } else {
          buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.ERROR, {
            assetName,
          });
        }
      }

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
        onSuccessConfirmationPopup();
        buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.SUCCESS, {
          assetName,
          amount: amountDollars,
        });
      }

      Brain.fundAsset(
        this.state.user.userName,
        assetId,
        amount,
        onTransactionHash,
        onReceipt,
        onError,
      );

    } catch (err) {
      debug(err);
    }
  }

  withdrawInvestorProfit = async (assetId, amount) => {
    try {
      const currentAsset = this.state.assets.find(item => item.assetId === assetId);
      const{
        name: assetName,
      } = currentAsset;

      const {
        buildNotification,
      } = this.props.notificationsContext;

      const notificationId = Date.now();

      // save the the assetId so the user doesn't trigger twice while we
      // perform the action
      const withdrawingAssetIds = this.state.withdrawingAssetIds.slice();
      withdrawingAssetIds.push(assetId);
      this.setState({
        withdrawingAssetIds,
      })

      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.WITHDRAW_INVESTOR,
        assetName,
      });

      const onTransactionHash = () => {
        buildNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.INFO, {
          assetName,
          amount,
        });
      }

      const onReceipt = (wasSuccessful) => {
        if(wasSuccessful){
          onSuccessRefreshData();
        } else {
          onError(ErrorTypes.ETHEREUM);
        }
      }

      const onError = (type) => {
        removeassetIdFromList();
        if(type === ErrorTypes.METAMASK){
          buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.WITHDRAW_INVESTOR,
          });
        } else {
          buildNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.ERROR, {
            assetName,
          });
        }
      }

      const removeassetIdFromList = () => {
        let withdrawingAssetIds = this.state.withdrawingAssetIds.slice();
        withdrawingAssetIds = withdrawingAssetIds.filter(assetIdTmp => assetIdTmp !== assetId);
        this.setState({
          withdrawingAssetIds,
        })
      }

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
        removeassetIdFromList();
        buildNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.SUCCESS, {
          assetName,
          amount,
        });
      }

      await Brain.withdrawInvestorProfit(
        this.state.user.userName,
        currentAsset.assetId,
        onTransactionHash,
        onReceipt,
        onError,
      );

    } catch (err) {
      debug(err);
    }
  }

  handleAssetFavorited = (assetId) => {
    const searchQuery = `mybit_watchlist_${assetId}`;
    const alreadyFavorite = window.localStorage.getItem(searchQuery) === 'true';
    if (alreadyFavorite) {
      localStorage.removeItem(searchQuery);
    } else {
      localStorage.setItem(searchQuery, true);
    }

    const assets = this.state.assets.slice();
    const asset = assets.filter(assetToFilter => assetToFilter.assetId === assetId)[0];

    asset.watchListed = !alreadyFavorite;

    this.setState({
      assets,
    });
  }

  resetNotifications = () => {
    this.setState({
      notifications: [],
    });
  }

  handleMetamaskUpdate = async () => {
    const {
      userIsLoggedIn,
    } = this.state;

    this.loadMetamaskUserDetails();
    this.fetchAssets();
    this.fetchTransactionHistory();
    this.resetNotifications();

    console.log("updating state 3")
    this.setState({
      loading: {
        ...this.state.loading,
        userAssetsInfo: true,
        transactionHistory: !userIsLoggedIn ? false : true,
      },
    });
  }

  loadMetamaskUserDetails = async () => {
    await Brain.loadMetamaskUserDetails()
      .then((response) => {
        this.setState({
          user: response || {},
          loading: { ...this.state.loading, user: false },
        });
      })
      .catch((err) => {
        debug(err);
        if (this.state.userIsLoggedIn) {
          setTimeout(this.loadMetamaskUserDetails, 5000);
        }
      });
  }

  fetchTransactionHistory = async () =>  {
    if(!this.state.user.userName){
      this.setState({
        transactions: [],
        loading: {
          ...this.state.loading,
          transactionHistory: false,
        },
      })
      return;
    }
    await Brain.fetchTransactionHistory(this.state.user.userName)
      .then((response) => {
        this.setState({
          transactions: response,
          loading: { ...this.state.loading, transactionHistory: false },
        });
      })
      .catch((err) => {
        debug(err);
        if (this.state.userIsLoggedIn) {
          setTimeout(this.fetchTransactionHistory, 5000);
        }
      });
  }

  fetchAssets = async () => {
    const {
      prices,
      user,
    } = this.state;

    const {
      categoriesAirTable,
      assetsAirTableById,
    } = this.props.airtableContext;

    if (!prices.ether || !assetsAirTableById || !categoriesAirTable) {
      setTimeout(this.fetchAssets, 10000);
      return;
    }

    await Brain.fetchAssets(user.userName, prices.ether.price, assetsAirTableById, categoriesAirTable)
      .then( async (response) => {
        const updatedAssets = await this.pullFileInfoForAssets(response);
        console.log("updating state with new assets")
        this.setState({
          assets: updatedAssets,
          loading: {
            ...this.state.loading,
            assets: false,
            userAssetsInfo: false,
          },
        });
      })
      .catch((err) => {
        console.log("ERRRRRR")
        console.log(err)
        debug(err);
        if (this.state.userIsLoggedIn) {
          setTimeout(this.fetchAssets, 5000);
        }
      });
  }

  loadPrices = async () => {
    try{
      const priceInfoMyb = await Brain.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP)
      const priceInfoEther = await Brain.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP)

      this.setState({
        prices: {
          mybit: {
            price: priceInfoMyb.price,
            priceChangePercentage: priceInfoMyb.priceChangePercentage,
          },
          ether: {
            price: priceInfoEther.price,
            priceChangePercentage: priceInfoEther.priceChangePercentage,
          },
        },
        loading: {
          ...this.state.loading,
          priceMybit: false,
          priceEther: false,
        },
      });
    } catch(err) {
      debug(err);
      setTimeout(this.loadPrices, 5000);
    }
  }

  render = () => {
    console.log("RERENDERING BLOCKCHAIN")
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

BlockchainProvider.defaultProps = {
  isBraveBrowser: false,
  isLoggedIn: false,
  network: undefined,
  isMetamaskInstalled: false,
  extensionUrl: undefined,
};

BlockchainProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isMetamaskInstalled: PropTypes.bool,
  network: PropTypes.string,
  isBraveBrowser: PropTypes.bool,
  extensionUrl: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};

export default withRouter(withNotificationsContext(withAirtableContext(BlockchainProvider)));
