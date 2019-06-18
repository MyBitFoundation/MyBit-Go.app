import styled, { css } from 'styled-components';

export const CarouselSlide = styled.div`
  padding: 10px;

  ${props => props.desktopMode && css`
    padding-top: 10px !important;
    min-height: 560px;
    height: max-content;
    position: relative;
    padding-bottom: 60px !important;
  `}

  ${props => props.maxWidthDesktop && css`
    max-width: ${props => props.maxWidthDesktop};
    margin: 0 auto;
  `}

  ${props => props.hasBoxShadow && css`
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  `}

  @media(min-width: 375px){
    padding: 20px;
  }

  @media(min-width: 450px){
    padding: 30px;
  }
}`
