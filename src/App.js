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

class App extends Component {
  componentWillMount() {
    this.props.fetchAssets();
  }

  render() {
    return (
      <div>
        <AppHeader
          exchangeRate={2.13}
          myBitBalance={215}
          ethBalance={20}
          address="0x123f681646d4a755815f9cb19e1acc8565a0c2ac"
        />
        <NavigationBar />
        <div className="page-wrapper">
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/explore" />} />
            <Route exact path="/asset-payment" component={AssetPaymentPage} />
            <Route exact path="/explore" component={ExplorePage} />
            <Route exact path="/explore/:category" component={ExploreAssetsPage} />
            <Route exact path="/explore/:category/:assetId" component={AssetDetailsPage} />
            <Route exact path="/portfolio" component={PortfolioPage} />
            <Route exact path="/transaction-history" component={TransactionHistoryPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchAssets: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({ fetchAssets: () => dispatch(actions.fetchAssets()) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
