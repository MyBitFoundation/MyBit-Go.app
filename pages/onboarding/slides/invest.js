import RightArrow from '../../../static/onboarding/arrow-right.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';

const Invest = ({
  next,
  previous,
}) => (
  <React.Fragment>
    <StyledMainTitle>
      How do I invest?
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isNoImagesFull
    >
      Find an investment you are interested in and choose the amount you
      would like to invest. This will trigger a pop-up in metamask to
      confirm the transaction.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImagesFull
    >
      It may take several minutes for the Ethereum network to process
      the transaction. Once confirmed, you are now the owner of the
      asset.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImagesFull
    >
      When it begins generating revenue, you will receive the profits to
      your account in real-time!
    </StyledOnboardingParagraph>
    <StyledOnboardingButton
      type="primary"
      onClick={next}
      isNext
    >
      How to secure my assets?{" "}
      <StyledOnboardingArrow
        src={RightArrow}
        alt="Next Button Arrow"
      />
    </StyledOnboardingButton>
    <StyledOnboardingButton
      onClick={previous}
      isBack
    >
      Back
    </StyledOnboardingButton>
  </React.Fragment>
);

export default Invest;
