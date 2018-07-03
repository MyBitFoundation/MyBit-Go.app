import React from 'react';
import PropTypes from 'prop-types';
import '../styles/NavigationBar.css';
import NavigationOption from './NavigationOption';
import { debug } from '../constants';

const exploreIcon = require('../images/search.png');
const portfolioIcon = require('../images/chart-area.png');
const transactionsIcon = require('../images/history.png');
const savedIcon = require('../images/star.png');
const listAssetIcon = require('../images/plus.png');
const stakingIcon = require('../images/cubes.png');
const exchangeIcon = require('../images/exchange-alt.png');
const knowledgeBaseIcon = require('../images/question.png');

const NavigationBar = ({ clickHandler, currentPath }) => {
  const menuOptions = [{
    name: 'Explore', icon: exploreIcon, selectable: true, selected: currentPath.indexOf('/explore') !== -1, url: '/',
  },
  {
    name: 'Portfolio', icon: portfolioIcon, selectable: true, selected: currentPath === '/portfolio', url: '/portfolio',
  },
  {
    name: 'Transactions', icon: transactionsIcon, selectable: true, selected: currentPath === '/transaction-history', url: '/transaction-history',
  },
  { name: 'Saved', icon: savedIcon },
  { name: 'List Asset', icon: listAssetIcon },
  { name: 'Staking', icon: stakingIcon },
  { name: 'Exchange', icon: exchangeIcon },
  { name: 'Knowledge Base', icon: knowledgeBaseIcon },
  ];

  const navBarOptions = menuOptions.map(menuItem => (
    <NavigationOption
      url={menuItem.url}
      key={menuItem.name}
      name={menuItem.name}
      icon={menuItem.icon}
      selectable={menuItem.selectable}
      selected={menuItem.selected}
      clickHandler={!clickHandler ? debug(menuItem.name) : clickHandler}
    />
  ));

  return (
    <div className="AppNavigationBar grid-noGutter-center">{navBarOptions}</div>
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
