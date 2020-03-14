import React from 'react';
import ExploreIcon from 'public/search.svg';
import PortfolioIcon from 'public/chart-area.svg';
import TransactionsIcon from 'public/history.svg';
import ListAssetIcon from 'public/plus.svg';
import KnowledgeBaseIcon from 'public/question.svg';
import WatchIcon from 'public/watchList.svg';
import AssetManagers from 'public/asset-managers.svg';
import MyHedge from 'public/my-hedge.svg';

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
  }, {
    name: 'MyHedge',
    url: 'https://cloudflare-ipfs.com/ipfs/QmZ6kwTnc3G6mx5Jxuu8fRZZvrzwhq3yPXndnmwxqkQyrj/?ethereum_node_http=https%3a%2f%2feth-mainnet.alchemyapi.io%2fjsonrpc%2f7sE1TzCIRIQA3NJPD5wg7YRiVjhxuWAE&augur_node=wss%3a%2f%2faugur-node.augur.casino#!/markets?category=MYBIT',
    external: true,
    newTab: true,
    icon: MyHedge,
  }
];
