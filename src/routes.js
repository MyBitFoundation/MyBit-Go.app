import React from 'react';
import { Redirect } from 'react-router-dom';
import AssetDetailsPage from './components/pages/AssetDetailsPage';
import AssetPaymentPage from './components/pages/AssetPaymentPage';
import ExploreAssetsPage from './components/pages/ExploreAssetsPage';
import ExplorePage from './components/pages/ExplorePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PortfolioPage from './components/pages/PortfolioPage';
import TransactionHistoryPage from './components/pages/TransactionHistoryPage';

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
    component: ExplorePage,
  },
  {
    path: '/explore/:category',
    exact: true,
    component: ExploreAssetsPage,
  },
  {
    path: '/explore/:category/:assetId',
    exact: true,
    component: AssetDetailsPage,
  },
  {
    path: '/portfolio',
    exact: true,
    component: PortfolioPage,
  },
  {
    path: '/transaction-history',
    exact: true,
    component: TransactionHistoryPage,
  },
  {
    path: '*',
    exact: false,
    component: NotFoundPage,
  },
];

export default routes;
