import styled from 'styled-components';
import EthereumGraphic from 'static/onboarding/ethereum.png';

import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideList,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const StyledImage = styled.img`
  margin: 0px auto;
  position: relative;
  margin-top: 30px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
`

const Ethereum = () => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle>
      Ethereum
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph>
      Ethereum is a platform based on blockchain technology. Unlike
      Bitcoin, users can builld applications on top of it.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      For comparison, you can think of it like this: if Bitcoin is a
      next generation bank, then Ethereum is the software that lets
      anyone build a next generation bank.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      The possibilities of what can be built on Ethereum extend to
      nearly every business industry.
    </StyledCarouselSlideParagraph>
    <StyledImage
      src={EthereumGraphic}
      width="230"
      alt="MyBit Globe"
    />
  </StyledCarouselSlide>
);

export default Ethereum;
