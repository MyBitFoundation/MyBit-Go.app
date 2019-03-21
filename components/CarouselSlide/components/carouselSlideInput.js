import styled, { css } from 'styled-components';
import {
  Input,
} from 'antd';

export const CarouselSlideInput = styled(Input)`
  width: 100%;

  ${({theme}) => theme.tablet`
    width: 80%;
  `}

  ${props => props.isCentered && `
    margin: 0 auto;
    display: block;
  `}

  margin-bottom: 20px;
`
