/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
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
  checkIfLoggedInTime,
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
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.setAssetsStatusState = this.setAssetsStatusState.bind(this);
    this.changeNotificationPlace = this.changeNotificationPlace.bind(this);
    this.handleAssetFavorited = this.handleAssetFavorited.bind(this);

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
      assetsNotification: {
        isLoading: false,
        transactionStatus: '',
        acceptedTos: false,
        alertType: '',
        alertMessage: '',
      },
      notificationPlace: 'notification',
    };
  }

  async componentDidMount() {
    const { userHasMetamask, userIsLoggedIn, network } = this.state;
    try {
      if (userHasMetamask && userIsLoggedIn && network === ethereumNetwork) {
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
        this.loadPrices();
        this.pullAssetsFromServer();
      }
    } catch (err) {
      debug(err);
    }

    if (!userHasMetamask || !userIsLoggedIn || network !== ethereumNetwork) {
      this.intervalAssetsFromServer =
        setInterval(this.pullAssetsFromServer, pullAssetsFromServerTime);
    }
    if (userHasMetamask) {
      setInterval(this.checkIfLoggedIn, checkIfLoggedInTime);
    }

    setInterval(this.loadPrices, 15 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalFetchAssets);
    clearInterval(this.intervalAssetsFromServer);
    clearInterval(this.intervalLoadMetamaskUserDetails);
    clearInterval(this.intervalFetchTransactionHistory);
    clearInterval(this.checkIfLoggedIn);
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
    const assetsToReturn = data.assets.map((asset) => {
      const searchQuery = `mybit_watchlist_${asset.assetID}`;
      const alreadyFavorite = window.localStorage.getItem(searchQuery) || false;

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
        watchListed: alreadyFavorite,
      };
    });

    this.setState({
      assets: assetsToReturn,
      transactions: [],
      loading: {
        ...this.state.loading,
        assets: false,
        transactionHistory: false,
      },
    });
  }

  async checkIfLoggedIn() {
    const isLoggedIn = await this.props.checkIfLoggedIn();
    // case where user was not logged in but logged in and opposite case
    if (!this.state.userIsLoggedIn && isLoggedIn) {
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
    } else if (this.state.userIsLoggedIn && !isLoggedIn) {
      this.pullAssetsFromServer();
      clearInterval(this.intervalFetchAssets);
      clearInterval(this.intervalFetchTransactionHistory);
      clearInterval(this.intervalLoadMetamaskUserDetails);
      this.intervalAssetsFromServer =
        setInterval(this.pullAssetsFromServer, pullAssetsFromServerTime);
    }

    this.setState({
      userIsLoggedIn: isLoggedIn,
    });
  }

  async fundAsset(assetId, amount) {
    await this.setAssetsStatusState({
      isLoading: true,
      transactionStatus: '',
      alertType: 'info',
      alertMessage: 'After accepting the transaction in Metamask it may take several minutes to be processed by Ethereum Network. You can explore the platform while this occurs.',
    });

    try {
      const currentAsset = this.state.assets.find(item => item.assetID === assetId);

      const result = await Brain.fundAsset(
        this.state.user,
        assetId,
        amount,
      );

      if (result) {
        const { notificationPlace } = this.state;
        const Message = (
          <Fragment>Funded {currentAsset.name} successfully with {amount}.
            <Link to="/portfolio" href="/portfolio">Go to Portfolio.</Link>
          </Fragment>
        );

        const alertMessage = notificationPlace === 'notification'
          ? Message
          : 'Sent Successfuly!';

        this.setAssetsStatusState({
          isLoading: false,
          transactionStatus: 1,
          alertType: 'success',
          alertMessage,
        });

        this.setState({
          loading: {
            assets: true,
          },
        });

        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);

        this.setState({
          loading: {
            assets: false,
          },
        });

        this.intervalFetchAssets =
          setInterval(this.fetchAssets, fetchAssetsFromWeb3Time);
        this.intervalFetchTransactionHistory =
          setInterval(this.fetchTransactionHistory, fetchTransactionHistoryTime);
      } else {
        const { notificationPlace } = this.state;
        const Message = (
          <Fragment>Funded {currentAsset.name} with {amount} ETH failed.
            <Link to="/portfolio" href="/portfolio">Please try again.</Link>
          </Fragment>
        );

        const alertMessage = notificationPlace === 'notification'
          ? Message
          : 'Transaction failed. Please try again.';

        this.setAssetsStatusState({
          isLoading: false,
          transactionStatus: 0,
          alertType: 'error',
          alertMessage,
        });
      }
    } catch (err) {
      this.setAssetsStatusState({
        isLoading: false,
      });
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

  async fetchAssets() {
    if (!this.state.prices.ether) {
      setTimeout(this.fetchAssets, 10000);
      return;
    }

    await Brain.fetchAssets(this.state.user, this.state.prices.ether.price)
      .then((response) => {
        this.setState({
          assets: response,
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
  checkIfLoggedIn: undefined,
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
  checkIfLoggedIn: PropTypes.func,
};

export default BlockchainInfo;
