import styled, { css } from 'styled-components';

const CarouselWithNavigationButtons = styled.div`
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.18);
  margin: 0px;
  position: fixed;
  padding: 8px 15px;
  bottom: 0px;
  width: 100vw;
  left: 0px;
  top: auto;
  background-color: #ffffff;

  ${props => props.hasOneButton && css`
    display: flex;
    justify-content: flex-end;
  `}

  ${props => props.hasTwoButtons && css`
    display: flex;
    justify-content: space-between;
  `}

  @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
    position: relative;
    top: 10px;
    left: 20px;
    margin: 0px 10px;
    width: auto;
    padding: 0px 0px;
  }

}`

export default CarouselWithNavigationButtons;
