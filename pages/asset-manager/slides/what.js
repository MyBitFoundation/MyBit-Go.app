import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideList,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const What = ({
  next,
}) => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      <StyledCarouselSlideColoredSpan
        isBlue
      >
        What{' '}
      </StyledCarouselSlideColoredSpan>
      is an Asset Manager?
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isIntro
      isFullWidth
    >
      Asset Managers are critical to the MyBit Go platform.
      They supervise the assets and are responsible for:
    </StyledCarouselSlideParagraph>

    <StyledCarouselSlideList>
      <li>
        Coordinating any local approval required and/or navigating regulations
        (e.g. getting approval from a store owner to place a Crypto ATM in their store).
      </li>
      <li>
        Listing assets: only Asset Managers have the power to initiate new funding campaigns for assets.
      </li>
      <li>
        Oversight and maintenance: the Asset Manager is in charge of overseeing the asset
        and ensuring it functions properly. This may include security, repairs, marketing,
        or replenishing funds in the case of a Crypto ATM.
      </li>
    </StyledCarouselSlideList>
  </StyledCarouselSlide>
)

export default What;
