import React from 'react';
import PropTypes from 'prop-types';
import LogoSvg from 'public/mybit-logo_v3.svg';
import LogoSvgMobile from 'public/mybit-logo-mobile.svg';
import LogoWrapper from './logoWrapper';

const Logo = () => (
  <LogoWrapper>
    <LogoSvg />
    <LogoSvgMobile />
  </LogoWrapper>
);

export default Logo;
