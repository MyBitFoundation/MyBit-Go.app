/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import BlockchainInfoContext from './BlockchainInfoContext';
import * as Brain from '../apis/brain';
import { debug, MYBIT_TICKER_COINMARKETCAP, ETHEREUM_TICKER_COINMARKETCAP } from '../constants';

class BlockchainInfo extends React.Component {
  constructor(props) {
    super(props);
    this.fetchAssets = this.fetchAssets.bind(this);
    this.fetchTransactionHistory = this.fetchTransactionHistory.bind(this);
    this.loadMetamaskUserDetails = this.loadMetamaskUserDetails.bind(this);
    this.loadPrices = this.loadPrices.bind(this);
    this.fetchAssets = this.fetchAssets.bind(this);

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
    };
  }

  async UNSAFE_componentWillMount() {
    try {
      // we need the prices and the user details before getting the assets and transactions
      await Promise.all([this.loadMetamaskUserDetails(), this.loadPrices()]);
      await Promise.all([this.fetchAssets(), this.fetchTransactionHistory()]);
    } catch (err) {
      debug(err);
    }

    setInterval(this.loadPrices, 30 * 1000);
  }

  async fetchTransactionHistory() {
    await Brain.fetchTransactionHistory(this.state.user).then((response) => {
      this.setState({
        transactions: response,
        loading: { ...this.state.loading, transactionHistory: false },
      });
    }).catch((err) => {
      debug(err);
      setTimeout(this.fetchTransactionHistory, 200);
    });
  }

  async loadMetamaskUserDetails() {
    await Brain.loadMetamaskUserDetails().then((response) => {
      this.setState({ user: response, loading: { ...this.state.loading, user: false } });
    }).catch((err) => {
      debug(err);
      setTimeout(this.loadMetamaskUserDetails, 200);
    });
  }

  async fetchAssets() {
    if (!this.state.prices.etherPrice) {
      setTimeout(this.fetchAssets, 200);
      return;
    }
    await Brain.fetchAssets(this.state.user, this.state.prices.ether).then((response) => {
      this.setState({ assets: response, loading: { ...this.state.loading, assets: false } });
    }).catch((err) => {
      debug(err);
      setTimeout(this.fetchAssets, 200);
    });
  }

  async loadPrices() {
    let error = false;
    await Brain.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP).then((price) => {
      this.setState({
        prices: {
          ...this.state.prices,
          mybitPrice: price,
        },
        loading: {
          ...this.state.loading,
          priceMybit: false,
        },
      });
    }).catch((err) => {
      debug(err);
      error = true;
    });
    await Brain.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP).then((price) => {
      this.setState({
        prices: {
          ...this.state.prices,
          etherPrice: price,
        },
        loading: {
          ...this.state.loading,
          priceEther: false,
        },
      });
    }).catch((err) => {
      debug(err);
      error = true;
    });
    if (error) {
      setTimeout(this.loadPrices, 200);
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

export default BlockchainInfo;

BlockchainInfo.propTypes = {
  children: PropTypes.node.isRequired,
};
