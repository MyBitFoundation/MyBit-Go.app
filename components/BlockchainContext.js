/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import { compose } from 'recompose'
import Web3 from 'web3';
import PropTypes from 'prop-types';
import axios from 'axios';
import BN from 'bignumber.js';
import dayjs from 'dayjs';
import { withAssetsContext } from 'components/AssetsContext';
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
import {
  addJsonFileToIpfs,
  addUserFileToIpfs,
} from 'utils/ipfs';


BN.config({ EXPONENTIAL_AT: 80 });

const { Provider, Consumer } = React.createContext({});

// Required so we can trigger getInitialProps in our exported pages
export const withBlockchainContextPageWrapper = (Component) => {
  return class BlockchainContextPageWrapper extends React.Component{
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

export const withBlockchainContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
          {state => <Component {...props} blockchainContext={state} />}
      </Consumer>
    );
  };
}

class BlockchainProvider extends React.Component {
  constructor(props) {
    super(props);
    this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
    this.fundAsset = this.fundAsset.bind(this);
    this.handleMetamaskUpdate = this.handleMetamaskUpdate.bind(this);
    this.handleListAsset = this.handleListAsset.bind(this);
    this.withdrawInvestorProfit = this.withdrawInvestorProfit.bind(this);
    this.withdrawCollateral = this.withdrawCollateral.bind(this);
    this.withdrawProfitAssetManager = this.withdrawProfitAssetManager.bind(this);
    this.state = {
      loading: {
        transactionHistory: true,
      },
      transactions: [],
      getCategoriesForAssets: this.getCategoriesForAssets,
      fetchTransactionHistory: this.fetchTransactionHistory,
      fundAsset: this.fundAsset,
      handleListAsset: this.handleListAsset,
      withdrawInvestorProfit: this.withdrawInvestorProfit,
      withdrawCollateral: this.withdrawCollateral,
      withdrawProfitAssetManager: this.withdrawProfitAssetManager,
      issueDividends: this.issueDividends,
      payoutAsset: this.payoutAsset,
      updateAssetListingIpfs: this.updateAssetListingIpfs,
      isUserContributing: false,
      withdrawingAssetIds: [],
      withdrawingCollateral: [],
      callingPayout: [],
      withdrawingAssetManager: [],
      gasPrice: '10000000000', //10 GWEI
      updatingAssetListingsIpfs: [],
    };
  }

  componentDidMount = async () => {
    try {
      this.fetchTransactionHistory();
      this.fetchGasPrice();
    } catch (err) {
      debug(err);
    }
    this.createIntervals();
  }

  // handle case where account, login, enabled or network variable change
  componentDidUpdate = async prevProps => {
    const { metamaskContext: oldProps } = prevProps;
    const { metamaskContext: newProps } = this.props;
    const oldEnabled = oldProps.privacyModeEnabled;
    const oldUsername = oldProps.user.address;
    const oldUserIsLoggedIn = oldProps.userIsLoggedIn;
    const oldNetwork = oldProps.network;
    const newUserAddress = newProps.user.address;
    const newIsUserLoggedIn = newProps.userIsLoggedIn;
    const newEnabled = newProps.privacyModeEnabled;
    const newNetwork = newProps.network;

    if((newUserAddress && (oldUsername !== newUserAddress)) || (oldUserIsLoggedIn !== newIsUserLoggedIn) || (oldEnabled !== newEnabled)){
      console.log("Updating blockchainContext due to a change in: address or login or privacy mode")
      this.handleMetamaskUpdate();
    } else if(newNetwork !== oldNetwork){
      this.setState({
        loading: {
          transactionHistory: true,
        }
      })
      this.fetchTransactionHistory();
    }
  }

  componentWillUnmount = () => {
    this.resetIntervals();
  }

  createIntervals = () => {
    this.intervalFetchTransactionHistory =
      setInterval(this.fetchTransactionHistory, FETCH_TRANSACTION_HISTORY_TIME);
    this.intervalFetchGasPrice =
      setInterval(this.fetchGasPrice, FETCH_GAS_PRICE);
  }

  resetIntervals = () => {
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
        this.setState({
          gasPrice,
        })
      }
    }catch(err){
      debug("Error pulling gas price");
      debug(err)
    }
  }

  getCategoriesForAssets = (country, city) => {
    const {
      assetModels,
    } = this.props.assetsContext;

    const categories = {};

    for(const key in assetModels){
      const asset = assetModels[key];
      const {
        category,
        location,
        url,
      } = asset;

      let shouldAdd = false;
      /*
      * If the asset does not have a specified location
      * then anyone from anywhere can list it
      */
      if(!location){
        shouldAdd = true;
      }
      /*
      * The user's country needs to an allowed location for the asset
      * and either the city also matches or there are no city specified
      * which means the user is eligible to list this asset
      */
      else if((location && location[country] && Array.isArray(location[country]) && (location && location[country].includes(city.toLowerCase())) || (location && location[country] && Object.keys(location[country]).length === 0))){
        shouldAdd = true;
      }
      if(shouldAdd){
        if(!categories[category]){
          categories[category] = [];
        }
        categories[category].push({...asset, modelId: key, url});
      }
    }
    return categories;
  }

  updateAssetListingIpfs = async (asset, cb) => {
    const { gasPrice } = this.state;
    const { buildNotification } = this.props.notificationsContext;
    const {
      assetId,
      financials,
      about,
      risks,
      fees,
      country,
      city,
      collateralPercentage,
      assetAddress1,
      assetAddress2,
      assetProvince,
      assetPostalCode,
      fundingToken,
      files,
    } = asset;
    const { name: assetName } = asset.model;
    const notificationId = Date.now();

    let filesInfo = await this.handleIpfsFileUpload(files);
    const ipfsHash = await addJsonFileToIpfs({
      financials,
      about,
      risks,
      fees,
      country,
      city,
      collateralPercentage,
      assetAddress1,
      assetAddress2,
      assetProvince,
      assetPostalCode,
      files: filesInfo.array,
    })
    //update state so users can't trigger multiple saves
    const updatingAssetListingsIpfs = this.state.updatingAssetListingsIpfs.slice();
    updatingAssetListingsIpfs.push(assetId);
    this.setState({
      updatingAssetListingsIpfs,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.ASSET_FILES_UPLOAD,
      assetName,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.ASSET_FILES_UPLOAD, NotificationStatus.INFO, {
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
      cb && cb(false);
      updateAssetListingsIpfs();
      if(type === ErrorTypes.METAMASK){
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.ASSET_FILES_UPLOAD
        });
      } else {
        buildNotification(notificationId, NotificationTypes.ASSET_FILES_UPLOAD, NotificationStatus.ERROR);
      }
    }

    const updateAssetListingsIpfs = () => {
      let updatingAssetListingsIpfs = this.state.updatingAssetListingsIpfs.slice();
      updatingAssetListingsIpfs = updatingAssetListingsIpfs.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        updatingAssetListingsIpfs,
      });
    }

    const onSuccess = async () => {
      await Promise.all([
        this.fetchTransactionHistory,
        this.props.assetsContext.updateAssetListingWithOffChainData(assetId, filesInfo, risks, financials, about, fees),
      ]);
      cb && cb(true);
      updateAssetListingsIpfs();
      buildNotification(notificationId, NotificationTypes.ASSET_FILES_UPLOAD, NotificationStatus.SUCCESS, {
        assetName,
      });
    }

    Brain.updateAssetListingIpfs({
      userAddress: this.props.metamaskContext.user.address,
      fundingToken,
      assetId,
      onTransactionHash,
      onReceipt,
      onError,
      gasPrice,
      ipfs: ipfsHash,
    });
  }

  payoutAsset = async asset => {
    const { forceUpdateListingWithOnChainData } = this.props.assetsContext;
    const { gasPrice } = this.state;
    const { assetId, model} = asset;
    const { name: assetName } = model;
    const { buildNotification } = this.props.notificationsContext;
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
      await Promise.all([this.fetchTransactionHistory, forceUpdateListingWithOnChainData(assetId)]);
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
    const { forceUpdateListingWithOnChainData } = this.props.assetsContext;
    const { gasPrice } = this.state;
    const { assetId, model} = asset;
    const { name: assetName } = model;
    const { buildNotification } = this.props.notificationsContext;
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
      await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
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
    const { forceUpdateListingWithOnChainData } = this.props.assetsContext;
    const { gasPrice } = this.state;
    const { assetId, model} = asset;
    const { name: assetName } = model;
    const { buildNotification } = this.props.notificationsContext;
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
      await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
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

  /*
  * This method may take an array containing both
  * existing files and the new files
  */
  handleIpfsFileUpload = async fileList => {
    const toWait = []
    const files = [];
    let filesString = '';
    const existingFiles = [];
    const filesToUpload = [];
    for(let i=0;i<fileList.length;i++){
      const file = fileList[i];
      if(file.hash){
        existingFiles.push(file);
      } else{
        filesToUpload.push(file);
      }
    }
    for(const file of filesToUpload){
      toWait.push(addUserFileToIpfs(file.originFileObj ? file.originFileObj : file.file ? file.file : file));
    }
    const ipfsHashes = await Promise.all(toWait);
    if(ipfsHashes.length > 0){
      for(let i=0;i<ipfsHashes.length;i++){
        const hash = ipfsHashes[i];
        const name = filesToUpload[i].name;
        files.push({
          hash,
          name,
        })
        filesString+=`${name}|${hash}|`
      }
    }
    existingFiles.map(file => {
      files.push({...file})
      filesString+=`${file.name}|${file.hash}|`
    })
    return {
      array: files,
      string: filesString,
    }
  }

  handleListAsset = async (formData, setUserListingAsset) => {
    const {
      gasPrice,
    } = this.state;

    const {
      metamaskContext,
      notificationsContext,
    } = this.props;

    const {
      asset: assetName,
      userCountry: country,
      userCity: city,
      managementFee,
      fileList,
      collateralInSelectedToken,
      collateralPercentage,
      paymentTokenAddress,
      selectedToken,
      assetValue,
      about,
      financials,
      risks,
      fees,
      modelId,
      assetAddress1,
      assetAddress2,
      assetCity,
      assetProvince,
      assetPostalCode,
    } = formData;

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
        formattedAmount: formatMonetaryValue(collateralInSelectedToken, selectedToken),
      });
    } else {
      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.LIST_ASSET,
        assetName,
      });
    }

    const onTransactionHash = async () => {
      buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
        assetName,
      });

    }

    const onTransactionHashApprove = () => {
      buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
        formattedAmount: formatMonetaryValue(collateralInSelectedToken, selectedToken),
        type: NotificationTypes.APPROVE,
      });
    }

    const onReceipt = (assetId) => {
      onSuccess(assetId);
    }

    const onReceiptApprove = wasSuccessful => {
      if(wasSuccessful){
        buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
          formattedAmount: formatMonetaryValue(collateralInSelectedToken, selectedToken),
          type: NotificationTypes.APPROVE,
        });
      } else {
        onError(ErrorTypes.ETHEREUM)
      }
    }

    const filesInfo = await this.handleIpfsFileUpload(fileList);

    const ipfsHash = await addJsonFileToIpfs({
      financials,
      about,
      risks,
      fees,
      country,
      city,
      collateralPercentage,
      assetAddress1,
      assetAddress2,
      assetProvince,
      assetPostalCode,
      files: filesInfo.array,
    })

    const onSuccess = async (assetId) => {
      const numberOfInternalActions = 1;
      const numberOfInternalActionsWithFileUpload = numberOfInternalActions + 1;
      const filesUploaded = fileList.length > 0;
      const requiredCallsToInternalActions = filesUploaded ? numberOfInternalActionsWithFileUpload : numberOfInternalActions;
      let counterCallsToInternalActions = 0;

      // we need to perform a few actions before declaring the listing of the asset as successful
      const performInternalAction = async () => {
        counterCallsToInternalActions++;
        if(counterCallsToInternalActions === requiredCallsToInternalActions){
          buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
            assetName,
            assetId,
          });
          setUserListingAsset(false, assetId);
        }
      }

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
        collateral: collateralInSelectedToken,
        userAddress,
        paymentTokenAddress,
        gasPrice,
        ipfs: ipfsHash,
        modelId,
      },
      network,
    );
  }

  fundAsset = (assetId, amountToPay, amountContributed, paymentToken, paymentTokenSymbol) => {
    try {
      const {
        gasPrice,
      } = this.state;

      const currentAsset = this.props.assetsContext.assets.find(item => item.assetId === assetId);
      const notificationId = Date.now();
      const amountFormatted = formatMonetaryValue(amountContributed);
      const {
        name : assetName,
      } = currentAsset.model;

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
        await Promise.all([this.fetchTransactionHistory()]);
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

  issueDividends = (amount, assetId) => {
    try {
      const { forceUpdateListingWithOnChainData } = this.props.assetsContext;
      const { gasPrice } = this.state;
      const { buildNotification } = this.props.notificationsContext;
      const notificationId = Date.now();

      const formattedAmount = formatMonetaryValue(amount);
      const currentAsset = this.props.assetsContext.assets.find(item => item.assetId === assetId);
      const { name : assetName } = currentAsset.model;

      // Call Approve first
      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.APPROVE,
        formattedAmount,
      });

      const onTransactionHash = () => {
        buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.INFO, {
          formattedAmount,
        });
      }

      const onTransactionHashApprove = () => {
        buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.INFO, {
          formattedAmount,
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
          buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.SUCCESS, {
            formattedAmount,
            type: NotificationTypes.APPROVE,
          });
        } else {
          onError(ErrorTypes.ETHEREUM)
        }
      }

      const onError = (type) => {
        if(type === ErrorTypes.METAMASK){
          buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.PAY_DIVIDENDS,
          });
        } else {
          buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.ERROR, {
            assetName,
          });
        }
      }

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
        buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.SUCCESS, {
          assetName,
          formattedAmount,
        });
      }

      Brain.issueDividends({
        onTransactionHash,
        onReceipt,
        onError,
      }, {
        onTransactionHash: onTransactionHashApprove,
        onReceipt: onReceiptApprove,
        onError,
      }, {
        address: this.props.metamaskContext.user.address,
        assetId,
        amount,
        gasPrice,
      });

    } catch (err) {
      debug(err);
    }
  }

  withdrawInvestorProfit = async (assetId, amount) => {
    try {
      const { forceUpdateListingWithOnChainData } = this.props.assetsContext;
      const {
        gasPrice,
      } = this.state;

      const currentAsset = this.props.assetsContext.assets.find(item => item.assetId === assetId);
      const{
        name: assetName,
      } = currentAsset.model;

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
        await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
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

  resetNotifications = () => {
    this.setState({
      notifications: [],
    });
  }

  handleMetamaskUpdate = async () => {
    const {
      userIsLoggedIn,
    } = this.props.metamaskContext;

    this.fetchTransactionHistory();
    this.resetNotifications();

    this.setState({
      loading: {
        ...this.state.loading,
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
        if (this.props.metamaskContext.userIsLoggedIn) {
          setTimeout(this.fetchTransactionHistory, 5000);
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
  withAssetsContext,
);

export default enhance(BlockchainProvider);
