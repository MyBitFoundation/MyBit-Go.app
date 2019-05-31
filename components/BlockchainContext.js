/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import { compose } from 'recompose'
import Web3 from 'web3';
import PropTypes from 'prop-types';
import axios from 'axios';
import BN from 'bignumber.js';
import { withAirtableContext } from 'components/AirtableContext';
import { withNotificationsContext } from 'components/NotificationsContext';
import { withMetamaskContext } from 'components/MetamaskContext';
import * as Brain from '../apis/brain';

import { ErrorTypes } from 'constants/errorTypes';
import {InternalLinks } from 'constants/links';
import {
  NotificationTypes,
  NotificationsMetamask,
  NotificationStatus,
} from 'constants/notifications';
import {
  FETCH_ASSETS_TIME,
  LOAD_METAMASK_USER_DETAILS_TIME,
  FETCH_TRANSACTION_HISTORY_TIME,
  FETCH_GAS_PRICE,
} from 'constants/timers';
import {
  debug,
  formatMonetaryValue,
  fromWeiToEth,
} from 'utils/helpers';
import {
  PLATFORM_TOKEN,
} from 'constants/app';
import {
  SUPPORTED_NETWORKS,
  FALLBACK_NETWORK,
  CONTRACTS_PATH,
} from 'constants/supportedNetworks';

BN.config({ EXPONENTIAL_AT: 80 });

const { Provider, Consumer } = React.createContext({});

// Required so we can trigger getInitialProps in our exported pages
export const withBlockchainContext = (Component) => {
  return class Higher extends React.Component{
    static getInitialProps(ctx) {
      if(Component.getInitialProps)
        return Component.getInitialProps(ctx);
      else return {};
    }
    render(){
      return (
        <Consumer>
          {state => <Component {...this.props} blockchainContext={state} />}
        </Consumer>
      )
    }
  }
}

class BlockchainProvider extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAssets = this.fetchAssets.bind(this);
    this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
    this.fundAsset = this.fundAsset.bind(this);
    this.handleMetamaskUpdate = this.handleMetamaskUpdate.bind(this);
    this.handleAssetFavorited = this.handleAssetFavorited.bind(this);
    this.handleListAsset = this.handleListAsset.bind(this);
    this.withdrawInvestorProfit = this.withdrawInvestorProfit.bind(this);
    this.withdrawCollateral = this.withdrawCollateral.bind(this);
    this.withdrawProfitAssetManager = this.withdrawProfitAssetManager.bind(this);
    this.state = {
      loading: {
        assets: true,
        transactionHistory: true,
      },
      transactions: [],
      assets: [],
      fetchAssets: this.fetchAssets,
      fetchTransactionHistory: this.fetchTransactionHistory,
      fundAsset: this.fundAsset,
      handleAssetFavorited: this.handleAssetFavorited,
      handleListAsset: this.handleListAsset,
      withdrawInvestorProfit: this.withdrawInvestorProfit,
      withdrawCollateral: this.withdrawCollateral,
      withdrawProfitAssetManager: this.withdrawProfitAssetManager,
      payoutAsset: this.payoutAsset,
      isUserContributing: false,
      withdrawingAssetIds: [],
      withdrawingCollateral: [],
      callingPayout: [],
      withdrawingAssetManager: [],
      gasPrice: '10000000000', //10 GWEI
      assetManagers: {},
    };

    const network = this.props.metamaskContext.network;

    Brain.initialiseSDK(SUPPORTED_NETWORKS.includes(network) ? CONTRACTS_PATH[network] : CONTRACTS_PATH['default']);
  }

  componentDidMount = async () => {
    try {
      this.fetchAssets();
      this.fetchTransactionHistory();
      this.fetchGasPrice();
    } catch (err) {
      debug(err);
    }
    this.createIntervals();
  }

  // handle case where account, login, enabled or network variable change
  componentDidUpdate = async prevProps => {
    const {
      metamaskContext: oldProps,
    } = prevProps;

    const {
      metamaskContext: newProps,
    } = this.props;

    const oldEnabled = oldProps.privacyModeEnabled;
    const oldUsername = oldProps.user.address;
    const oldUserIsLoggedIn = oldProps.userIsLoggedIn;
    const oldNetwork = oldProps.network;

    const newUserAddress = newProps.user.address;
    const newIsUserLoggedIn = newProps.userIsLoggedIn;
    const newEnabled = newProps.privacyModeEnabled;
    const newNetwork = newProps.network;

    if((newUserAddress && (oldUsername !== newUserAddress)) || (oldUserIsLoggedIn !== newIsUserLoggedIn) || (oldEnabled !== newEnabled)){
      console.log("Updating assets due to a change in: address or login or privacy mode")
      this.handleMetamaskUpdate();
    } else if(newNetwork !== oldNetwork){
      this.setState({
        loading: {
          ...this.state.loading,
          assets: true,
          userAssetsInfo: true,
          transactionHistory: true,
        }
      })
      const isASupportedNetwork = SUPPORTED_NETWORKS.includes(newNetwork);
      Brain.initialiseSDK(isASupportedNetwork ? CONTRACTS_PATH[newNetwork] : CONTRACTS_PATH['default']);
      isASupportedNetwork && await this.props.airtableContext.forceRefresh(newNetwork)
      this.fetchAssets();
      this.fetchTransactionHistory();
    }
  }

  componentWillUnmount = () => {
    this.resetIntervals();
  }

  createIntervals = () => {
    this.intervalFetchAssets =
      setInterval(() => this.fetchAssets(this.props.metamaskContext.network), FETCH_ASSETS_TIME);
    this.intervalFetchTransactionHistory =
      setInterval(this.fetchTransactionHistory, FETCH_TRANSACTION_HISTORY_TIME);
    this.intervalFetchGasPrice =
      setInterval(this.fetchGasPrice, FETCH_GAS_PRICE);
  }

  resetIntervals = () => {
    clearInterval(this.intervalFetchAssets);
    clearInterval(this.intervalFetchTransactionHistory);
    clearInterval(this.intervalFetchGasPrice);
  }

  fetchGasPrice = async () => {
    let {
      gasPrice,
    } = this.state;

    try{
      const response = await axios(InternalLinks.GAS_PRICE);
      if(response.data){
        const {
          fast,
        } = response.data;

        gasPrice = BN(fast).times(100000000).toString(); //converts to WEI, from GWEI
      }
    }catch(err){
      debug("Error pulling gas price");
      debug(err)
    }
    this.setState({
      gasPrice,
    })
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

  payoutAsset = async asset => {
    const {
      gasPrice,
    } = this.state;

    const {
      assetId,
      defaultData
    } = asset;

    const {
      name: assetName,
    } = defaultData;

    const {
      buildNotification,
    } = this.props.notificationsContext;

    const notificationId = Date.now();

    //update state so users can't trigger payout multiple times
    const callingPayout = this.state.callingPayout.slice();
    callingPayout.push(assetId);
    this.setState({
      callingPayout,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.ASSET_PAYOUT,
      assetName,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.ASSET_PAYOUT, NotificationStatus.INFO, {
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
      updateCallingPayout();
      if(type === ErrorTypes.METAMASK){
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.ASSET_PAYOUT
        });
      } else {
        buildNotification(notificationId, NotificationTypes.ASSET_PAYOUT, NotificationStatus.ERROR);
      }
    }

    const updateCallingPayout = () => {
      let callingPayout = this.state.callingPayout.slice();
      callingPayout = callingPayout.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        callingPayout,
      });
    }

    const onSuccess = async () => {
      await Promise.all([this.fetchAssets(), this.fetchTransactionHistory]);
      updateCallingPayout();
      buildNotification(notificationId, NotificationTypes.ASSET_PAYOUT, NotificationStatus.SUCCESS, {
        assetName,
      });
    }

    Brain.payoutAsset({
      userAddress: this.props.metamaskContext.user.address,
      assetId,
      onTransactionHash,
      onReceipt: receipt => onReceipt(receipt.status),
      onError,
      gasPrice,
    });
  }

  withdrawProfitAssetManager = async (asset, amount) => {
    const {
      gasPrice,
    } = this.state;

    const {
      assetId,
      defaultData
    } = asset;

    const {
      name: assetName,
    } = defaultData;

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

    const onSuccess = async () => {
      await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
      updatewithdrawingAssetManager();
      buildNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.SUCCESS, {
        assetName,
        amount: formatMonetaryValue(amount),
      });
    }

    Brain.withdrawAssetManager(
      this.props.metamaskContext.user.address,
      assetId,
      onTransactionHash,
      onReceipt,
      onError,
      gasPrice,
    );
  }

  withdrawCollateral = async (asset, percentage, amount, updateAssetCollateralPage) => {
    const {
      gasPrice,
    } = this.state;

    const {
      assetId,
      defaultData,
    } = asset;

    const {
      name: assetName,
    } = defaultData;

    const {
      buildNotification,
    } = this.props.notificationsContext;

    const notificationId = Date.now();
    const formattedAmount = formatMonetaryValue(amount, PLATFORM_TOKEN);

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

    const onSuccess = async () => {
      await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
      updateWithdrawingCollateral();
      buildNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.SUCCESS, {
        assetName,
        percentage,
        amount: formattedAmount,
      });
    }

    Brain.withdrawEscrow(
      this.props.metamaskContext.user.address,
      assetId,
      onTransactionHash,
      onReceipt,
      onError,
      gasPrice,
    );

  }

  handleListAsset = async (formData, setUserListingAsset, assetManagerEmail) => {
    const {
      gasPrice,
    } = this.state;

    const {
      metamaskContext,
      airtableContext,
      notificationsContext,
    } = this.props;

    const {
      asset: assetName,
      userCountry: country,
      userCity: city,
      managementFee,
      category,
      fileList,
      collateralSelectedToken,
      collateralPercentage,
      partnerContractAddress,
      paymentTokenAddress,
      selectedToken,
      assetValue,
      operatorId,
    } = formData;

    const { categoriesAirTable } = airtableContext;

    const { buildNotification } = notificationsContext;

    const {
      user,
      network,
    } = metamaskContext;

    const userAddress =  user.address;
    const notificationId = Date.now();

    if(selectedToken !== 'ETH') {
      // Going to call Approve
      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.APPROVE,
        formattedAmount: formatMonetaryValue(collateralSelectedToken, selectedToken),
      });
    } else {
      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.LIST_ASSET,
        assetName,
      });
    }

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
        assetName,
      });
    }

    const onTransactionHashApprove = () => {
      buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
        formattedAmount: formatMonetaryValue(collateralSelectedToken, selectedToken),
        type: NotificationTypes.APPROVE,
      });
    }

    const onReceipt = (assetId) => {
      onSuccess(assetId);
    }

    const onReceiptApprove = wasSuccessful => {
      if(wasSuccessful){
        buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
          formattedAmount: formatMonetaryValue(collateralSelectedToken, selectedToken),
          type: NotificationTypes.APPROVE,
        });
      } else {
        onError(ErrorTypes.ETHEREUM)
      }
    }

    const onSuccess = async (assetId) => {
      const {
        airtableContext,
      } = this.props;
      const numberOfInternalActions = 1;
      const numberOfInternalActionsWithFileUpload = numberOfInternalActions + 1;
      const filesUploaded = fileList.length > 0;
      const requiredCallsToInternalActions = filesUploaded ? numberOfInternalActionsWithFileUpload : numberOfInternalActions;
      let counterCallsToInternalActions = 0;

      // we need to perform a few actions before declaring the listing of the asset as successful
      const performInternalAction = async () => {
        counterCallsToInternalActions++;
        if(counterCallsToInternalActions === requiredCallsToInternalActions){
          await airtableContext.forceRefresh();
          await this.fetchAssets();
          buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
            assetName,
            assetId,
          });
          setUserListingAsset(false, assetId);
        }
      }

      Brain.updateAirTableWithNewAsset(assetId, assetName, country, city, collateralPercentage, assetManagerEmail, performInternalAction)
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

    await Brain.createAsset({
        onTransactionHash,
        onReceipt,
        onError,
      }, {
        onTransactionHash: onTransactionHashApprove,
        onReceipt: onReceiptApprove,
        onError,
      }, {
        managerPercentage: managementFee,
        amountToBeRaised: assetValue,
        assetName,
        collateral: collateralSelectedToken,
        userAddress,
        partnerContractAddress,
        paymentTokenAddress,
        operatorID: operatorId,
        gasPrice,
      },
      network,
    );
  }

  fundAsset = (assetId, amountToPay, amountContributed, paymentToken, paymentTokenSymbol) => {
    try {
      const {
        gasPrice,
      } = this.state;
      const currentAsset = this.state.assets.find(item => item.assetId === assetId);
      const notificationId = Date.now();
      const amountFormatted = formatMonetaryValue(amountContributed);
      const {
        name : assetName,
      } = currentAsset.defaultData;

      const {
        buildNotification,
      } = this.props.notificationsContext;

      if(paymentTokenSymbol === 'ETH'){
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
          operationType: NotificationsMetamask.FUNDING,
          assetName,
        });
      } else {
        // will call Approve first
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
          operationType: NotificationsMetamask.APPROVE,
          formattedAmount: formatMonetaryValue(amountToPay, paymentTokenSymbol),
        });
      }

      const onTransactionHash = () => {
        buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.INFO, {
          assetName,
          amount: amountFormatted,
        });
      }

      const onTransactionHashApprove = () => {
        buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.INFO, {
          formattedAmount: formatMonetaryValue(amountToPay, paymentTokenSymbol),
          type: NotificationTypes.APPROVE,
        });
      }

      const onReceipt = (wasSuccessful) => {
        if(wasSuccessful){
          onSuccessRefreshData();
        } else {
          onError(ErrorTypes.ETHEREUM)
        }
      }

      const onReceiptApprove = (wasSuccessful) => {
        if(wasSuccessful){
          buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.SUCCESS, {
            formattedAmount: formatMonetaryValue(amountToPay, paymentTokenSymbol),
            type: NotificationTypes.APPROVE,
          });
        } else {
          onError(ErrorTypes.ETHEREUM)
        }
      }

      const onError = (type) => {
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
        buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.SUCCESS, {
          assetName,
          amount: amountFormatted,
        });
      }

      Brain.fundAsset({
        onTransactionHash,
        onReceipt,
        onError,
      }, {
        onTransactionHash: onTransactionHashApprove,
        onReceipt: onReceiptApprove,
        onError,
      }, {
        userAddress: this.props.metamaskContext.user.address,
        assetId,
        amount: amountToPay,
        paymentToken,
        gasPrice,
      });

    } catch (err) {
      debug(err);
    }
  }

  withdrawInvestorProfit = async (assetId, amount) => {
    try {
      const {
        gasPrice,
      } = this.state;

      const currentAsset = this.state.assets.find(item => item.assetId === assetId);
      const{
        name: assetName,
      } = currentAsset.defaultData;

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
        this.props.metamaskContext.user.address,
        currentAsset.assetId,
        onTransactionHash,
        onReceipt,
        onError,
        gasPrice,
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

    this.fetchAssets();
    this.fetchTransactionHistory();
    this.resetNotifications();

    this.setState({
      loading: {
        ...this.state.loading,
        userAssetsInfo: true,
        transactionHistory: !userIsLoggedIn ? false : true,
      },
    });
  }

  fetchTransactionHistory = async () =>  {
    if(!this.props.metamaskContext.user.address){
      this.setState({
        transactions: [],
        loading: {
          ...this.state.loading,
          transactionHistory: false,
        },
      })
      return;
    }
    await Brain.fetchTransactionHistory(this.props.metamaskContext.user.address)
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

  updateAssetsWithAssetManagerData = (assets, assetManagers) => {
    return assets.map(asset => {
      const {
        assetManager,
        listingDate,
        assetIncome,
      } = asset;

      if(!assetManagers[assetManager]){
        assetManagers[assetManager] = {
          startDate: listingDate,
          totalAssets: 1,
          totalRevenue: assetIncome,
        }
      } else {
        assetManagers[assetManager].totalAssets += 1;
        assetManagers[assetManager].totalRevenue += assetIncome;
      }
      return {
        ...asset,
        assetManagerData: assetManagers[assetManager],
      }
    })
  }

  fetchAssets = async () => {
    const {
      metamaskContext,
    } = this.props;

    const {
      user,
      userIsLoggedIn,
      network,
      userHasMetamask,
    } = metamaskContext;

    const {
      categoriesAirTable,
      assetsAirTableById,
      network: airtableNetwork,
    } = this.props.airtableContext;

    if (!assetsAirTableById || !categoriesAirTable) {
      setTimeout(this.fetchAssets, 2000);
      return;
    }
    const assetManagers = {};
    await Brain.fetchAssets(user.address, assetsAirTableById, categoriesAirTable)
      .then( async (response) => {
        // otherwise Airtable still needs to update
        if(airtableNetwork === network || !userHasMetamask){
          const updatedAssetsWithData = await this.pullFileInfoForAssets(response);
          const updatedAssetsWithManagerData = this.updateAssetsWithAssetManagerData(updatedAssetsWithData, assetManagers);
          this.setState({
            assets: updatedAssetsWithManagerData,
            assetManagers,
            loading: {
              ...this.state.loading,
              assets: false,
              userAssetsInfo: false,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err)
        debug(err);
        if (userIsLoggedIn) {
          setTimeout(this.fetchAssets, 5000);
        }
      });
  }

  render = () => {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

const enhance = compose(
  withNotificationsContext,
  withMetamaskContext,
  withAirtableContext,
);

export default enhance(BlockchainProvider);
