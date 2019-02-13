import styled from 'styled-components';
import Globe from 'static/onboarding/globe.png';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideList,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const StyledImage = styled.img`
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
  <StyledCarouselSlide>
    <StyledImage
      src={Globe}
      width="164"
      alt="MyBit Onboarding Slide 2"
      isGlobe
    />
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      The{" "}
      <StyledCarouselSlideColoredSpan
        isBlue
      >
        next generation
      </StyledCarouselSlideColoredSpan>{" "}
      <br />
      investment portal
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isTitle
      isBig
    >
      What can you use MyBit Go for?
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideList>
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
    </StyledCarouselSlideList>
  </StyledCarouselSlide>
)

export default NextGeneration;
