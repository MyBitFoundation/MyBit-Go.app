import styled from 'styled-components';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Image = styled.img`
  position: absolute;
  top: 52px;
  right: 80px;
  width: 110px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const NextGeneration = () => (
  <CarouselSlide>
    <Image
      src="/onboarding/globe.png"
      width="164"
      alt="MyBit Onboarding Slide 2"
      isGlobe
    />
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      The{" "}
      <CarouselSlideColoredSpan
        isBlue
      >
        next generation
      </CarouselSlideColoredSpan>{" "}
      <br />
      investment portal
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      isTitle
      isBig
    >
      What can you use MyBit Go for?
    </CarouselSlideParagraph>
    <CarouselSlideList>
      <li>
        Invest in a variety of assets without a broker or intermediary
      </li>
      <li>
        Invest without a bank account
      </li>
      <li>
        Be in full control of your capital and investments
      </li>
      <li>
        Invest without location restrictions, anyone can access
        investment opportunities
      </li>
      <li>
        Receive payouts in real-time. No more waiting for quarterly or
        annual distributions
      </li>
      <li>
        Be protected from failure. If MyBit Go ceases to exist, your
        investments will still be safe
      </li>
    </CarouselSlideList>
  </CarouselSlide>
)

export default NextGeneration;
