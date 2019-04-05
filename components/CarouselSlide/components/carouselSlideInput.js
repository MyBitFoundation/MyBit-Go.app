import styled, { css } from 'styled-components';
import {
  Input,
} from 'antd';
import {omit} from 'lodash';
export const CarouselSlideInput = styled(props => <Input {...omit(props, CarouselSlideInput.OmitProps)}/>)`
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

CarouselSlideInput.OmitProps = [
  'isCentered',
]
