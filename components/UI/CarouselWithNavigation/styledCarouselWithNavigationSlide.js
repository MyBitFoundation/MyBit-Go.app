import styled from 'styled-components';

const StyledCarouselWithNavigationSlide = styled.div`
  position: relative;
  display: inline-block;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;

  height: calc(100vh - 113px);
  overflow: auto;


  @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
    max-width: ${props => props.maxWidthDesktop || auto};
    min-height: 600px;
    padding: 0px;
    height: auto;
  }
`

export default StyledCarouselWithNavigationSlide;
