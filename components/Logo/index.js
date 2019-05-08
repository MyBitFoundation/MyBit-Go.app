import React from 'react';
import PropTypes from 'prop-types';
import LogoSvg from 'static/mybit-logo_v2.svg';
import LogoSvgMobile from 'static/mybit-logo-mobile.svg';
import LogoWrapper from './logoWrapper';

const Logo = () => (
  <LogoWrapper>
    <LogoSvg/>
    <LogoSvgMobile />
  </LogoWrapper>
);

export default Logo;
