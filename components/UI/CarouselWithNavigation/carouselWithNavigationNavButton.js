import styled, { css } from 'styled-components';
import Button from 'antd/lib/button';
import {omit} from 'lodash';

const CarouselWithNavigationNavButton = styled(props => <Button {...omit(props, CarouselWithNavigationNavButton.OmitProps)}/>)`
  width: 12px;
  height: 12px;
  background: black;
  border-radius: 6px;
  padding: 0;
  margin: 0 4px;
  border: none;
  background: #dedede;

  &:hover, &:focus {
    background: #dedede;
  }

  ${props => props.isActive && css`
    background: #1890ff;
    &:hover, &:focus {
        background: #1890ff;
    }
  `}
}`


CarouselWithNavigationNavButton.OmitProps = [
  'isActive',
]

export default CarouselWithNavigationNavButton;
