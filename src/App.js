/* eslint-disable camelcase */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import AssetDetailsPage from './components/pages/AssetDetailsPage';
import AssetPaymentPage from './components/pages/AssetPaymentPage';
import ExploreAssetsPage from './components/pages/ExploreAssetsPage';
import ExplorePage from './components/pages/ExplorePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PortfolioPage from './components/pages/PortfolioPage';
import TransactionHistoryPage from './components/pages/TransactionHistoryPage';
import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import * as actions from './actions';
import { MYBIT_TICKER_COINMARKETCAP, ETHEREUM_TICKER_COINMARKETCAP } from './constants';

class App extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
    this.props.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);

    const timeout = 30 * 1000;
    setTimeout(() => {
      this.props.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
      this.props.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);
    }, timeout);
  }

  render() {
    const { state, setTransactionHistoryFilters, fetchTransactionHistory } = this.props;
    return (
      <div>
        <AppHeader
          state={this.props.state}
        />
        <NavigationBar currentPath={this.props.location.pathname} />
        <div className="page-wrapper">
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/explore" />} />
            <Route exact path="/asset-payment" component={AssetPaymentPage} />
            <Route exact path="/explore" render={props => <ExplorePage state={state} {...props} />} />
            <Route exact path="/explore/:category" render={props => <ExploreAssetsPage state={state} {...props} />} />
            <Route exact path="/explore/:category/:assetId" render={props => <AssetDetailsPage state={state} {...props} />} />
            <Route exact path="/portfolio" render={props => <PortfolioPage state={state} {...props} />} />
            <Route
              exact
              path="/transaction-history"
              render={props => (
                <TransactionHistoryPage
                  state={state}
                  fetchTransactionHistory={fetchTransactionHistory}
                  setTransactionHistoryFilters={setTransactionHistoryFilters}
                  {...props}
                />)}
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchPriceFromCoinmarketcap: PropTypes.func.isRequired,
  fetchTransactionHistory: PropTypes.func.isRequired,
  setTransactionHistoryFilters: PropTypes.func.isRequired,
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps, actions)(App));
