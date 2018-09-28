/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
// TODO: Fix the JSX linting errors
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/css';

const classNames = require('classnames');

const NavigationOption = ({ name, icon, selectable, selected, url }) => {
  const optionClass = classNames({
    AppNavigationBar__option: true,
    'AppNavigationBar__option--is-selected': selected,
    'AppNavigationBar__option--is-selectable': selectable
  });

  return (
    // <Link
    //   className="col AppNavigationBar__option-col"
    //   to={url || '/'}
    //   href={url || '/'}
    // >
    <Menu.Item key={name}>
      <Icon type={icon} />
      {name}
    </Menu.Item>
    // </Link>
  );
};

NavigationOption.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  url: PropTypes.string
};

NavigationOption.defaultProps = {
  selected: false,
  selectable: false,
  url: ''
};

export default NavigationOption;
