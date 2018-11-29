import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import 'antd/lib/menu/style/index.css';
import '../styles/NavigationBar.css';

const exploreIcon = require('../images/search.svg');
const portfolioIcon = require('../images/chart-area.svg');
const transactionsIcon = require('../images/history.svg');
const listAssetIcon = require('../images/plus.svg');
const knowledgeBaseIcon = require('../images/question.svg');
const watchIcon = require('../images/watchList.svg');

const NavigationBar = ({ currentPath, setAssetsStatusState }) => {
  const menuOptions = [
    {
      name: 'Explore',
      icon: exploreIcon,
      selected: currentPath.indexOf('/explore') !== -1,
      url: '/',
    }, {
      name: 'Portfolio',
      icon: portfolioIcon,
      selected: currentPath === '/portfolio',
      url: '/portfolio',
    }, {
      name: 'Transactions',
      icon: transactionsIcon,
      selected: currentPath === '/transaction-history',
      url: '/transaction-history',
    }, {
      name: 'Watch List',
      icon: watchIcon,
      selected: currentPath === '/watchlist',
      url: '/watchlist',
    }, {
      name: 'List Asset',
      icon: listAssetIcon,
      disabled: true,
    }, {
      name: 'Knowledge Base',
      icon: knowledgeBaseIcon,
      selected: currentPath === '/help',
      url: '/help',
    },
  ];

  const navBarOptions = menuOptions.map(menuItem => (
    <Menu.Item key={menuItem.name} disabled={menuItem.disabled} className={menuItem.selected && 'ant-menu-item-selected'}>
      <Link
        onClick={() => {
          setAssetsStatusState({
            alertType: undefined,
          });
        }}
        to={menuItem.url || '/'}
        href={menuItem.url || '/'}
      >
        <Icon component={menuItem.icon} />
        {menuItem.name}
      </Link>
    </Menu.Item>
  ));

  return (
    <Menu
      mode="horizontal"
      className="AppNavigationBar"
      key={currentPath}
    >
      {navBarOptions}
    </Menu>
  );
};

NavigationBar.propTypes = {
  setAssetsStatusState: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
};


export default NavigationBar;
