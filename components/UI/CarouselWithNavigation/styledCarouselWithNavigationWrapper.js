import styled, { css } from 'styled-components';
import Carousel from 'antd/lib/carousel';

const StyledCarouselWithNavigationWrapper = styled(Carousel)`
  padding: 0px;
  margin: 0px;
  box-shadow: none;

  .slick-track{
    display: flex;
    flex-direction: row;
    width: auto;
    height: calc(100vh - 113px);
  }

  .slick-slide {
    padding: 0px;
    width: 100vw;
    min-width: 100vw;
  }

  .slick-list{
    transform: none;
    touch-action: none;
  }

  @media(min-width: ${props => props.desktopAt || `${props.theme.sizes.tablet}px`}) {
    margin: 0px auto;
    margin-top: 20px;
    box-shadow: 1px 5px 15px 2px rgba(0,0,0,0.1);
    border-radius: 4px;
    min-height: 600px;

    .slick-slide {
      padding: 0px 20px;
      min-width: inherit;
    }

    .slick-track{
      display: inherit;
      flex-direction: inherit;
      height: inherit;
    }
  }
`

export default StyledCarouselWithNavigationWrapper;
