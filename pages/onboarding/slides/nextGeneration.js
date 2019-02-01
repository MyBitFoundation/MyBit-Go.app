import RightArrow from '../../../static/onboarding/arrow-right.png';
import Globe from '../../../static/onboarding/globe.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';
import StyledOnboardingList from '../styles/styledOnboardingList';

const NextGeneration = ({
  next,
  previous,
}) => (
  <React.Fragment>
    <StyledOnboardingImage
      src={Globe}
      width="164"
      alt="MyBit Onboarding Slide 2"
      isGlobe
    />
    <StyledMainTitle
      isLong
    >
      The{" "}
      <StyledOnboardingColoredSpan
        isBlue
      >
        next generation
      </StyledOnboardingColoredSpan>{" "}
      <br />
      investment portal
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isTitle
      isBig
    >
      What can you use MyBit Go for?
    </StyledOnboardingParagraph>
    <StyledOnboardingList>
      <li>
        Invest in a variety of assets without a broker or intermediary
      </li>
      <li>
        Invest without a bank account
      </li>
      <li>
        Be in full control of your capital and investments
      </li>
      <li>
        Invest without location restrictions, anyone can access
        investment opportunities
      </li>
      <li>
        Receive payouts in real-time. No more waiting for quarterly or
        annual distributions
      </li>
      <li>
        Be protected from failure. If MyBit Go ceases to exist, your
        investments will still be safe
      </li>
    </StyledOnboardingList>
    <StyledOnboardingButton
      type="primary"
      onClick={next}
      isNext
    >
      What it isn't{" "}
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
)

export default NextGeneration;
