import styled from 'styled-components';

const CarouselWithNavigationNav = styled.div`
  display: none;

  @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
    display: block;
    text-align: center;
    margin-top: 30px;
    width: 100%;
  }
}`

export default CarouselWithNavigationNav;
