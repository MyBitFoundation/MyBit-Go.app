/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */

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
import HelpPage from './components/pages/HelpPage';
import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import MetamaskChecker from './components/MetamaskChecker';

import * as actions from './actions';
import { MYBIT_TICKER_COINMARKETCAP, ETHEREUM_TICKER_COINMARKETCAP } from './constants';

class App extends Component {
  async UNSAFE_componentWillMount() {
    this.props.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
    this.props.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);

    const timeout = 30 * 1000;
    setTimeout(() => {
      this.props.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
      this.props.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);
    }, timeout);
    this.getUserDetails();
  }

  getUserDetails() {
    //this can fail if the user is not logged in to metamask
    //in which case  we want to keep trying to get the details
    //until the user logs in
    //TODO Improve
    this.props.loadMetamaskUserDetails((success) => {
      if (!success) {
        setTimeout(() => this.getUserDetails(), 100);
      }
    });
  }

  isFirstVisit() {
    try {
      if (localStorage.getItem('mybitUser') === null) {
        localStorage.setItem('mybitUser', 'true');
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  render() {
    const { state, setTransactionHistoryFilters, fetchTransactionHistory } = this.props;
    const firstVisit = this.isFirstVisit();
    return (
      <div>
        <AppHeader
          state={this.props.state}
        />
        <NavigationBar currentPath={this.props.location.pathname} />
        <MetamaskChecker />
        <div className="page-wrapper">
          <Switch>
            <Route exact path="/" render={() => (firstVisit ? <Redirect to="/help" /> : <Redirect to="/explore" />)} />
            <Route exact path="/asset-payment" render={() => (firstVisit ? <Redirect to="/help" /> : <AssetPaymentPage />)} />
            <Route exact path="/explore" render={props => (firstVisit ? <Redirect to="/help" /> : <ExplorePage state={state} {...props} />)} />
            <Route exact path="/explore/:category" render={props => (firstVisit ? <Redirect to="/help" /> : <ExploreAssetsPage state={state} {...props} />)} />
            <Route exact path="/explore/:category/:assetId" render={props => (firstVisit ? <Redirect to="/help" /> : <AssetDetailsPage state={state} {...props} />)} />
            <Route exact path="/portfolio" render={props => (firstVisit ? <Redirect to="/help" /> : <PortfolioPage state={state} {...props} />)} />
            <Route exact path="/help" render={props => <HelpPage state={state} {...props} />} />
            <Route
              exact
              path="/transaction-history"
              render={props => (
                firstVisit ? <Redirect to="/help" /> :
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
  loadMetamaskUserDetails: PropTypes.func.isRequired,
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

const mapStateToProps = state => ({ state });

export default withRouter(connect(mapStateToProps, actions)(App));
