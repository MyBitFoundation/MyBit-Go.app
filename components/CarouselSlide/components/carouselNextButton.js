import styled, { css } from 'styled-components';
import {
  Button,
} from 'antd';

const CarouselNextButtonWrapper = styled(Button)`
  width: 328px;
  margin: 0 auto;
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`
export const CarouselNextButton = props => (
  <CarouselNextButtonWrapper
    type="primary"
    size="large"
    {...props}
  >
    {props.children ? props.children : 'Next'}
  </CarouselNextButtonWrapper>
)
