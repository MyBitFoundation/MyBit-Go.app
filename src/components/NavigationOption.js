/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
// TODO: Fix the JSX linting errors
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../constants';

const classNames = require('classnames');

const NavigationOption = ({
  name,
  icon,
  clickHandler,
  selectable,
  selected,
}) => {
  const optionClass = classNames({
    AppNavigationBar__option: true,
    'AppNavigationBar__option--is-selected': selected,
    'AppNavigationBar__option--is-selectable': selectable,
  });

  return (
    <div
      className="col AppNavigationBar__option-col"
      onClick={selectable ? () => clickHandler(name) : noop}
    >
      <div className={optionClass}>
        <img alt={name} className="AppNavigationBar__option-img" src={icon} />
        <p className="AppNavigationBar__option-text">{name}</p>
      </div>
    </div>
  );
};

NavigationOption.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  selectable: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

NavigationOption.defaultProps ={
  clickHandler: () => noop,
};

export default NavigationOption;
