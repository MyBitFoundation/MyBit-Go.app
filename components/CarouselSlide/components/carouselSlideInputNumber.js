import styled, { css } from 'styled-components';
import {
  InputNumber,
} from 'antd';

export const CarouselSlideInputNumber = styled(InputNumber)`
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
