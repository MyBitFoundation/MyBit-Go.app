import React from 'react';
import ExploreIcon from '../static/search.svg';
import PortfolioIcon from '../static/chart-area.svg';
import TransactionsIcon from '../static/history.svg';
import ListAssetIcon from '../static/plus.svg';
import KnowledgeBaseIcon from '../static/question.svg';
import WatchIcon from '../static/watchList.svg';
import AssetManagers from '../static/asset-managers.svg';

export const navbarOptions = (currentPath) => [
  {
    name: 'Explore',
    icon: ExploreIcon,
    selected: currentPath === '/' || currentPath.indexOf('/explore') !== -1,
    url: '/explore',
  }, {
    name: 'Portfolio',
    icon: PortfolioIcon,
    selected: currentPath === '/portfolio',
    url: '/portfolio',
  }, {
    name: 'Transactions',
    icon: TransactionsIcon,
    selected: currentPath === '/transaction-history',
    url: '/transaction-history',
  }, {
    name: 'Watch List',
    icon: WatchIcon,
    selected: currentPath === '/watch-list',
    url: '/watch-list',
  }, {
    name: 'List Asset',
    icon: ListAssetIcon,
    selected: currentPath === '/list-asset',
    url: '/list-asset',
  }, {
    name: 'Asset Managers',
    icon: AssetManagers,
    selected: currentPath === '/asset-managers',
    url: '/asset-managers',
  }, {
    name: 'Knowledge Base',
    icon: KnowledgeBaseIcon,
    selected: currentPath === '/help',
    url: '/help',
  },
];
