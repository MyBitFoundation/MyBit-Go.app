import RightArrow from '../../../static/onboarding/arrow-right.png';
import SmartContract from '../../../static/onboarding/smart_contract.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';

const SmartContracts = ({
  next,
  previous,
  goToSlide,
}) => (
  <React.Fragment>
   <StyledMainTitle>
    <StyledOnboardingColoredSpan
      isBlue
    >
      Smart
    </StyledOnboardingColoredSpan>{" "}
      contracts
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isNoImagesFull
    >
      'Smart contracts' is a phrase used to describe computer code that
      automatically executes when specific conditions are met. This is
      extremely useful for the exchange of money, content, property, or
      anything of value.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImagesFull
    >
      With smart contracts, the investor can be assured the contractual
      agreement will execute according to the defined conditions. This
      creates a more secure environment and also leads to lower fees
      because no manual process involving human labour is needed.
    </StyledOnboardingParagraph>
    <StyledOnboardingImage
      src={SmartContract}
      width="199"
      alt="Smart Contract"
      isStatic
    />
    <StyledOnboardingButton
      type="primary"
      onClick={next}
      isNext
    >
      How do I invest?{" "}
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

export default SmartContracts;
