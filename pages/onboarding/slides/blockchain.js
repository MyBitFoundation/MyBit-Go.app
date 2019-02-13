import styled from 'styled-components';

import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Blockchain = () => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle>
      What is{" "}
      <StyledCarouselSlideColoredSpan
        isBlue
      >
        blockchain?
      </StyledCarouselSlideColoredSpan>
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph>
      It is the “value” layer that the internet is missing. The internet
      lets users transfer data and communicate with each other. The
      blockchain enables users to store and transfer value.
    </StyledCarouselSlideParagraph>
   <StyledCarouselSlideParagraph>
      It acts like a giant spreadsheet which keeps track of every
      account balance and transaction for currencies, investments,
      assets, and other forms of value.
    </StyledCarouselSlideParagraph>
     <StyledCarouselSlideParagraph>
      It is maintained by thousands of people across the globe who are
      incentivised to validate transactions and ensure that balances are
      accurate.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      It is highly secure. Bitcoin has been around for over 10 years and
      its network has not suffered one hack or malfunction.
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
);

export default Blockchain;
