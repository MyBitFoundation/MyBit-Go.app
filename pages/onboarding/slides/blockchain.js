import RightArrow from '../../../static/onboarding/arrow-right.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';
import StyledOnboardingList from '../styles/styledOnboardingList';

const Blockchain = ({
  next,
  previous,
  goToSlide,
}) => (
  <React.Fragment>
    <StyledMainTitle>
      What is{" "}
      <StyledOnboardingColoredSpan
        isBlue
      >
        blockchain?
      </StyledOnboardingColoredSpan>
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isNoImages
    >
      It is the “value” layer that the internet is missing. The internet
      lets users transfer data and communicate with each other. The
      blockchain enables users to store and transfer value.
    </StyledOnboardingParagraph>
   <StyledOnboardingParagraph
      isNoImages
    >
      It acts like a giant spreadsheet which keeps track of every
      account balance and transaction for currencies, investments,
      assets, and other forms of value.
    </StyledOnboardingParagraph>
     <StyledOnboardingParagraph
      isNoImages
    >
      It is maintained by thousands of people across the globe who are
      incentivised to validate transactions and ensure that balances are
      accurate.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImages
    >
      It is highly secure. Bitcoin has been around for over 10 years and
      its network has not suffered one hack or malfunction.
    </StyledOnboardingParagraph>
    <StyledOnboardingButton
      type="primary"
      onClick={next}
      isNext
    >
      Next{" "}
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

export default Blockchain;
