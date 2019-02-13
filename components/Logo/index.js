import React from 'react';
import PropTypes from 'prop-types';
import LogoSvg from 'static/mybit-logo.svg';
import LogoSvgMobile from 'static/mybit-logo-mobile.svg';
import StyledLogo from './styledLogo';

const Logo = () => (
  <StyledLogo>
    <LogoSvg/>
    <LogoSvgMobile />
  </StyledLogo>
);

export default Logo;
