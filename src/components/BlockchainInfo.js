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
      user: {},
      userHasMetamask: this.props.isMetamaskInstalled,
      network: this.props.network,
      isBraveBrowser: this.props.isBraveBrowser,
      extensionUrl: this.props.extensionUrl,
      userIsLoggedIn: this.props.userIsLoggedIn,
    };
  }

  async componentDidMount() {
    const { userHasMetamask, userIsLoggedIn } = this.state;
    try {
      if (userHasMetamask && userIsLoggedIn) {
        // we need the prices and the user details before getting the assets and transactions
        await Promise.all([this.loadMetamaskUserDetails(), this.loadPrices()]);
        await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
      } else {
        this.loadPrices();
        this.pullAssetsFromServer();
      }
    } catch (err) {
      debug(err);
    }

    if (!userHasMetamask || !userIsLoggedIn) {
      this.intervalAssetsFromServer = setInterval(this.pullAssetsFromServer, 30 * 1000);
    }
    if (userHasMetamask) {
      setInterval(this.checkIfLoggedIn, 10 * 1000);
    }

    setInterval(this.loadPrices, 30 * 1000);
  }

  getMYB() {
    return Brain.withdrawFromFaucet(this.state.user);
  }

  async checkIfLoggedIn() {
    const isLoggedIn = await this.props.checkIfLoggedIn();

    // case where user was not logged in but logged in and opposite case
    if (!this.state.userIsLoggedIn && isLoggedIn) {
      await this.loadMetamaskUserDetails();
      this.fetchAssets();
      this.fetchTransactionHistory();
      clearInterval(this.intervalAssetsFromServer);
    } else if (this.state.userIsLoggedIn && !isLoggedIn) {
      this.intervalAssetsFromServer = setInterval(this.pullAssetsFromServer, 30 * 1000);
    }

    this.setState({
      userIsLoggedIn: isLoggedIn,
    });
  }

  async pullAssetsFromServer() {
    const { data } = await axios(serverIp);
    if (!data.assetsLoaded) {
      return;
    }
    const assetsToReturn = data.assets.map((asset) => {
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
      };
    });

    this.setState({
      assets: assetsToReturn,
      loading: { ...this.state.loading, assets: false },
    });
  }

  fundAsset(assetId, amount) {
    return Brain.fundAsset(this.state.user, assetId, amount);
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
        setTimeout(this.fetchTransactionHistory, 10000);
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
          setTimeout(this.loadMetamaskUserDetails, 10000);
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
          setTimeout(this.fetchAssets, 10000);
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
      setTimeout(this.loadPrices, 10000);
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
  isBraveBrowser: false,
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
