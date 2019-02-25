import React from 'react';
import styled from 'styled-components';
import HamburguerIcon from 'static/hamburguer-icon.svg';

const AppHeaderHamburguerButton = styled(HamburguerIcon)`
  ${({theme}) => theme.tablet`
    display: none;
  `}
}`

export default AppHeaderHamburguerButton;
