import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import BlockchainInfoContext from './components/BlockchainInfoContext';
import Notifications from './components/Notifications';
import BancorContainer from './components/UI/BancorContainer';
import routes from './routes';
import CirclesBackgroundWrapper from './components/CirclesBackgroundWrapper';
import {
  ethereumNetwork,
  metamaskErrors,
} from './constants/index';

class App extends Component {
  isFirstVisit() {
    // let the explore component handle this
    if (this.props.location.pathname === '/') {
      return false;
    }
    try {
      if (localStorage.getItem('mybitUser2') === null) {
        localStorage.setItem('mybitUser2', 'true');
        localStorage.setItem('onboardingRedirect', this.props.location.pathname);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  isFirstListAssetVisit(firstVisit) {
    // let the explore component handle this
    try {
      if (this.props.location.pathname === '/list-asset' && !firstVisit &&
            localStorage.getItem('first-list-asset-visit') === null) {
        localStorage.setItem('first-list-asset-visit', 'true');
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  render() {
    const firstVisit = this.isFirstVisit();
    const firstListAssetVisit = this.isFirstListAssetVisit(firstVisit);

    return (
      <CirclesBackgroundWrapper>
        <BancorContainer>
          <BlockchainInfoContext.Consumer>
            {({
              user,
              prices,
              userHasMetamask,
              userIsLoggedIn,
              network,
              isBraveBrowser,
              extensionUrl,
              enabled,
            }) => (
              <React.Fragment>
                <AppHeader
                  user={user}
                  prices={prices.mybit}
                  usingServer={!userHasMetamask || !userIsLoggedIn || network !== ethereumNetwork || !enabled}
                />
                <NavigationBar
                  currentPath={this.props.location.pathname}
                />
                {metamaskErrors('MetaMaskErrors', userHasMetamask, extensionUrl, isBraveBrowser, userIsLoggedIn, network, enabled)}
              </React.Fragment>
            )}
          </BlockchainInfoContext.Consumer>
          <BlockchainInfoContext.Consumer>
            {({
              notifications,
              removeNotification,
            }) =>
              <Notifications
                data={notifications}
                removeNotification={removeNotification}
              />
            }
          </BlockchainInfoContext.Consumer>

          <div className="page-wrapper">
            <Switch>
              {routes.map(({ path, exact, component: C }) => (
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  render={props => <C isFirstVisit={firstVisit} isFirstListAssetVisit={firstListAssetVisit} {...props} />}
                />
              ))}
            </Switch>
          </div>
        </BancorContainer>
      </CirclesBackgroundWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

export default withRouter(App);
