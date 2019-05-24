import React from 'react';
import ExploreIcon from '../static/search.svg';
import PortfolioIcon from '../static/chart-area.svg';
import TransactionsIcon from '../static/history.svg';
import ListAssetIcon from '../static/plus.svg';
import KnowledgeBaseIcon from '../static/question.svg';
import WatchIcon from '../static/watchList.svg';

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
    name: 'Knowledge Base',
    icon: KnowledgeBaseIcon,
    selected: currentPath === '/help',
    url: '/help',
  }, {
    name: 'MyHedge',
    url: 'https://cloudflare-ipfs.com/ipfs/QmZ6kwTnc3G6mx5Jxuu8fRZZvrzwhq3yPXndnmwxqkQyrj/?ethereum_node_http=https%3a%2f%2feth-mainnet.alchemyapi.io%2fjsonrpc%2f7sE1TzCIRIQA3NJPD5wg7YRiVjhxuWAE&augur_node=wss%3a%2f%2faugur-node.augur.casino#!/markets?category=MYBIT',
    external: true,
    newTab: true,
  }
];
