import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/lib/menu/style/index.css';
import '../styles/NavigationBar.css';

const exploreIcon = require('../images/search.svg');
const portfolioIcon = require('../images/chart-area.svg');
const transactionsIcon = require('../images/history.svg');
const listAssetIcon = require('../images/plus.svg');
const exchangeIcon = require('../images/mydax.svg');
const knowledgeBaseIcon = require('../images/question.svg');
const watchIcon = require('../images/watch.svg');

const NavigationBar = ({ currentPath }) => {
  const menuOptions = [
    {
      name: 'Explore',
      icon: exploreIcon,
      selectable: true,
      selected: currentPath.indexOf('/explore') !== -1,
      url: '/',
    }, {
      name: 'Portfolio',
      icon: portfolioIcon,
      selectable: true,
      selected: currentPath === '/portfolio',
      url: '/portfolio',
    }, {
      name: 'Transactions',
      icon: transactionsIcon,
      selectable: true,
      selected: currentPath === '/transaction-history',
      url: '/transaction-history',
    }, {
      name: 'WatchList',
      icon: watchIcon,
    }, {
      name: 'List Asset',
      icon: listAssetIcon,
      disabled: true,
    }, {
      name: 'MYDAX',
      icon: exchangeIcon,
      disabled: true,
    }, {
      name: 'Knowledge Base',
      icon: knowledgeBaseIcon,
      selectable: true,
      selected: currentPath === '/help',
      url: '/help',
    },
  ];

  const navBarOptions = menuOptions.map(menuItem => (
    <Menu.Item key={menuItem.name} disabled={menuItem.disabled} className={menuItem.selected && 'ant-menu-item-selected'}>
      <Link to={menuItem.url || '/'} href={menuItem.url || '/'}>
        <Icon component={menuItem.icon} />
        {menuItem.name}
      </Link>
    </Menu.Item>
  ));

  return (
    <Menu
      mode="horizontal"
      className="AppNavigationBar"
    >
      {navBarOptions}
    </Menu>
  );
};

NavigationBar.propTypes = {
  currentPath: PropTypes.string.isRequired,
};


export default NavigationBar;
