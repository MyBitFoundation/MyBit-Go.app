import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
} from 'components/CarouselSlide/';

const InvestSlide = () => (
  <CarouselSlide>
    <CarouselSlideMainTitle>
      How do I invest?
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph>
      Find an investment you are interested in and choose the amount you
      would like to invest. This will trigger a pop-up in metamask to
      confirm the transaction.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      It may take several minutes for the Ethereum network to process
      the transaction. Once confirmed, you are now the owner of the
      asset.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      When it begins generating revenue, you will receive the profits to
      your account in real-time!
    </CarouselSlideParagraph>
  </CarouselSlide>
);

export default InvestSlide;
