import React from 'react';
import styled from 'styled-components';
import HamburguerIcon from 'static/hamburguer-icon.svg';

const AppHeaderHamburguerButton = styled(HamburguerIcon)`
  position: absolute;
  right: 0px;
  height: 100%;

  ${({theme}) => theme.tablet`
    display: none;
  `}
}`

export default AppHeaderHamburguerButton;
