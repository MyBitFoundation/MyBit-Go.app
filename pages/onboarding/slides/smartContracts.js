import styled from 'styled-components';
import SmartContract from 'static/onboarding/smart_contract.png';

import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
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
}`

const SmartContracts = () => (
  <StyledCarouselSlide>
   <StyledCarouselSlideMainTitle>
    <StyledCarouselSlideColoredSpan
      isBlue
    >
      Smart
    </StyledCarouselSlideColoredSpan>{" "}
      contracts
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isNoImagesFull
    >
      'Smart contracts' is a phrase used to describe computer code that
      automatically executes when specific conditions are met. This is
      extremely useful for the exchange of money, content, property, or
      anything of value.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph
      isNoImagesFull
    >
      With smart contracts, the investor can be assured the contractual
      agreement will execute according to the defined conditions. This
      creates a more secure environment and also leads to lower fees
      because no manual process involving human labour is needed.
    </StyledCarouselSlideParagraph>
    <StyledImage
      src={SmartContract}
      width="199"
      alt="Smart Contract"
      isStatic
    />
  </StyledCarouselSlide>
);

export default SmartContracts;
