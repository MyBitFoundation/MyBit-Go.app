import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/my-bit-go.svg';

const Logo = ({ className }) => (
  <div className="AppHeader__Logo-contaner">
    <img alt="MyBit Logo" className={className} src={logo} />
  </div>
);

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Logo;
