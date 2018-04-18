import React from 'react';
import '../styles/NavigationBar.css';
import { NavigationOption } from './NavigationOption';
import { debug } from '../constants';

export const NavigationBar = ({ clickHandler }) => {
  const menuOptions = [
    {
      name: 'Explore',
      icon: require('../images/search.png'),
      selectable: true,
      selected: true
    },
    {
      name: 'Portfolio',
      icon: require('../images/chart-area.png'),
      selectable: true
    },
    {
      name: 'Transactions',
      icon: require('../images/history.png'),
      selectable: true
    },
    { name: 'Saved', icon: require('../images/star.png') },
    { name: 'List Asset', icon: require('../images/plus.png') },
    { name: 'Staking', icon: require('../images/cubes.png') },
    { name: 'Exchange', icon: require('../images/exchange-alt.png') },
    { name: 'Knowledge Base', icon: require('../images/question.png') }
  ];

  const navBarOptions = menuOptions.map(menuItem => (
    <NavigationOption
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
