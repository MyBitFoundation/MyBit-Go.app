/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import React from 'react';
import Web3 from 'web3';
import PropTypes from 'prop-types';
import axios from 'axios';
import BlockchainInfoContext from './BlockchainInfoContext';
import * as Brain from '../apis/brain';
import {
  ErrorTypes,
  InternalLinks,
  NotificationTypes,
  NotificationsMetamask,
  NotificationStatus,
  CORRECT_NETWORK,
  FETCH_ASSETS_TIME,
  LOAD_METAMASK_USER_DETAILS_TIME,
  FETCH_TRANSACTION_HISTORY_TIME,
  AIRTABLE_CATEGORIES_NUMBER_OF_FIELDS,
  AIRTABLE_ASSETS_NUMBER_OF_FIELDS,
} from '../constants';

import {
  debug,
} from '../util/helpers';

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAssets = this.fetchAssets.bind(this);
    this.loadMetamaskUserDetails = this.loadMetamaskUserDetails.bind(this);
    this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
    this.loadPrices = this.loadPrices.bind(this);
    this.getMYB = this.getMYB.bind(this);
    this.fundAsset = this.fundAsset.bind(this);
    this.handleMetamaskUpdate = this.handleMetamaskUpdate.bind(this);
    this.handleAssetFavorited = this.handleAssetFavorited.bind(this);
    this.getAssetsFromAirTable = this.getAssetsFromAirTable.bind(this);
    this.getCategoriesForAssets = this.getCategoriesForAssets.bind(this);
    this.handleListAsset = this.handleListAsset.bind(this);
    this.getAssetFromAirTableByName = this.getAssetFromAirTableByName.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.getCategoriesFromAirTable = this.getCategoriesFromAirTable.bind(this);
    this.withdrawInvestorProfit = this.withdrawInvestorProfit.bind(this);
    this.withdrawCollateral = this.withdrawCollateral.bind(this);
    this.resetNotifications = this.resetNotifications.bind(this);
    this.withdrawProfitAssetManager = this.withdrawProfitAssetManager.bind(this);
    this.isReadOnlyMode = this.isReadOnlyMode.bind(this);

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
      handleClickedAssetFavorite: this.handleAssetFavorited,
      getCategoriesForAssets: this.getCategoriesForAssets,
      handleListAsset: this.handleListAsset,
      removeNotification: this.removeNotification,
      updateNotification: this.updateNotification,
      withdrawInvestorProfit: this.withdrawInvestorProfit,
      withdrawCollateral: this.withdrawCollateral,
      withdrawProfitAssetManager: this.withdrawProfitAssetManager,
      isReadOnlyMode: this.isReadOnlyMode,
      notifications: {},
      isUserContributing: false,
      withdrawingAssetIds: [],
      withdrawingCollateral: [],
      withdrawingAssetManager: [],
    };
  }

  async componentDidMount() {
    try {
      // TODO perhaps we don't need to wait for these here
      await Promise.all([
        this.getAssetsFromAirTable(),
        this.getCategoriesFromAirTable(),
        this.loadPrices(),
      ]);

      //case where user has metamask but is connected to the wrong network, we
      //still need to load the data properly from the correct network
      if(this.state.userHasMetamask && (this.state.network !== CORRECT_NETWORK)){
        window.web3js = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`))
      }

      this.loadMetamaskUserDetails();
      this.fetchAssets();
      this.fetchTransactionHistory();

    } catch (err) {
      debug(err);
    }
    this.createIntervals();
  }

  componentWillReceiveProps(nextProps){
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
      this.setState({
        user: nextProps.user,
        userIsLoggedIn: nextProps.isLoggedIn,
        enabled: nextProps.enabled
      }, () => this.handleMetamaskUpdate());
    }
    if(newBalance && (currentBalance !== newBalance)){
      this.setState({
        user: {
          ...this.state.user,
          balance: nextProps.user.balance,
        },
      })
    }
  }

  componentWillUnmount() {
    this.resetIntervals();
  }

  createIntervals(){
    this.intervalFetchAssets =
      setInterval(this.fetchAssets, FETCH_ASSETS_TIME);
    this.intervalFetchTransactionHistory =
      setInterval(this.fetchTransactionHistory, FETCH_TRANSACTION_HISTORY_TIME);
    this.intervalLoadMetamaskUserDetails =
      setInterval(this.loadMetamaskUserDetails, LOAD_METAMASK_USER_DETAILS_TIME);
  }

  resetIntervals(){
    clearInterval(this.intervalFetchAssets);
    clearInterval(this.intervalFetchTransactionHistory);
    clearInterval(this.intervalLoadMetamaskUserDetails);
  }

  isReadOnlyMode(){
    const {
      userHasMetamask,
      userIsLoggedIn,
      network,
      enabled,
    } = this.state;

    return !userHasMetamask || !userIsLoggedIn || network !== CORRECT_NETWORK || !enabled;
  }

  async pullFileInfoForAssets(assets){
    try{
      const response = await axios(InternalLinks.S3_ASSET_FILES);

      const filesByAssetId = response.data.filesByAssetId;

      for(const asset of assets){
        const assetId = asset.assetID;
        if(filesByAssetId[assetId]){
          asset.files = filesByAssetId[assetId];
        }
      }
      return assets;
    }catch(err){
      debug("Error pulling files from server");
      debug(err)
      return assets;
    }
  }

  async withdrawProfitAssetManager(asset, amount, updateAssetCollateralPage){
    const {
      assetID,
      name: assetName,
    } = asset;

    const notificationId = Date.now();

    //update state so users can't trigger the withdrawal multiple times
    const withdrawingAssetManager = this.state.withdrawingAssetManager.slice();
    withdrawingAssetManager.push(assetID);
    this.setState({
      withdrawingAssetManager,
    });

    this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.WITHDRAW_MANAGER,
      assetName,
    });

    const onTransactionHash = () => {
      this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.INFO, {
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
        this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.WITHDRAW_MANAGER,
          assetName,
        });
      } else {
        this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.ERROR, {
          assetName,
        });
      }
    }

    const updatewithdrawingAssetManager = () => {
      let withdrawingAssetManager = this.state.withdrawingAssetManager.slice();
      withdrawingAssetManager = withdrawingAssetManager.filter(assetIdTmp => assetIdTmp !== assetID);
      this.setState({
        withdrawingAssetManager,
      });
    }

    const onSuccess = () => {
      updateAssetCollateralPage(() => {
        updatewithdrawingAssetManager();
        this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_MANAGER, NotificationStatus.SUCCESS, {
          assetName,
          amount,
        });
      })
    }

    await Brain.withdrawAssetManager(
      this.state.user.userName,
      assetID,
      onTransactionHash,
      onReceipt,
      onError,
    );
  }

  async withdrawCollateral(asset, percentage, amount, updateAssetCollateralPage){
    const {
      assetID,
      name: assetName,
    } = asset;
    const notificationId = Date.now();

    //update state so users can't trigger the withdrawal multiple times
    const withdrawingCollateral = this.state.withdrawingCollateral.slice();
    withdrawingCollateral.push(assetID);
    this.setState({
      withdrawingCollateral,
    });

    this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.WITHDRAW_COLLATERAL,
      assetName,
    });

    const onTransactionHash = () => {
      this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.INFO, {
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
        this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          operationType: NotificationsMetamask.WITHDRAW_COLLATERAL,
          assetName,
        });
      } else {
        this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.ERROR, {
          assetName,
        });
      }
    }

    const updateWithdrawingCollateral = () => {
      let withdrawingCollateral = this.state.withdrawingCollateral.slice();
      withdrawingCollateral = withdrawingCollateral.filter(assetIdTmp => assetIdTmp !== assetID);
      this.setState({
        withdrawingCollateral,
      });
    }

    const onSuccess = () => {
      updateAssetCollateralPage(() => {
        updateWithdrawingCollateral();
        this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_COLLATERAL, NotificationStatus.SUCCESS, {
          assetName,
          percentage,
          amount,
        });
      })
    }

    await Brain.withdrawEscrow(
      this.state.user.userName,
      assetID,
      onTransactionHash,
      onReceipt,
      onError,
    );

  }

  async handleListAsset(formData, setUserListingAsset){
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
    } = this.state;

    const userAddress =  this.state.user.userName;
    const notificationId = Date.now();

    this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
      operationType: NotificationsMetamask.LIST_ASSET,
      assetName,
    });

    const onTransactionHash = () => {
      this.buildAndUpdateNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.INFO, {
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

          this.buildAndUpdateNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.SUCCESS, {
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
        this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
          assetName,
          operationType: NotificationsMetamask.LIST_ASSET,
        });
      } else {
        this.buildAndUpdateNotification(notificationId, NotificationTypes.LIST_ASSET, NotificationStatus.ERROR, {
          assetName,
        });
      }
    }

    await Brain.createAsset(onTransactionHash, onReceipt, onError, {
      managerPercentage: managementFee,
      assetType: categoriesAirTable[category].encoded,
      amountToBeRaisedInUSD: this.getAssetFromAirTableByName(assetName).amountToBeRaisedInUSDAirtable,
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
      const currentAsset = this.state.assets.find(item => item.assetID === assetId);
      const notificationId = Date.now();
      const {
        name : assetName,
      } = currentAsset;

      this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.FUNDING,
        assetName,
      });

      const onTransactionHash = () => {
        this.buildAndUpdateNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.INFO, {
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
          this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.FUNDING,
          });
        } else {
          this.buildAndUpdateNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.ERROR, {
            assetName,
          });
        }
      }

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
        onSuccessConfirmationPopup();
        this.buildAndUpdateNotification(notificationId, NotificationTypes.FUNDING, NotificationStatus.SUCCESS, {
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

  async withdrawInvestorProfit(assetId, amount) {
    try {
      const currentAsset = this.state.assets.find(item => item.assetID === assetId);
      const{
        name: assetName,
      } = currentAsset;
      const notificationId = Date.now();

      // save the the assetID so the user doesn't trigger twice while we
      // perform the action
      const withdrawingAssetIds = this.state.withdrawingAssetIds.slice();
      withdrawingAssetIds.push(assetId);
      this.setState({
        withdrawingAssetIds,
      })

      this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.INFO, {
        operationType: NotificationsMetamask.WITHDRAW_INVESTOR,
        assetName,
      });

      const onTransactionHash = () => {
        this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.INFO, {
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
        removeAssetIdFromList();
        if(type === ErrorTypes.METAMASK){
          this.buildAndUpdateNotification(notificationId, NotificationTypes.METAMASK, NotificationStatus.ERROR, {
            operationType: NotificationsMetamask.WITHDRAW_INVESTOR,
          });
        } else {
          this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.ERROR, {
            assetName,
          });
        }
      }

      const removeAssetIdFromList = () => {
        let withdrawingAssetIds = this.state.withdrawingAssetIds.slice();
        withdrawingAssetIds = withdrawingAssetIds.filter(assetIdTmp => assetIdTmp !== assetId);
        this.setState({
          withdrawingAssetIds,
        })
      }

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
        removeAssetIdFromList();
        this.buildAndUpdateNotification(notificationId, NotificationTypes.WITHDRAW_INVESTOR, NotificationStatus.SUCCESS, {
          assetName,
          amount,
        });
      }

      await Brain.withdrawInvestorProfit(
        this.state.user.userName,
        currentAsset.assetID,
        onTransactionHash,
        onReceipt,
        onError,
      );

    } catch (err) {
      debug(err);
    }
  }


  updateNotification(id, data){
    const notifications = Object.assign({}, this.state.notifications);
    notifications[id] = data;
    this.setState({notifications});
  }


  removeNotification(id){
    const notifications = Object.assign({}, this.state.notifications);
    delete notifications[id];
    this.setState({notifications});
  }

  processAssetsFromAirTable({ fields }){
    let location = undefined;
    if(fields.Location){
      let countries = fields.Location.split(',');
      location = {};
      countries.forEach(country => {
        country = country.trim();
        let cities = /\(([^)]+)\)/g.exec(country);

        if(cities){
          country = country.substring(0, country.indexOf('('))
          cities = cities[1].split(';');
          location[country] = cities;
        } else {
           location[country] = {};
        }
      })
    }
    return {
      name: fields.Asset,
      category: fields.Category,
      description: fields.Description,
      details: fields.Details,
      partner: fields.Partner,
      imageSrc: `${InternalLinks.S3}assetImages:${fields['Image']}`,
      amountToBeRaisedInUSDAirtable: fields['Funding goal'],
      location,
    };
  }

  processCategoriesFromAirTable(data){
    const categories = {};
    data.forEach(({ fields }) => {
      categories[fields.Category] = {
        contractName: fields['Category Contract'],
        encoded: fields['byte32'],
      }
    })
    return categories;
  }

  getAssetFromAirTableByName(assetName, assetsFromAirTable){
    assetsFromAirTable = assetsFromAirTable || this.state.assetsAirTable;
    const tmpAsset = Object.assign({}, assetsFromAirTable.filter(asset => asset.name === assetName)[0]);
    tmpAsset.location = undefined;
    return tmpAsset;
  }

  processAssetsByIdFromAirTable(assetsToProcess, assetsFromAirTable){
    const assetsAirTableById = {};
    const tmpCache = {};
    assetsToProcess.forEach(({ fields }) => {
      let assetIds = fields['Asset IDs'];
      if(assetIds){
        const assetName = fields['Asset'];
        const airtableAsset = tmpCache[assetName] || this.getAssetFromAirTableByName(assetName, assetsFromAirTable);
        // add to temporary cache (will help when we have a lot of assets)
        if(airtableAsset && !tmpCache[assetName]){
          tmpCache[assetName] = airtableAsset;
        }
        assetIds = assetIds.split(',');
        assetIds.forEach(assetIdInfo => {
          const [assetId, city, country, collateral, collateralPercentage] = assetIdInfo.split('|');
          airtableAsset.city = city;
          airtableAsset.country = country;
          airtableAsset.collateral = Number(collateral);
          airtableAsset.collateralPercentage = collateralPercentage;
          assetsAirTableById[assetId] = airtableAsset;
        })
      }
    })
    return assetsAirTableById;
  }

  async getAssetsFromAirTable(){
    try{
      const request = await fetch(InternalLinks.AIRTABLE_ASSETS);
      const json = await request.json();
      const { records } = json;
      const assets = records.filter(({ fields })  => Object.keys(fields).length >= AIRTABLE_ASSETS_NUMBER_OF_FIELDS).map(this.processAssetsFromAirTable)
      const assetsById = this.processAssetsByIdFromAirTable(records.filter(({ fields })  => Object.keys(fields).length >= AIRTABLE_ASSETS_NUMBER_OF_FIELDS), assets);
      this.setState({
        assetsAirTable: assets,
        assetsAirTableById: assetsById,
      });
    }catch(err){
      setTimeout(this.getAssetsFromAirTable, 5000);
      debug(err);
    }
  }

  async getCategoriesFromAirTable(){
    try{
      const request = await fetch(InternalLinks.AIRTABLE_CATEGORIES);
      const json = await request.json();
      const { records } = json;
      const categories = this.processCategoriesFromAirTable(records.filter(({ fields })  => Object.keys(fields).length === AIRTABLE_CATEGORIES_NUMBER_OF_FIELDS));
      this.setState({
        categoriesAirTable: categories,
      })
    }catch(err){
      setTimeout(this.getCategoriesFromAirTable, 5000);
      debug(err);
    }
  }

  getCategoriesForAssets(country, city){
    const {
      assetsAirTable,
      categoriesAirTable,
    } = this.state;
    let categories = [];
    for(const asset of assetsAirTable){
      if(categories.includes(asset.category)){
        continue;
      }
      if(!asset.location){
        categories.push(categoriesAirTable[asset.category] ? asset.category : undefined);
      } else if (asset.location && asset.location.country === country && (!asset.location.cities || asset.location.cities.includes(city.toLowerCase()))){
        categories.push(categoriesAirTable[asset.category] ? asset.category : undefined);
      }
    }
    return categories;
  }

  getMYB() {
    return Brain.withdrawFromFaucet(this.state.user);
  }

  handleAssetFavorited(assetId) {
    const searchQuery = `mybit_watchlist_${assetId}`;
    const alreadyFavorite = window.localStorage.getItem(searchQuery) === 'true';
    if (alreadyFavorite) {
      localStorage.removeItem(searchQuery);
    } else {
      localStorage.setItem(searchQuery, true);
    }

    const assets = this.state.assets.slice();
    const asset = assets.filter(assetToFilter => assetToFilter.assetID === assetId)[0];

    asset.watchListed = !alreadyFavorite;

    this.setState({
      assets,
    });
  }

  resetNotifications(){
    this.setState({
      notifications: [],
    });
  }

  async handleMetamaskUpdate() {
    const {
      userIsLoggedIn,
    } = this.state;

    this.loadMetamaskUserDetails();
    this.fetchAssets();
    this.fetchTransactionHistory();
    this.resetNotifications();

    this.setState({
      assets: [],
      loading: {
        ...this.state.loading,
        assets: true,
        transactionHistory: !userIsLoggedIn ? false : true,
      },
    });
  }

  buildAndUpdateNotification(notificationId, type, status, params){
    this.updateNotification(notificationId, {
      [type]: {
        ...params,
      },
      status,
    });
  }

  async loadMetamaskUserDetails() {
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

  async fetchTransactionHistory() {
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

  async fetchAssets(assetId) {
    const {
      assetsAirTableById,
      prices,
      categoriesAirTable,
      user,
    } = this.state;
    if (!prices.ether || !assetsAirTableById || !categoriesAirTable) {
      setTimeout(this.fetchAssets, 10000);
      return;
    }
    await Brain.fetchAssets(user.userName, prices.ether.price, assetsAirTableById, categoriesAirTable)
      .then( async (response) => {
        const updatedAssets = await this.pullFileInfoForAssets(response);
        this.setState({
          assets: updatedAssets,
          loading: { ...this.state.loading, assets: false },
        });
      })
      .catch((err) => {
        debug(err);
        if (this.state.userIsLoggedIn) {
          setTimeout(this.fetchAssets, 5000);
        }
      });
  }

  async loadPrices() {
    try{
      const response = await fetch(InternalLinks.PRICES)
      const jsonResponse = await response.json();
      const {
        ethereum,
        mybit,
      } = jsonResponse;

      this.setState({
        prices: {
          ether: {
            price: ethereum.price,
            priceChangePercentage: ethereum.priceChangePercentage
          },
          mybit: {
            price: mybit.price,
            priceChangePercentage: mybit.priceChangePercentage.toFixed(2),
          },
        },
        loading: {
          priceMybit: false,
          priceEther: false,
        },
      });
    }catch(err){
      debug(err);
      setTimeout(this.loadPrices, 5000);
    }
  }

  render() {
    return (
      <BlockchainInfoContext.Provider value={this.state}>
        {this.props.children}
      </BlockchainInfoContext.Provider>
    );
  }
}

BlockchainInfo.defaultProps = {
  isBraveBrowser: false,
  userIsLoggedIn: false,
  network: undefined,
  isMetamaskInstalled: false,
  extensionUrl: undefined,
};

BlockchainInfo.propTypes = {
  children: PropTypes.node.isRequired,
  isMetamaskInstalled: PropTypes.bool,
  network: PropTypes.string,
  isBraveBrowser: PropTypes.bool,
  extensionUrl: PropTypes.string,
  userIsLoggedIn: PropTypes.bool,
};

export default BlockchainInfo;
