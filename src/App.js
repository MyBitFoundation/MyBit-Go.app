/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import BlockchainInfoContext from './components/BlockchainInfoContext';
import BancorContainer from './components/UI/BancorContainer';
import CivicContainer, { Consumer as CivicConsumer } from './components/UI/CivicContainer';
import routes from './routes';
import CirclesBackgroundWrapper from './components/CirclesBackgroundWrapper';
import {
  ethereumNetwork,
  metamaskErrors,
} from './constants/index';
import Notification from './components/Notification';

class App extends Component {
  isFirstVisit() {
    // let the explore component handle this
    if (this.props.location.pathname === '/') {
      return false;
    }
    try {
      if (localStorage.getItem('mybitUser2') === null) {
        localStorage.setItem('mybitUser2', 'true');
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
        <CivicContainer>
          <BancorContainer>
            <BlockchainInfoContext.Consumer>
              {({
                user,
                prices,
                userHasMetamask,
                userIsLoggedIn,
                network,
                setAssetsStatusState,
                assetsNotification,
                notificationPlace,
                isBraveBrowser,
                extensionUrl,
              }) => (
                <React.Fragment>
                  <AppHeader
                    user={user}
                    prices={prices.mybit}
                    usingServer={!userHasMetamask || !userIsLoggedIn || network !== ethereumNetwork}
                    setAssetsStatusState={setAssetsStatusState}
                    assetsNotification={assetsNotification}
                    notificationPlace={notificationPlace}
                  />
                  <NavigationBar
                    setAssetsStatusState={setAssetsStatusState}
                    currentPath={this.props.location.pathname}
                  />
                  {metamaskErrors('MetaMaskErrors', userHasMetamask, extensionUrl, isBraveBrowser, userIsLoggedIn, network)}
                </React.Fragment>
              )}
            </BlockchainInfoContext.Consumer>

            <div className="notification_wrapper">
              <BlockchainInfoContext.Consumer>
                {({
                  notificationPlace,
                  setAssetsStatusState,
                  assetsNotification,
                }) => {
                  if (notificationPlace === 'notification') {
                    return (<Notification
                      setAssetsStatusState={setAssetsStatusState}
                      assetsNotification={assetsNotification}
                    />);
                  }
                  return null;
                }}
              </BlockchainInfoContext.Consumer>
            </div>
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
          </BancorContainer>
        </CivicContainer>
      </CirclesBackgroundWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

export default withRouter(App);
