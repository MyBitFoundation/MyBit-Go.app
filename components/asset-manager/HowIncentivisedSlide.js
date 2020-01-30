import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const HowIncentivisedSlide = () => (
  <CarouselSlide>
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      How are Asset Managers
      <CarouselSlideColoredSpan
        isBlue
      >
      {' '}incentivised
      </CarouselSlideColoredSpan>
      ?
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      hasMarginTop
    >
      In return for maintaining the asset, Asset Managers receive a portion of the revenue it generates.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      Since profits are based on an asset’s revenue rather than a fixed amount, it incentivises the
      Asset Manager to ensure the asset generates as much revenue as possible.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      To follow free market principles, the percentage of revenue is chosen by the Asset Manager.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      Then, if they request too high a percentage, in theory, investors will not fund the asset.
    </CarouselSlideParagraph>
  </CarouselSlide>
)

export default HowIncentivisedSlide;
