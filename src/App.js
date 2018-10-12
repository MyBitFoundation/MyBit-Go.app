/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import BlockchainInfoContext from './components/BlockchainInfoContext';
import routes from './routes';
import CirclesBackgroundWrapper from './components/CirclesBackgroundWrapper';

class App extends Component {
  isFirstVisit() {
    // let the explore component handle this
    if (this.props.location.pathname === '/') {
      return false;
    }
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
      <CirclesBackgroundWrapper>
        <BlockchainInfoContext.Consumer>
          {({
            user, prices, userHasMetamask, userIsLoggedIn,
          }) => (
            <AppHeader
              user={user}
              prices={prices.mybit}
              usingServer={!userHasMetamask || !userIsLoggedIn}
            />
          )}
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
      </CirclesBackgroundWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

export default withRouter(App);
