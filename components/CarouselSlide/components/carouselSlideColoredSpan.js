import styled, { css } from 'styled-components';

export const CarouselSlideColoredSpan = styled.span`
  ${props => props.isBlue && css`
    color: rgb(24, 144, 255);
  `}

  ${props => props.isRed && css`
    color: red;
  `}
}`
