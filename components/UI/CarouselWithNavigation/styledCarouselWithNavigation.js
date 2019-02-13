import styled from 'styled-components';

const StyledCarouselWithNavigation = styled.div`
  position: relative;

  @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
    max-width: ${props => props.maxWidthDesktop};
  }
  margin: 0 auto;
`

export default StyledCarouselWithNavigation;
