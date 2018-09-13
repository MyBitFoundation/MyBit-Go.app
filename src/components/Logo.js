import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/my-bit-go.svg';

const Logo = ({ className }) => (
  <img alt="MyBit Logo" className={className} src={logo} />
);

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Logo;
