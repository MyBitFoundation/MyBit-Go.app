import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'carbon-components/css/carbon-components.min.css';
import './styles/index.css';
import './styles/semantic-custom.css';
import 'gridlex/dist/gridlex.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, withRouter } from 'react-router-dom';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
