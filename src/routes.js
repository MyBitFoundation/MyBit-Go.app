/* eslint-disable  react/prop-types */

import React from 'react';
import { Redirect } from 'react-router-dom';
import AssetDetailsPage from './components/pages/AssetDetailsPage';
import ExplorePage from './components/pages/ExplorePage';
import NotFoundPage from './components/pages/NotFoundPage';
import PortfolioPage from './components/pages/PortfolioPage';
import TransactionHistoryPage from './components/pages/TransactionHistoryPage';
import HelpPage from './components/pages/HelpPage';
import BlockchainInfoContext from './components/BlockchainInfoContext';
import LandingPage from './components/pages/LandingPage';
import WatchListPage from './components/pages/WatchListPage';
import OnboardingPage from './components/pages/OnboardingPage';
import ListAssetPage from './components/pages/ListAssetPage'
import AssetManagerPage from './components/pages/AssetManagerPage'
import PortfolioManagedAssetPage from './components/pages/PortfolioManagedAssetPage'

const redirectToOnFirstVisit = '/onboarding';
const redirectOnFirstListAssetVisit = '/asset-manager';

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
        {({ loading, assets, handleClickedAssetFavorite, categoriesAirTable }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <ExplorePage
              loading={loading}
              assets={assets}
              handleClickedAssetFavorite={handleClickedAssetFavorite}
              categoriesAirTable={categoriesAirTable}
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
        {({ loading, assets, handleClickedAssetFavorite, categoriesAirTable }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <WatchListPage
              loading={loading}
              assets={assets}
              handleClickedAssetFavorite={handleClickedAssetFavorite}
              categoriesAirTable={categoriesAirTable}
            />
          ))
        }
      </BlockchainInfoContext.Consumer>
    ),
  }, {
    path: '/explore/:assetId',
    exact: true,
    component: ({ match, isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {({
          loading,
          assets,
          prices,
          user,
          handleClickedAssetFavorite,
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
        {({ loading, prices, assets, withdrawInvestorProfit, withdrawingAssetIds }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <PortfolioPage
              loading={loading}
              prices={prices}
              assets={assets}
              withdrawingAssetIds={withdrawingAssetIds}
              withdrawInvestorProfit={withdrawInvestorProfit}
            />
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
    path: '/managed-asset',
    exact: true,
    component: ({ isFirstVisit }) =>
    (isFirstVisit ? <Redirect to={redirectToOnFirstVisit} /> : (
      <PortfolioManagedAssetPage />
    )),
  },
  {
    path: '/help',
    exact: true,
    component: ({ isFirstVisit }) =>
    (isFirstVisit ? <Redirect to={redirectToOnFirstVisit} /> : (
      <BlockchainInfoContext.Consumer>
        {({ fetchMyBit }) => <HelpPage fetchMyBit={fetchMyBit} />}
      </BlockchainInfoContext.Consumer>
    )),
  },
  {
    path: '/onboarding',
    exact: true,
    component: () => (<OnboardingPage />),
  },
  {
    path: '/list-asset',
    exact: true,
    component: ({ isFirstVisit, isFirstListAssetVisit }) => {
      if(isFirstVisit) {
        return (
          <Redirect to={redirectToOnFirstVisit} />
        )
      } else {
        if(isFirstListAssetVisit) {
          return (
            <Redirect to={redirectOnFirstListAssetVisit} />
          )
        } else {
          return (
            <ListAssetPage />
          )
        }
      }
    }
  },
  {
    path: '/asset-manager',
    exact: true,
    component: () => (<AssetManagerPage />),
  },
  {
    path: '*',
    exact: false,
    component: ({ isFirstVisit }) =>
      (isFirstVisit ? <Redirect to={redirectToOnFirstVisit} /> : <NotFoundPage />),
  },
];

export default routes;
