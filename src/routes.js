/* eslint-disable  react/prop-types */

import React from 'react';
import { Redirect } from 'react-router-dom';
import AssetDetailsPage from './components/pages/AssetDetailsPage';
import AssetPaymentPage from './components/pages/AssetPaymentPage';
import ExploreAssetsPage from './components/pages/ExploreAssetsPage';
import ExplorePage from './components/pages/ExplorePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PortfolioPage from './components/pages/PortfolioPage';
import TransactionHistoryPage from './components/pages/TransactionHistoryPage';
import BlockchainInfoContext from './components/BlockchainInfoContext';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/explore" />,
  },
  {
    path: '/asset-payment',
    exact: true,
    component: AssetPaymentPage,
  },
  {
    path: '/explore',
    exact: true,
    component: () => (
      <BlockchainInfoContext.Consumer>
        {({ loading, assets }) =>
          (<ExplorePage
            loading={loading}
            assets={assets}
          />)
        }
      </BlockchainInfoContext.Consumer>
    ),
  },
  {
    path: '/explore/:category',
    exact: true,
    component: ({ match }) => (
      <BlockchainInfoContext.Consumer>
        {({ loading, assets }) =>
          (<ExploreAssetsPage
            loading={loading}
            assets={assets}
            match={match}
          />)
        }
      </BlockchainInfoContext.Consumer>),
  },
  {
    path: '/explore/:category/:assetId',
    exact: true,
    component: ({ match }) => (
      <BlockchainInfoContext.Consumer>
        {({ loading, assets, prices }) =>
          (<AssetDetailsPage
            prices={prices}
            loading={loading}
            assets={assets}
            match={match}
          />)
        }
      </BlockchainInfoContext.Consumer>),
  },
  {
    path: '/portfolio',
    exact: true,
    component: () => (
      <BlockchainInfoContext.Consumer>
        {({ loading, prices, assets }) =>
          (<PortfolioPage
            loading={loading}
            prices={prices}
            assets={assets}
          />)
        }
      </BlockchainInfoContext.Consumer>),
  },
  {
    path: '/transaction-history',
    exact: true,
    component: () => (
      <BlockchainInfoContext.Consumer>
        {({ loading, fetchTransactionHistory, transactions }) =>
          (<TransactionHistoryPage
            loading={loading}
            fetchTransactionHistory={fetchTransactionHistory}
            transactions={transactions}
          />)
        }
      </BlockchainInfoContext.Consumer>),
  },
  {
    path: '*',
    exact: false,
    component: NotFoundPage,
  },
];

export default routes;
