import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const HowIncentivised = () => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      How are Asset Managers
      <StyledCarouselSlideColoredSpan
        isBlue
      >
      {' '}incentivised
      </StyledCarouselSlideColoredSpan>
      ?
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      hasMarginTop
    >
      In return for maintaining the asset, Asset Managers receive a portion of the revenue it generates.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      Since profits are based on an asset’s revenue rather than a fixed amount, it incentivises the
      Asset Manager to ensure the asset generates as much revenue as possible.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      To follow free market principles, the percentage of revenue is chosen by the Asset Manager.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      Then, if they request too high a percentage, in theory, investors will not fund the asset.
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
)

export default HowIncentivised;
