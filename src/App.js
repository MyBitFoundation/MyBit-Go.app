/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import BlockchainInfoContext from './components/BlockchainInfoContext';
import routes from './routes';
import MetamaskChecker from './components/MetamaskChecker';

class App extends Component {
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
    const firstVisit = this.isFirstVisit();
    return (
      <div>
        <MetamaskChecker
          shouldDisplay={this.props.location.pathname !== '/help'}
        />
        <BlockchainInfoContext.Consumer>
          {({ user, prices }) => <AppHeader user={user} prices={prices} />}
        </BlockchainInfoContext.Consumer>
        <NavigationBar currentPath={this.props.location.pathname} />
        <div className="page-wrapper">
          <Switch>
            {routes.map(({ path, exact, component: C }) => (
              <Route
                key={path}
                path={path}
                exact={exact}
                render={props => <C isFirstVisit={firstVisit} {...props} />}
              />
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

export default withRouter(App);
