import styled, { css } from 'styled-components';
import Carousel from 'antd/lib/carousel';
import 'antd/lib/carousel/style/index.css';

const StyledCarouselWithNavigationWrapper = styled(Carousel)`
  min-height: 600px;
  width: 100%;
  max-width: ${props => props.minWidthStyle || 'auto'};
  margin: 0px auto;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 1px 5px 15px 2px rgba(0,0,0,0.1);
  border-radius: 4px;

  .slick-slide {
    padding: 0px 20px;
  }

  @media(max-width: 600px){
    max-height: calc(100vh - 180px);
    min-height: calc(100vh - 180px);
    overflow: scroll;
  }
}`

export default StyledCarouselWithNavigationWrapper;
