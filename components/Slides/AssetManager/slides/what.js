import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const What = ({
  next,
}) => (
  <CarouselSlide>
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      <CarouselSlideColoredSpan
        isBlue
      >
        What{' '}
      </CarouselSlideColoredSpan>
      is an Asset Manager?
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      isIntro
      isFullWidth
    >
      Asset Managers are critical to the MyBit platform.
      They supervise the assets and are responsible for:
    </CarouselSlideParagraph>

    <CarouselSlideList>
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
    </CarouselSlideList>
  </CarouselSlide>
)

export default What;
