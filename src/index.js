import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import 'carbon-components/css/carbon-components.min.css';
import 'gridlex/dist/gridlex.min.css';
import './styles/index.css';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { fetchAssets } from './actions';

// Redux Configuration
const middleware = [];
const enhancers = [];

middleware.push(ReduxThunk);

if (process.env.NODE_ENV !== 'production') {
  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middleware.push(logger);
}

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// Apply Middleware & Compose Enhancers
enhancers.push(applyMiddleware(...middleware));
const enhancer = composeEnhancers(...enhancers);

const initialState = {};
const store = createStore(rootReducer, initialState, enhancer);
const history = createHistory();

store.dispatch(fetchAssets());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
