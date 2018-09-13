import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import '../styles/NavigationBar.css';
import NavigationOption from './NavigationOption';
import { debug } from '../constants';

import 'antd/lib/menu/style';

import Button from 'antd/lib/button';
import 'antd/lib/button/style';

const exploreIcon = require('../images/search.png');
const portfolioIcon = require('../images/chart-area.png');
const transactionsIcon = require('../images/history.png');
const savedIcon = require('../images/star.png');
const listAssetIcon = require('../images/plus.png');
const stakingIcon = require('../images/cubes.png');
const exchangeIcon = require('../images/exchange-alt.png');
const knowledgeBaseIcon = require('../images/question.png');

const NavigationBar = ({ clickHandler, currentPath }) => {
  const menuOptions = [
    {
      name: 'Explore',
      icon: 'search',
      selectable: true,
      selected: currentPath.indexOf('/explore') !== -1,
      url: '/',
    },
    {
      name: 'Portfolio',
      icon: 'area-chart',
      selectable: true,
      selected: currentPath === '/portfolio',
      url: '/portfolio',
    },
    {
      name: 'Transactions',
      icon: 'eye',
      selectable: true,
      selected: currentPath === '/transaction-history',
      url: '/transaction-history',
    },
    { name: 'Saved', icon: 'save' },
    { name: 'List Asset', icon: 'plus' },
    { name: 'Staking', icon: 'robot' },
    { name: 'Exchange', icon: 'interation' },
    {
      name: 'Knowledge Base',
      icon: 'question',
      selectable: true,
      selected: currentPath === '/help',
      url: '/help',
    },
  ];

  const navBarOptions = menuOptions.map(menuItem => (
      <Menu.Item key={menuItem.key}>
        <Link to={menuItem.url || '/'} href={menuItem.url || '/'}>
          <Icon type={menuItem.icon}/>{menuItem.name}
        </Link>
      </Menu.Item>
  ));

  return (
    <div>
    <Menu
      mode="horizontal"
    > 
    {navBarOptions}
    </Menu>
    </div>
  );
};

NavigationBar.propTypes = {
  clickHandler: PropTypes.func,
  currentPath: PropTypes.string.isRequired,
};

NavigationBar.defaultProps = {
  clickHandler: debug,
};

export default NavigationBar;
