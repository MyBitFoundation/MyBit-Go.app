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
  componentWillMount() {
    this.props.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
    this.props.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);

    setTimeout(() => {
      this.props.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
      this.props.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);
    }, 5 * 60000);
  }

  render() {
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
            <Route exact path="/explore" component={ExplorePage} />
            <Route exact path="/explore/:category" component={match => <ExploreAssetsPage state={this.props.state} match={match.match} />} />
            <Route exact path="/explore/:category/:assetId" component={match => <AssetDetailsPage state={this.props.state} match={match.match} />} />
            <Route exact path="/portfolio" component={() => <PortfolioPage state={this.props.state} />} />
            <Route exact path="/transaction-history" component={() => <TransactionHistoryPage state={this.props.state} setTransactionHistoryFilters={this.props.setTransactionHistoryFilters} />} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchPriceFromCoinmarketcap: PropTypes.func.isRequired,
  setTransactionHistoryFilters: PropTypes.func.isRequired,
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,

};

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps, actions)(App));
