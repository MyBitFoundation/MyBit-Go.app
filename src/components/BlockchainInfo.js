/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';
import BlockchainInfoContext from './BlockchainInfoContext';
import * as Brain from '../apis/brain';
import {
  debug,
  MYBIT_TICKER_COINMARKETCAP,
  ETHEREUM_TICKER_COINMARKETCAP,
  isAssetIdEnabled,
  serverIp,
  ethereumNetwork,
  fetchTransactionHistoryTime,
  loadMetamaskUserDetailsTime,
  pullAssetsFromServerTime,
  fetchAssetsFromWeb3Time,
  S3_URL,
  AIRTABLE_CATEGORIES_URL,
  AIRTABLE_ASSETS_URL,
  AIRTABLE_CATEGORIES_NUMBER_OF_FIELDS,
  AIRTABLE_ASSETS_NUMBER_OF_FIELDS
} from '../constants';

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAssets = this.fetchAssets.bind(this);
    this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
    this.loadMetamaskUserDetails = this.loadMetamaskUserDetails.bind(this);
    this.loadPrices = this.loadPrices.bind(this);
    this.fetchAssets = this.fetchAssets.bind(this);
    this.getMYB = this.getMYB.bind(this);
    this.fundAsset = this.fundAsset.bind(this);
    this.pullAssetsFromServer = this.pullAssetsFromServer.bind(this);
    this.setAssetsStatusState = this.setAssetsStatusState.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.changeNotificationPlace = this.changeNotificationPlace.bind(this);
    this.handleAssetFavorited = this.handleAssetFavorited.bind(this);
    this.usingServer = this.usingServer.bind(this);
    this.getAssetsFromAirTable = this.getAssetsFromAirTable.bind(this);
    this.getCategoriesForAssets = this.getCategoriesForAssets.bind(this);
    this.handleListAsset = this.handleListAsset.bind(this);
    this.getAssetFromAirTableByName = this.getAssetFromAirTableByName.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.getCategoriesFromAirTable = this.getCategoriesFromAirTable.bind(this);

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
      setAssetsStatusState: this.setAssetsStatusState,
      changeNotificationPlace: this.changeNotificationPlace,
      user: {},
      userHasMetamask: this.props.isMetamaskInstalled,
      network: this.props.network,
      isBraveBrowser: this.props.isBraveBrowser,
      extensionUrl: this.props.extensionUrl,
      userIsLoggedIn: this.props.userIsLoggedIn,
      handleClickedAssetFavorite: this.handleAssetFavorited,
      getCategoriesForAssets: this.getCategoriesForAssets,
      handleListAsset: this.handleListAsset,
      removeNotification: this.removeNotification,
      updateNotification: this.updateNotification,
      assetsNotification: {
        isLoading: false,
        transactionStatus: '',
        acceptedTos: false,
        alertType: '',
        alertMessage: '',
      },
      notificationPlace: 'notification',
      notifications: {},
      isUserContributing: false,
    };
  }

  async componentDidMount() {
    // TODO perhaps we don't need to wait for these here
    await Promise.all([this.getAssetsFromAirTable(), this.getCategoriesFromAirTable()]);
    const { userHasMetamask } = this.state;
    try {
      const usingServer = this.usingServer();
      if (!usingServer) {
        // we need the prices and the user details before getting the assets and transactions
        await Promise.all([this.loadMetamaskUserDetails(), this.loadPrices()]);
        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
        this.intervalFetchAssets =
          setInterval(this.fetchAssets, fetchAssetsFromWeb3Time);
        this.intervalFetchTransactionHistory =
          setInterval(this.fetchTransactionHistory, fetchTransactionHistoryTime);
        this.intervalLoadMetamaskUserDetails =
          setInterval(this.loadMetamaskUserDetails, loadMetamaskUserDetailsTime);
      } else {
        await this.loadPrices();
        this.pullAssetsFromServer();
        this.intervalAssetsFromServer =
          setInterval(this.pullAssetsFromServer, pullAssetsFromServerTime);
      }
    } catch (err) {
      debug(err);
    }

    if (userHasMetamask) {
      // event handler for when the selected account changes
      window.web3js.currentProvider.publicConfigStore.on('update', this.handleAddressChange);
    }

    setInterval(this.loadPrices, 15 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalFetchAssets);
    clearInterval(this.intervalAssetsFromServer);
    clearInterval(this.intervalLoadMetamaskUserDetails);
    clearInterval(this.intervalFetchTransactionHistory);
  }

  async handleListAsset(formData, setUserListingAsset){
    const {
      asset,
      userCountry,
      userCity,
      managementFee,
      category,
      fileList,
    } = formData;

    const {
      categoriesAirTable,
    } = this.state;

    const onSuccess = async (callback) => {
      await this.getAssetsFromAirTable();
      this.fetchAssets(callback, setUserListingAsset);
    }

    const result = await Brain.createAsset({
      updateNotification: this.updateNotification,
      userAddress: this.state.user.userName,
      managerPercentage: managementFee,
      assetName: asset,
      country: userCountry,
      city: userCity,
      assetType: categoriesAirTable[category].encoded,
      amountToBeRaisedInUSD: this.getAssetFromAirTableByName(asset).amountToBeRaisedInUSDAirtable,
      fileList,
      onSuccess,
      onFailure: () => setUserListingAsset(false),
    });

    debug(result);
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
      imageSrc: `${S3_URL}assetImages:${fields['Image']}`,
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
          const [assetId, city, country] = assetIdInfo.split('|');
          airtableAsset.city = city;
          airtableAsset.country = country;
          assetsAirTableById[assetId] = airtableAsset;
        })
      }
    })
    return assetsAirTableById;
  }

  async getAssetsFromAirTable(){
    const request = await fetch(AIRTABLE_ASSETS_URL);
    if(request.status !== 200){
      //TODO AIRTABLE DOWN - handle loader
    }
    const json = await request.json();
    const { records } = json;
    const assets = records.filter(({ fields })  => Object.keys(fields).length >= AIRTABLE_ASSETS_NUMBER_OF_FIELDS).map(this.processAssetsFromAirTable)
    const assetsById = this.processAssetsByIdFromAirTable(records.filter(({ fields })  => Object.keys(fields).length >= AIRTABLE_ASSETS_NUMBER_OF_FIELDS), assets);

    this.setState({
      assetsAirTable: assets,
      assetsAirTableById: assetsById,
    });
  }

  async getCategoriesFromAirTable(){
    const request = await fetch(AIRTABLE_CATEGORIES_URL);
    const json = await request.json();
    const { records } = json;
    const categories = this.processCategoriesFromAirTable(records.filter(({ fields })  => Object.keys(fields).length === AIRTABLE_CATEGORIES_NUMBER_OF_FIELDS));
    this.setState({
      categoriesAirTable: categories,
    })
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

  setAssetsStatusState(state) {
    const { assetsNotification } = this.state;
    if (state) {
      this.setState({
        assetsNotification: {
          ...assetsNotification,
          ...state,
        },
      });
    } else {
      this.setState({
        assetsNotification: {
          isLoading: false,
          transactionStatus: '',
          acceptedTos: false,
          alertMessage: '',
          alertType: undefined,
        },
      });
    }
  }

  usingServer() {
    const { userHasMetamask, userIsLoggedIn, network } = this.state;
    return !userHasMetamask || !userIsLoggedIn || network !== ethereumNetwork;
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

  changeNotificationPlace(place) {
    // place can be "confirmation" or "notification"
    this.setState({
      notificationPlace: place,
    });
  }

  async pullAssetsFromServer() {
    const { data } = await axios(serverIp);
    if (!data.assetsLoaded) {
      return;
    }
    let assetsToReturn = data.assets.map((asset) => {
      let watchListed = false;

      if (!this.usingServer()) {
        const searchQuery = `mybit_watchlist_${asset.assetID}`;
        watchListed = window.localStorage.getItem(searchQuery) || false;
      }

      let details = isAssetIdEnabled(asset.assetID, true);
      if (!details) {
        details = {};
        details.city = 'Zurich';
        details.country = 'Switzerland';
        details.description = 'Coming soon';
        details.details = 'Coming soon';
        details.name = 'Coming soon';
      }
      return {
        ...details,
        ...asset,
        fundingDeadline: dayjs(Number(asset.fundingDeadline) * 1000),
        watchListed,
      };
    });

    if (process.env.NODE_ENV !== 'development') {
      // filter for test assets. Only for development
      assetsToReturn = assetsToReturn.filter(asset =>
        asset.description !== 'Coming soon');
    }

    this.setState({
      usingServer: true,
      assets: assetsToReturn,
      transactions: [],
      loading: {
        ...this.state.loading,
        assets: false,
        transactionHistory: false,
      },
    });
  }

  async handleAddressChange({ selectedAddress }) {
    let shouldReloadUI = false;
    // case where user was not logged in but logged in and opposite case
    if (!this.state.userIsLoggedIn && selectedAddress) {
      shouldReloadUI = true;
      await this.loadMetamaskUserDetails();
      this.fetchAssets();
      this.fetchTransactionHistory();
      this.intervalFetchAssets =
        setInterval(this.fetchAssets, fetchAssetsFromWeb3Time);
      this.intervalFetchTransactionHistory =
        setInterval(this.fetchTransactionHistory, fetchTransactionHistoryTime);
      this.intervalLoadMetamaskUserDetails =
        setInterval(this.loadMetamaskUserDetails, loadMetamaskUserDetailsTime);
      clearInterval(this.intervalAssetsFromServer);
    } else if (this.state.userIsLoggedIn && !selectedAddress) {
      shouldReloadUI = true;
      this.pullAssetsFromServer();
      clearInterval(this.intervalFetchAssets);
      clearInterval(this.intervalFetchTransactionHistory);
      clearInterval(this.intervalLoadMetamaskUserDetails);
      this.intervalAssetsFromServer =
        setInterval(this.pullAssetsFromServer, pullAssetsFromServerTime);
    }

    if (shouldReloadUI) {
      this.setState({
        userIsLoggedIn: selectedAddress || false,
        assets: [],
        loading: {
          ...this.state.loading,
          assets: true,
          transactionHistory: true,
        },
      });
    }
  }

  async fundAsset(assetId, amount, onSuccessConfirmationPopup, onFailureContributionPopup, amountDollars) {
    try {
      const currentAsset = this.state.assets.find(item => item.assetID === assetId);
      const notificationId = Date.now();

      const onSuccessRefreshData = async () => {
        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
        onSuccessConfirmationPopup();
        this.updateNotification(notificationId, {
          fundingProps: {
            assetName: currentAsset.name,
            amount: amountDollars,
            operationType: 'contribution',
          },
          status: 'success',
        })
      }

      const result = await Brain.fundAsset(
        this.state.user,
        assetId,
        amount,
        onFailureContributionPopup,
        onSuccessRefreshData,
        notificationId,
        currentAsset.name,
        this.updateNotification,
        amountDollars
      );

      debug(result);

    } catch (err) {
      console.log(err);
    }
  }

  async fetchTransactionHistory() {
    await Brain.fetchTransactionHistory(this.state.user)
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

  async loadMetamaskUserDetails() {
    await Brain.loadMetamaskUserDetails()
      .then((response) => {
        this.setState({
          user: response,
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

  async fetchAssets(updateNotification, updateUserListingAsset) {
    if (!this.state.prices.ether) {
      setTimeout(this.fetchAssets, 10000);
      return;
    }
    this.setState({
      usingServer: false,
    });
    await Brain.fetchAssets(this.state.user, this.state.prices.ether.price, this.state.assetsAirTableById, this.state.categoriesAirTable)
      .then((response) => {
        this.setState({
          assets: response,
          loading: { ...this.state.loading, assets: false },
        }, () => {
          if(updateNotification){
            updateNotification();
          }
          if(updateUserListingAsset){
            updateUserListingAsset();
          }
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
    let error = false;
    await Brain.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP)
      .then((priceInfo) => {
        this.setState({
          prices: {
            ...this.state.prices,
            mybit: {
              price: priceInfo.price,
              priceChangePercentage: priceInfo.priceChangePercentage,
            },
          },
          loading: {
            ...this.state.loading,
            priceMybit: false,
          },
        });
      })
      .catch((err) => {
        debug(err);
        error = true;
      });
    await Brain.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP)
      .then((priceInfo) => {
        this.setState({
          prices: {
            ...this.state.prices,
            ether: {
              price: priceInfo.price,
              priceChangePercentage: priceInfo.priceChangePercentage,
            },
          },
          loading: {
            ...this.state.loading,
            priceEther: false,
          },
        });
      })
      .catch((err) => {
        debug(err);
        error = true;
      });
    if (error) {
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
