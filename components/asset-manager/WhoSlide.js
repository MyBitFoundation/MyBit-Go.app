import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const WhoSlide = ({
  next,
  previous,
}) => (
  <CarouselSlide>
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
    >
    <CarouselSlideColoredSpan
      isBlue
    >
      Who
    </CarouselSlideColoredSpan>  is qualified to be an Asset Manager?
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      hasMarginTop
    >
      Anyone who passes identity verification is eligible to be an Asset Manager.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      Once approved, you have the right to be an Asset Manager for life.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      However, this does not guarantee an income for life.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      After being appointed, everything is based on trust.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      That is, the more assets you manage successfully, the better your trust rating.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      If you act badly, you will still be an Asset Manager, but investors may not fund
      your assets. In rare situations, you may be banned from the platform.
    </CarouselSlideParagraph>
  </CarouselSlide>
)

export default WhoSlide;
