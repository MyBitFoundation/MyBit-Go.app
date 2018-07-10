import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import './styles/App.css';
import AppHeader from './components/AppHeader';
import NavigationBar from './components/NavigationBar';
import BlockchainInfoContext from './components/BlockchainInfoContext';
import routes from './routes';

const App = ({ location }) => (
  <div>
    <BlockchainInfoContext.Consumer>
      {({ user, prices }) => <AppHeader user={user} prices={prices} /> }
    </BlockchainInfoContext.Consumer>
    <NavigationBar currentPath={location.pathname} />
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
              />
            )}
          />
        ))}
      </Switch>
    </div>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default withRouter(App);
