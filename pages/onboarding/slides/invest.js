import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
} from 'components/CarouselSlide/';

const Invest = () => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle>
      How do I invest?
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph>
      Find an investment you are interested in and choose the amount you
      would like to invest. This will trigger a pop-up in metamask to
      confirm the transaction.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      It may take several minutes for the Ethereum network to process
      the transaction. Once confirmed, you are now the owner of the
      asset.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      When it begins generating revenue, you will receive the profits to
      your account in real-time!
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
);

export default Invest;
