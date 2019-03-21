import styled, { css } from 'styled-components';
import Button from 'antd/lib/button';

const CarouselWithNavigationNavButton = styled(Button)`
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

export default CarouselWithNavigationNavButton;
