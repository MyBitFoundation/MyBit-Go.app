import styled, { css } from 'styled-components';
import {
  Button,
} from 'antd';
import { omit } from 'lodash';

const CarouselNextButtonWrapper = styled(props => <Button {...omit(props, CarouselNextButtonWrapper.OmitProps)}/>)`
  width: 328px;
  margin: 0 auto;
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  ${props => props.desktopMode && css`
    position: absolute !important;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%, 0%);
    bottom: 20px;
  `}
`

CarouselNextButtonWrapper.OmitProps = [
  'desktopMode',
]

export const CarouselNextButton = props => (
  <CarouselNextButtonWrapper
    type="primary"
    size="large"
    {...props}
  >
    {props.children ? props.children : 'Next'}
  </CarouselNextButtonWrapper>
)
