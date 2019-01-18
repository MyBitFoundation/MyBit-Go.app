import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'gridlex/dist/gridlex.min.css';
import './styles/index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import BlockchainInfo from './components/BlockchainInfo';
import AirtableProvider from './components/Airtable';
import MetamaskChecker from './components/MetamaskChecker/index';
import Layout from './components/Layout';

ReactDOM.render(
  <Layout>
    <BrowserRouter>
      <AirtableProvider>
        <MetamaskChecker>
          <BlockchainInfo>
            <App />
          </BlockchainInfo>
        </MetamaskChecker>
      </AirtableProvider>
    </BrowserRouter>
  </Layout>,
  document.getElementById('root'),
);
// registerServiceWorker();
