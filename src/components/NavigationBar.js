import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

const NavigationBar = ({ clickHandler }) => {
  const menuOptions = [{
    name: 'Explore', icon: exploreIcon, selectable: true, selected: true, url: '/',
  },
  {
    name: 'Portfolio', icon: portfolioIcon, selectable: true, url: '/portfolio',
  },
  {
    name: 'Transactions', icon: transactionsIcon, selectable: true, url: '/transaction-history',
  },
  { name: 'Saved', icon: savedIcon },
  { name: 'List Asset', icon: listAssetIcon },
  { name: 'Staking', icon: stakingIcon },
  { name: 'Exchange', icon: exchangeIcon },
  { name: 'Knowledge Base', icon: knowledgeBaseIcon },
  ];

  const navBarOptions = menuOptions.map(menuItem => (
    <Link to={menuItem.url || '/'} href={menuItem.url || '/'}>
      <NavigationOption
        key={menuItem.name}
        name={menuItem.name}
        icon={menuItem.icon}
        selectable={menuItem.selectable}
        selected={menuItem.selected}
        clickHandler={!clickHandler ? debug(menuItem.name) : clickHandler}
      />
    </Link>
  ));

  return (
    <div className="AppNavigationBar grid-noGutter-center">{navBarOptions}</div>
  );
};

NavigationBar.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};


export default NavigationBar;
