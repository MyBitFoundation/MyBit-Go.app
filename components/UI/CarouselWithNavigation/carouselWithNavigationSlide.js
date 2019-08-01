import styled from 'styled-components';

const CarouselWithNavigationSlide = styled.div`
  position: relative;
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;

  // 56px is the height of the fixed nav bar at the bottom
  height: calc(100vh - 56px);
  overflow: auto;

  @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
    max-width: ${props => props.maxWidthDesktop || auto};
    min-height: 600px;
    height: auto;
  }
`

export default CarouselWithNavigationSlide;
