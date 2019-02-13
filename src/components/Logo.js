import React from 'react';
import PropTypes from 'prop-types';
import LogoSvg from 'static/my-bit-go.svg';

const Logo = ({ className }) => (
  <div className="AppHeader__Logo-contaner">
    <LogoSvg className={className} />
  </div>
);

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Logo;
