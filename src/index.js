import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'gridlex/dist/gridlex.min.css';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BlockchainInfo from './components/BlockchainInfo';
import MetamaskChecker from './components/MetamaskChecker';
import Layout from './components/Layout';

ReactDOM.render(
  <Layout>
    <BrowserRouter>
      <MetamaskChecker>
        <BlockchainInfo>
          <App />
        </BlockchainInfo>
      </MetamaskChecker>
    </BrowserRouter>
  </Layout>,
  document.getElementById('root'),
);
registerServiceWorker();
