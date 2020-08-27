/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import { compose } from 'recompose';
import Web3 from 'web3';
import PropTypes from 'prop-types';
import axios from 'axios';
import BN from 'bignumber.js';
import dayjs from 'dayjs';
import { withAssetsContext } from 'components/AssetsContext';
import { withNotificationsContext } from 'components/NotificationsContext';
import { withMetamaskContext } from 'components/MetamaskContext';
import * as Brain from '../apis/brain';
import { ErrorTypes } from 'constants/errorTypes';
import { InternalLinks } from 'constants/links';
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
  getPlatformToken,
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
export const withBlockchainContextPageWrapper = Component => class BlockchainContextPageWrapper extends React.Component {
  render() {
    return (
      <Consumer>
        {state => <Component {...this.props} blockchainContext={state} />}
      </Consumer>
    );
  }
};

export const getStaticProps = () => ({
  props: {},
});

export const withBlockchainContext = Component => function WrapperComponent(props) {
  return (
    <Consumer>
      {state => <Component {...props} blockchainContext={state} />}
    </Consumer>
  );
};

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
      gasPrice: '10000000000', // 10 GWEI
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
  componentDidUpdate = async (prevProps) => {
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

    if ((newUserAddress && (oldUsername !== newUserAddress)) || (oldUserIsLoggedIn !== newIsUserLoggedIn) || (oldEnabled !== newEnabled)) {
      console.info('Updating blockchainContext due to a change in: address or login or privacy mode');
      this.handleMetamaskUpdate();
    } else if (newNetwork !== oldNetwork) {
      this.setState({
        loading: {
          transactionHistory: true,
        },
      });
      this.fetchTransactionHistory();
    }
  }

  componentWillUnmount = () => {
    this.resetIntervals();
  }

  createIntervals = () => {
    this.intervalFetchTransactionHistory = setInterval(this.fetchTransactionHistory, FETCH_TRANSACTION_HISTORY_TIME);
    this.intervalFetchGasPrice = setInterval(this.fetchGasPrice, FETCH_GAS_PRICE);
  }

  resetIntervals = () => {
    clearInterval(this.intervalFetchTransactionHistory);
    clearInterval(this.intervalFetchGasPrice);
  }

  fetchGasPrice = async () => {
    let {
      gasPrice,
    } = this.state;

    try {
      const response = await axios(InternalLinks.GAS_PRICE);
      if (response.data) {
        const {
          fast,
        } = response.data;

        gasPrice = BN(fast).times(100000000).toString(); // converts to WEI, from GWEI
        this.setState({
          gasPrice,
        });
      }
    } catch (err) {
      debug('Error pulling gas price');
      debug(err);
    }
  }

  updateAssetListingIpfs = async (asset, cb) => {
    const { gasPrice } = this.state;
    const { buildNotification } = this.props.notificationsContext;
    const {
      name,
      assetId,
      financials,
      about,
      risks,
      fees,
      country,
      city,
      collateralPercentage,
      fundingToken,
      files,
    } = asset;
    const notificationId = Date.now();

    const filesInfo = await this.handleIpfsFileUpload(files);
    const ipfsHash = await addJsonFileToIpfs({
      financials,
      about,
      risks,
      fees,
      country,
      city,
      collateralPercentage,
      files: filesInfo.array,
    });
    // update state so users can't trigger multiple saves
    const updatingAssetListingsIpfs = this.state.updatingAssetListingsIpfs.slice();
    updatingAssetListingsIpfs.push(assetId);
    this.setState({
      updatingAssetListingsIpfs,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.ASSET_FILES_UPLOAD,
      name,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.ASSET_FILES_UPLOAD, NotificationStatus.INFO, {
        name,
      });
    };

    const onReceipt = (wasSuccessful) => {
      if (wasSuccessful) {
        onSuccess();
      } else {
        onError(ErrorTypes.ETHEREUM);
      }
    };

    const onError = (type) => {
      cb && cb(false);
      updateAssetListingsIpfs();
      if (type === ErrorTypes.METAMASK) {
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.ASSET_FILES_UPLOAD,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.ASSET_FILES_UPLOAD, NotificationStatus.ERROR);
      }
    };

    const updateAssetListingsIpfs = () => {
      let updatingAssetListingsIpfs = this.state.updatingAssetListingsIpfs.slice();
      updatingAssetListingsIpfs = updatingAssetListingsIpfs.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        updatingAssetListingsIpfs,
      });
    };

    const onSuccess = async () => {
      await Promise.all([
        this.fetchTransactionHistory,
        this.props.assetsContext.updateAssetListingWithOffChainData(assetId, filesInfo, risks, financials, about, fees),
      ]);
      cb && cb(true);
      updateAssetListingsIpfs();
      buildNotification(notificationId, NotificationTypes.ASSET_FILES_UPLOAD, NotificationStatus.SUCCESS, {
        name,
      });
    };

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

  payoutAsset = async (asset) => {
    const { forceUpdateListingWithOnChainData } = this.props.assetsContext;
    const { gasPrice } = this.state;
    const { assetId, name } = asset;
    const { buildNotification } = this.props.notificationsContext;
    const notificationId = Date.now();

    // update state so users can't trigger payout multiple times
    const callingPayout = this.state.callingPayout.slice();
    callingPayout.push(assetId);
    this.setState({
      callingPayout,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.ASSET_PAYOUT,
      name,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.ASSET_PAYOUT, NotificationStatus.INFO, {
        name,
      });
    };

    const onReceipt = (wasSuccessful) => {
      if (wasSuccessful) {
        onSuccess();
      } else {
        onError(ErrorTypes.ETHEREUM);
      }
    };

    const onError = (type) => {
      updateCallingPayout();
      if (type === ErrorTypes.METAMASK) {
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.ASSET_PAYOUT,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.ASSET_PAYOUT, NotificationStatus.ERROR);
      }
    };

    const updateCallingPayout = () => {
      let callingPayout = this.state.callingPayout.slice();
      callingPayout = callingPayout.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        callingPayout,
      });
    };

    const onSuccess = async () => {
      await Promise.all([this.fetchTransactionHistory, forceUpdateListingWithOnChainData(assetId)]);
      updateCallingPayout();
      buildNotification(notificationId, NotificationTypes.ASSET_PAYOUT, NotificationStatus.SUCCESS, {
        name,
      });
    };

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
    const { buildNotification } = this.props.notificationsContext;
    const notificationId = Date.now();

    const { name, assetId } = asset;

    // update state so users can't trigger the withdrawal multiple times
    const withdrawingAssetManager = this.state.withdrawingAssetManager.slice();
    withdrawingAssetManager.push(assetId);
    this.setState({
      withdrawingAssetManager,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.WITHDRAW_MANAGER,
      name,
    });

    const onTransactionHash = () => {
      buildNotification(
        notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.INFO, {
          name,
        },
      );
    };

    const onReceipt = (wasSuccessful) => {
      if (wasSuccessful) {
        onSuccess();
      } else {
        onError(ErrorTypes.ETHEREUM);
      }
    };

    const onError = (type) => {
      updatewithdrawingAssetManager();
      if (type === ErrorTypes.METAMASK) {
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.WITHDRAW_MANAGER,
          name,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.ERROR, {
          name,
        });
      }
    };

    const updatewithdrawingAssetManager = () => {
      let withdrawingAssetManager = this.state.withdrawingAssetManager.slice();
      withdrawingAssetManager = withdrawingAssetManager.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        withdrawingAssetManager,
      });
    };

    const onSuccess = async () => {
      await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
      updatewithdrawingAssetManager();
      buildNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.SUCCESS, {
        name,
        amount: formatMonetaryValue(amount),
      });
    };

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
    const { network } = this.props.metamaskContext;
    const { gasPrice } = this.state;
    const { buildNotification } = this.props.notificationsContext;
    const notificationId = Date.now();
    const { name, assetId } = asset;

    const formattedAmount = formatMonetaryValue(amount, getPlatformToken(network));

    // update state so users can't trigger the withdrawal multiple times
    const withdrawingCollateral = this.state.withdrawingCollateral.slice();
    withdrawingCollateral.push(assetId);
    this.setState({
      withdrawingCollateral,
    });

    buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.WITHDRAW_COLLATERAL,
      name,
    });

    const onTransactionHash = () => {
      buildNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.INFO, {
        name,
      });
    };

    const onReceipt = (wasSuccessful) => {
      if (wasSuccessful) {
        onSuccess();
      } else {
        onError(ErrorTypes.ETHEREUM);
      }
    };

    const onError = (type) => {
      updateWithdrawingCollateral();
      if (type === ErrorTypes.METAMASK) {
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.WITHDRAW_COLLATERAL,
          name,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.ERROR, {
          name,
        });
      }
    };

    const updateWithdrawingCollateral = () => {
      let withdrawingCollateral = this.state.withdrawingCollateral.slice();
      withdrawingCollateral = withdrawingCollateral.filter(assetIdTmp => assetIdTmp !== assetId);
      this.setState({
        withdrawingCollateral,
      });
    };

    const onSuccess = async () => {
      await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
      updateWithdrawingCollateral();
      buildNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.SUCCESS, {
        name,
        percentage,
        amount: formattedAmount,
      });
    };

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
  handleIpfsFileUpload = async (fileList) => {
    const toWait = [];
    const files = [];
    let filesString = '';
    const existingFiles = [];
    const filesToUpload = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.hash) {
        existingFiles.push(file);
      } else {
        filesToUpload.push(file);
      }
    }
    for (const file of filesToUpload) {
      toWait.push(addUserFileToIpfs(file.originFileObj ? file.originFileObj : file.file ? file.file : file));
    }
    const ipfsHashes = await Promise.all(toWait);
    if (ipfsHashes.length > 0) {
      for (let i = 0; i < ipfsHashes.length; i++) {
        const hash = ipfsHashes[i];
        const name = filesToUpload[i].name;
        files.push({
          hash,
          name,
        });
        filesString += `${name}|${hash}|`;
      }
    }
    existingFiles.map((file) => {
      files.push({ ...file });
      filesString += `${file.name}|${file.hash}|`;
    });
    return {
      array: files,
      string: filesString,
    };
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
      asset: name,
      userCountry: country,
      userCity: city,
      managementFee,
      coverPicture,
      fileList,
      paymentInSelectedToken,
      collateralPercentage,
      paymentTokenAddress,
      selectedToken,
      assetValue,
      about,
      financials,
      risks,
      fees,
    } = formData;

    const { buildNotification } = notificationsContext;

    console.info('AssetContext', formData);

    const {
      user,
      network,
    } = metamaskContext;
    const userAddress = user.address;
    const notificationId = Date.now();

    if (selectedToken !== 'ETH') {
      // Going to call Approve
      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.APPROVE,
        formattedAmount: formatMonetaryValue(paymentInSelectedToken, selectedToken),
      });
    } else {
      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.LIST_ASSET,
        name,
      });
    }

    const onTransactionHash = async () => {
      buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
        name,
      });
    };

    const onTransactionHashApprove = () => {
      buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
        formattedAmount: formatMonetaryValue(paymentInSelectedToken, selectedToken),
        type: NotificationTypes.APPROVE,
      });
    };

    const onReceipt = (assetId) => {
      onSuccess(assetId);
    };

    const onReceiptApprove = (wasSuccessful) => {
      if (wasSuccessful) {
        buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
          formattedAmount: formatMonetaryValue(paymentInSelectedToken, selectedToken),
          type: NotificationTypes.APPROVE,
        });
      } else {
        onError(ErrorTypes.ETHEREUM);
      }
    };

    const filesInfo = await this.handleIpfsFileUpload(fileList);

    const ipfsHash = await addJsonFileToIpfs({
      financials,
      about,
      risks,
      fees,
      country,
      city,
      collateralPercentage,
      files: filesInfo.array,
    });

    const onSuccess = async (assetId) => {
      const numberOfInternalActions = 1;
      let counterCallsToInternalActions = 0;

      // we need to perform a few actions before declaring the listing of the asset as successful
      const performInternalAction = async () => {
        counterCallsToInternalActions++;
        if (counterCallsToInternalActions === numberOfInternalActions) {
          buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
            name,
            assetId,
          });
          setUserListingAsset(false, assetId);
        }
      };

      Brain.updateAirTableWithNewAsset({
        assetId,
        name,
        country,
        city,
        collateralPercentage,
        about,
        financials,
        risks,
        fees,
        coverPicture,
        files: fileList,
      }, performInternalAction, network);
    };

    const onError = (type) => {
      setUserListingAsset(false);
      if (type === ErrorTypes.METAMASK) {
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          name,
          operationType: NotificationsMetamask.LIST_ASSET,
        });
      } else {
        buildNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.ERROR, {
          name,
        });
      }
    };

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
      name,
      collateralAndFee: paymentInSelectedToken,
      userAddress,
      paymentTokenAddress,
      gasPrice,
      ipfs: ipfsHash || 'no-ipfs',
    },
    network);
  }

  fundAsset = (assetId, name, amountToPay, amountContributed, paymentToken, paymentTokenSymbol) => {
    try {
      const {
        gasPrice,
      } = this.state;

      const currentAsset = this.props.assetsContext.assets.find(item => item.assetId === assetId);
      const notificationId = Date.now();
      const amountFormatted = formatMonetaryValue(amountContributed);

      const {
        buildNotification,
      } = this.props.notificationsContext;

      if (paymentTokenSymbol === 'ETH') {
        buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
          operationType: NotificationsMetamask.FUNDING,
          name,
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
          name,
          amount: amountFormatted,
        });
      };

      const onTransactionHashApprove = () => {
        buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.INFO, {
          formattedAmount: formatMonetaryValue(amountToPay, paymentTokenSymbol),
          type: NotificationTypes.APPROVE,
        });
      };

      const onReceipt = (wasSuccessful) => {
        if (wasSuccessful) {
          onSuccessRefreshData();
        } else {
          onError(ErrorTypes.ETHEREUM);
        }
      };

      const onReceiptApprove = (wasSuccessful) => {
        if (wasSuccessful) {
          buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.SUCCESS, {
            formattedAmount: formatMonetaryValue(amountToPay, paymentTokenSymbol),
            type: NotificationTypes.APPROVE,
          });
        } else {
          onError(ErrorTypes.ETHEREUM);
        }
      };

      const onError = (type) => {
        if (type === ErrorTypes.METAMASK) {
          buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.FUNDING,
          });
        } else {
          buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.ERROR, {
            name,
          });
        }
      };

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchTransactionHistory()]);
        buildNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.SUCCESS, {
          name,
          amount: amountFormatted,
        });
      };

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
      const { name } = currentAsset;

      // Call Approve first
      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.APPROVE,
        formattedAmount,
      });

      const onTransactionHash = () => {
        buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.INFO, {
          formattedAmount,
        });
      };

      const onTransactionHashApprove = () => {
        buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.INFO, {
          formattedAmount,
          type: NotificationTypes.APPROVE,
        });
      };

      const onReceipt = (wasSuccessful) => {
        if (wasSuccessful) {
          onSuccessRefreshData();
        } else {
          onError(ErrorTypes.ETHEREUM);
        }
      };

      const onReceiptApprove = (wasSuccessful) => {
        if (wasSuccessful) {
          buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.SUCCESS, {
            formattedAmount,
            type: NotificationTypes.APPROVE,
          });
        } else {
          onError(ErrorTypes.ETHEREUM);
        }
      };

      const onError = (type) => {
        if (type === ErrorTypes.METAMASK) {
          buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.PAY_DIVIDENDS,
          });
        } else {
          buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.ERROR, {
            name,
          });
        }
      };

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
        buildNotification(notificationId, NotificationTypes.PAY_DIVIDENDS, NotificationStatus.SUCCESS, {
          name,
          formattedAmount,
        });
      };

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
      const { name } = currentAsset;

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
      });

      buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.WITHDRAW_INVESTOR,
        name,
      });

      const onTransactionHash = () => {
        buildNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.INFO, {
          name,
          amount,
        });
      };

      const onReceipt = (wasSuccessful) => {
        if (wasSuccessful) {
          onSuccessRefreshData();
        } else {
          onError(ErrorTypes.ETHEREUM);
        }
      };

      const onError = (type) => {
        removeassetIdFromList();
        if (type === ErrorTypes.METAMASK) {
          buildNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.WITHDRAW_INVESTOR,
          });
        } else {
          buildNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.ERROR, {
            name,
          });
        }
      };

      const removeassetIdFromList = () => {
        let withdrawingAssetIds = this.state.withdrawingAssetIds.slice();
        withdrawingAssetIds = withdrawingAssetIds.filter(assetIdTmp => assetIdTmp !== assetId);
        this.setState({
          withdrawingAssetIds,
        });
      };

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchTransactionHistory(), forceUpdateListingWithOnChainData(assetId)]);
        removeassetIdFromList();
        buildNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.SUCCESS, {
          name,
          amount,
        });
      };

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
        transactionHistory: !!userIsLoggedIn,
      },
    });
  }

  fetchTransactionHistory = async () => {
    if (!this.props.metamaskContext.user.address) {
      this.setState({
        transactions: [],
        loading: {
          ...this.state.loading,
          transactionHistory: false,
        },
      });
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

  render = () => (
    <Provider value={this.state}>
      {this.props.children}
    </Provider>
  )
}

const enhance = compose(
  withNotificationsContext,
  withMetamaskContext,
  withAssetsContext,
);

export default enhance(BlockchainProvider);
