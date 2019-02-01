/* eslint-disable  react/prop-types */

import React from 'react';
import { Redirect } from 'react-router-dom';
import AssetDetailsPage from './components/pages/AssetDetailsPage';
import Explore from './screens/Explore';
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
    component: ({ isFirstVisit }) =>
      isFirstVisit ? <Redirect to={redirectToOnFirstVisit} />
      : <Explore />
    ,
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
        {({ loading, prices, assets, withdrawInvestorProfit, withdrawingAssetIds, user }) =>
          (isFirstVisit ? (
            <Redirect to={redirectToOnFirstVisit} />
          ) : (
            <PortfolioPage
              loading={loading}
              prices={prices}
              assets={assets}
              withdrawingAssetIds={withdrawingAssetIds}
              withdrawInvestorProfit={withdrawInvestorProfit}
              user={user}
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
    path: '/manage/:assetId',
    exact: true,
    component: ({ match, isFirstVisit }) => (
      <BlockchainInfoContext.Consumer>
        {props =>
          <PortfolioManagedAssetPage
            loading={props.loading}
            assets={props.assets}
            user={props.user}
            match={match}
            prices={props.prices}
            withdrawCollateral={props.withdrawCollateral}
            withdrawingCollateral={props.withdrawingCollateral}
            withdrawProfitAssetManager={props.withdrawProfitAssetManager}
            withdrawingAssetManager={props.withdrawingAssetManager}
          />
        }
      </BlockchainInfoContext.Consumer>
    )
  },
  {
    path: '/help',
    exact: true,
    component: ({ isFirstVisit }) =>
    isFirstVisit ? <Redirect to={redirectToOnFirstVisit} />
      : <HelpPage />,
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
