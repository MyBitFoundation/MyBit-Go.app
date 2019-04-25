import styled, { css } from 'styled-components';

export const CarouselSlide = styled.div`
  padding: 10px;

  @media(min-width: 375px){
    padding: 20px;
  }

  @media(min-width: 450px){
    padding: 30px;
  }

  ${props => props.maxWidthDesktop && css`
    max-width: ${props => props.maxWidthDesktop};
    margin: 0 auto;
  `}

  ${props => props.hasBoxShadow && css`
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  `}
}`
