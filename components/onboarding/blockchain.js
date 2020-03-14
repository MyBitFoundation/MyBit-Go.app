import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Blockchain = () => (
  <CarouselSlide>
    <CarouselSlideMainTitle>
      What is{" "}
      <CarouselSlideColoredSpan
        isBlue
      >
        blockchain?
      </CarouselSlideColoredSpan>
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph>
      It is the “value” layer that the internet is missing. The internet
      lets users transfer data and communicate with each other. The
      blockchain enables users to store and transfer value.
    </CarouselSlideParagraph>
   <CarouselSlideParagraph>
      It acts like a giant spreadsheet which keeps track of every
      account balance and transaction for currencies, investments,
      assets, and other forms of value.
    </CarouselSlideParagraph>
     <CarouselSlideParagraph>
      It is maintained by thousands of people across the globe who are
      incentivised to validate transactions and ensure that balances are
      accurate.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      It is highly secure. Bitcoin has been around for over 10 years and
      its network has not suffered one hack or malfunction.
    </CarouselSlideParagraph>
  </CarouselSlide>
);

export default Blockchain;
