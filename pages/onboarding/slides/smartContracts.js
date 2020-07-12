import styled from 'styled-components';
import SmartContract from 'static/onboarding/smart_contract.png';

import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
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
}`

const SmartContracts = () => (
  <CarouselSlide>
   <CarouselSlideMainTitle>
    <CarouselSlideColoredSpan
      isBlue
    >
      Smart
    </CarouselSlideColoredSpan>{" "}
      contracts
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      isNoImagesFull
    >
      'Smart contracts' is a phrase used to describe computer code that
      automatically executes when specific conditions are met. This is
      extremely useful for the exchange of money, content, property, or
      anything of value.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph
      isNoImagesFull
    >
      With smart contracts, the investor can be assured the contractual
      agreement will execute according to the defined conditions. This
      creates a more secure environment and also leads to lower fees
      because no manual process involving human labour is needed.
    </CarouselSlideParagraph>
    <Image
      src={SmartContract}
      width="199"
      alt="Smart Contract"
      isStatic
    />
  </CarouselSlide>
);

export default SmartContracts;
