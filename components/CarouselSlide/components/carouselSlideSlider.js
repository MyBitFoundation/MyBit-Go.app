import styled, { css } from 'styled-components';
import {
  Slider,
} from 'antd';

export const CarouselSlideSlider = styled(Slider)`
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
