import styled from 'styled-components';

const StyledCarouselWithNavigationSlide = styled.div`
  position: relative;
  width: 100%;
  max-width: {props => props.minWidthStyle || auto};
  min-height: 600px;

  @media(max-width: 600px){
    overflow: scroll;
    max-height: calc(100vh - 140px);
    min-height: calc(100vh - 140px);
  }
}`

export default StyledCarouselWithNavigationSlide;
