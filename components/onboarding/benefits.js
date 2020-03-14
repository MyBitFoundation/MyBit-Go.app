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
  margin-top: 20px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const Benefits = () => (
  <CarouselSlide>
    <CarouselSlideMainTitle>
      What are the{" "}
      <CarouselSlideColoredSpan
        isBlue
      >
        benefits?
      </CarouselSlideColoredSpan>
    </CarouselSlideMainTitle>
    <CarouselSlideList
      isSmall
    >
      <li>
        Faster, cheaper, safer, and more accessible
      </li>
      <li>
        No single point of failure risk
      </li>
      <li>
        No counterparty risk and no relying on third parties to complete
        transactions
      </li>
      <li>
        Fast and cheap transactions to anyone, anywhere
      </li>
      <li>
        Give ownership back to the people, putting them back in control
        of capital, investments, and value
      </li>
    </CarouselSlideList>
    <Image
      src="/onboarding/safe-graphic.png"
      width="113"
      alt="MyBit Safe"
      isStatic
    />
  </CarouselSlide>
);

export default Benefits;
