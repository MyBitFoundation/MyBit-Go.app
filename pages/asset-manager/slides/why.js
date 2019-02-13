import styled from 'styled-components';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideList,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';
import Tools from 'static/asset-manager/tools.png';

const StyledImage = styled.img`
  margin: 0px auto;
  position: relative;
  margin-top: 30px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
`;

const Why = ({
  next,
  previous,
}) => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      <StyledCarouselSlideColoredSpan
        isBlue
      >
        Why
      </StyledCarouselSlideColoredSpan> is an Asset Manager needed?
    </StyledCarouselSlideMainTitle>
    <StyledImage
      src={Tools}
      width="190"
      alt="Tools"
    />
    <StyledCarouselSlideParagraph
      hasMarginTop
    >
        In a perfect, futuristic world the MyBit Go ecosystem could be fully automated.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
        So, when an asset has an issue, it could request another
        machine to come and fix it, replenish its funds or inventory, etc.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
        Since we are not yet at that stage, human oversight is required for most assets to function properly.
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
)

export default Why;
