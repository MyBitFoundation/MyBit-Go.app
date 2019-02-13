import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Who = ({
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
      Who
    </StyledCarouselSlideColoredSpan>  is qualified to be an Asset Manager?
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      hasMarginTop
    >
      Anyone who passes identity verification is eligible to be an Asset Manager.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      Once approved, you have the right to be an Asset Manager for life.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      However, this does not guarantee an income for life.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      After being appointed, everything is based on trust.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      That is, the more assets you manage successfully, the better your trust rating.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      If you act badly, you will still be an Asset Manager, but investors may not fund
      your assets. In rare situations, you may be banned from the platform.
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
)

export default Who;
