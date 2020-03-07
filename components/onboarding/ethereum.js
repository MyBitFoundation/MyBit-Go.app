import styled from 'styled-components';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Image = styled.img`
  margin: 0px auto;
  position: relative;
  margin-top: 30px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
`

const Ethereum = () => (
  <CarouselSlide>
    <CarouselSlideMainTitle>
      Ethereum
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph>
      Ethereum is a platform based on blockchain technology. Unlike
      Bitcoin, users can builld applications on top of it.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      For comparison, you can think of it like this: if Bitcoin is a
      next generation bank, then Ethereum is the software that lets
      anyone build a next generation bank.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      The possibilities of what can be built on Ethereum extend to
      nearly every business industry.
    </CarouselSlideParagraph>
    <Image
      src="/onboarding/ethereum.png"
      width="230"
      alt="MyBit Globe"
    />
  </CarouselSlide>
);

export default Ethereum;
