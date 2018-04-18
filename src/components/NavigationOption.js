import React from 'react';
import { noop } from '../constants';
var classNames = require('classnames');

export const NavigationOption = ({
  name,
  icon,
  clickHandler,
  selectable,
  selected
}) => {
  var optionClass = classNames({
    AppNavigationBar__option: true,
    'AppNavigationBar__option--is-selected': selected,
    'AppNavigationBar__option--is-selectable': selectable
  });

  return (
    <div
      className={'col AppNavigationBar__option-col'}
      onClick={selectable ? () => clickHandler(name) : noop}
    >
      <div className={optionClass}>
        <img alt={name} className="AppNavigationBar__option-img" src={icon} />
        <p className="AppNavigationBar__option-text">{name}</p>
      </div>
    </div>
  );
};
