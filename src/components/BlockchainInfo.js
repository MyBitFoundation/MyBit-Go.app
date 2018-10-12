/* eslint-disable  react/no-unused-state */
/* eslint-disable  camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import BlockchainInfoContext from './BlockchainInfoContext';
import * as Brain from '../apis/brain';
import {
  debug,
  MYBIT_TICKER_COINMARKETCAP,
  ETHEREUM_TICKER_COINMARKETCAP,
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
    this.setAssertsStatusState = this.setAssertsStatusState.bind(this);
    this.changeNotificationPlace = this.changeNotificationPlace.bind(this);

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
      setAssertsStatusState: this.setAssertsStatusState,
      changeNotificationPlace: this.changeNotificationPlace,
      user: {},
      assertsNotification: {
        isLoading: false,
        transactionStatus: '',
        acceptedTos: false,
        alertType: '',
        alertMessage: '',
      },
      notificationPlace: 'notification',
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

  getMYB() {
    return Brain.withdrawFromFaucet(this.state.user);
  }

  setAssertsStatusState(state) {
    const { assertsNotification } = this.state;
    if (state) {
      this.setState({
        assertsNotification: {
          ...assertsNotification,
          ...state,
        },
      });
    } else {
      this.setState({
        assertsNotification: {
          isLoading: false,
          transactionStatus: '',
          acceptedTos: false,
          alertMessage: '',
          alertType: undefined,
        },
      });
    }
  }

  changeNotificationPlace(place) {
    // place can be "confirmation" or "notification"
    this.setState({
      notificationPlace: place,
    });
  }

  async fundAsset(assetId, amount) {
    await this.setAssertsStatusState({
      isLoading: true,
      transactionStatus: '',
      alertType: 'info',
      alertMessage: 'Accept the transaction in metamask and wait for a brief moment.',
    });

    try {
      const result = await Brain.fundAsset(
        this.state.user,
        assetId,
        amount,
      );

      const currentAssert = this.state.assets.find(item => item.assetID === assetId);

      if (result) {
        const alertMessage = `Funded ${currentAssert.name} with ${amount} Sent Successfully!`;

        this.setAssertsStatusState({
          isLoading: false,
          transactionStatus: 1,
          alertType: 'success',
          alertMessage,
        });
      } else {
        const alertMessage = `Funded ${currentAssert.name} with ${amount} ETH failed. Please try again.`;
        this.setAssertsStatusState({
          isLoading: false,
          transactionStatus: 0,
          alertType: 'error',
          alertMessage,
        });
      }
    } catch (err) {
      this.setAssertsStatusState({
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
        setTimeout(this.loadMetamaskUserDetails, 10000);
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
        setTimeout(this.fetchAssets, 10000);
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

export default BlockchainInfo;

BlockchainInfo.propTypes = {
  children: PropTypes.node.isRequired,
};
