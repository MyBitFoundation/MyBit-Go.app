/* eslint-disable  react/prop-types */

import React from 'react';
import { Redirect } from 'react-router-dom';
import AssetDetailsPage from './components/pages/AssetDetailsPage';
import ExploreAssetsPage from './components/pages/ExploreAssetsPage';
import ExplorePage from './components/pages/ExplorePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PortfolioPage from './components/pages/PortfolioPage';
import TransactionHistoryPage from './components/pages/TransactionHistoryPage';
import HelpPage from './components/pages/HelpPage';
import BlockchainInfoContext from './components/BlockchainInfoContext';
import LandingPage from './components/pages/LandingPage';
import WatchListPage from './components/pages/WatchListPage';

const redirectToOnFirstVisit = '/landing';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/explore" />,
  }, {
    path: '/landing',
    exact: true,
    component: () => <LandingPage />,
  }, {
    path: '/explore',
    exact: true,
    component: ({ isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {({ loading, assets, handleClickedAssetFavorite }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <ExplorePage
              loading={loading}
              assets={assets}
              handleClickedAssetFavorite={handleClickedAssetFavorite}
            />
          ))
        }
      </BlockchainInfoContext.Consumer>
    ),
  }, {
    path: '/watchlist',
    exact: true,
    component: ({ isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {({ loading, assets, handleClickedAssetFavorite }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <WatchListPage
              loading={loading}
              assets={assets}
              handleClickedAssetFavorite={handleClickedAssetFavorite}
            />
          ))
        }
      </BlockchainInfoContext.Consumer>
    ),
  }, {
    path: '/explore/:category',
    exact: true,
    component: ({ match, isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {({ loading, assets }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <ExploreAssetsPage
              loading={loading}
              assets={assets}
              match={match}
            />
          ))
        }
      </BlockchainInfoContext.Consumer>
    ),
  },
  {
    path: '/explore/:category/:assetId',
    exact: true,
    component: ({ match, isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {({
          loading, assets, prices, user, changeNotificationPlace,
          setAssetsStatusState, handleClickedAssetFavorite,
          }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <AssetDetailsPage
              ether={prices.ether}
              loading={loading}
              assets={assets}
              match={match}
              user={user}
              changeNotificationPlace={changeNotificationPlace}
              setAssetsStatusState={setAssetsStatusState}
              handleClickedAssetFavorite={handleClickedAssetFavorite}
            />
          ))
        }
      </BlockchainInfoContext.Consumer>
    ),
  },
  {
    path: '/portfolio',
    exact: true,
    component: ({ isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {({ loading, prices, assets }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <PortfolioPage loading={loading} prices={prices} assets={assets} />
          ))
        }
      </BlockchainInfoContext.Consumer>
    ),
  },
  {
    path: '/transaction-history',
    exact: true,
    component: ({ isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {({ loading, fetchTransactionHistory, transactions }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <TransactionHistoryPage
              loading={loading}
              fetchTransactionHistory={fetchTransactionHistory}
              transactions={transactions}
            />
          ))
        }
      </BlockchainInfoContext.Consumer>
    ),
  },
  {
    path: '/help',
    exact: true,
    component: () => (
      <BlockchainInfoContext.Consumer>
        {({ fetchMyBit }) => <HelpPage fetchMyBit={fetchMyBit} />}
      </BlockchainInfoContext.Consumer>
    ),
  },
  {
    path: '*',
    exact: false,
    component: ({ isFirstVisit }) =>
      (isFirstVisit ? <Redirect to={redirectToOnFirstVisit} /> : <NotFoundPage />),
  },
];

export default routes;
