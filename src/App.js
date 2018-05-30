import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import './styles/App.css';

import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';

import * as actionCreators from './actions';
import routes from './routes';

import { MYBIT_TICKER_COINMARKETCAP, ETHEREUM_TICKER_COINMARKETCAP } from './constants';

class App extends Component {
  componentWillMount() {
    this.props.actions.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
    this.props.actions.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);

    const timeout = 30 * 1000;
    setTimeout(() => {
      this.props.actions.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP);
      this.props.actions.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP);
    }, timeout);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <div>
        <AppHeader
          state={this.props.state}
        />
        <NavigationBar currentPath={this.props.location.pathname} />
        <div className="page-wrapper">
          <Switch>
            {routes.map(({ path, exact, component: C }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={props => (
                  <C
                    {...props}
                    actions={actions}
                    state={state}
                  />
                )}
              />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  actions: PropTypes.shape({ fetchPriceFromCoinmarketcap: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
