import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'gridlex/dist/gridlex.min.css';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BlockchainInfo from './components/BlockchainInfo';

ReactDOM.render(
  <BlockchainInfo>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </BlockchainInfo>,
  document.getElementById('root'),
);
registerServiceWorker();
