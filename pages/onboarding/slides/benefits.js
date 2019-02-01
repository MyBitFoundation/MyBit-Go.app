import RightArrow from '../../../static/onboarding/arrow-right.png';
import SafeGraphic from '../../../static/onboarding/safe-graphic.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';
import StyledOnboardingList from '../styles/styledOnboardingList';

const Benefits = ({
  next,
  previous,
  goToSlide,
}) => (
  <React.Fragment>
    <StyledMainTitle>
      What are the{" "}
      <StyledOnboardingColoredSpan
        isBlue
      >
        benefits?
      </StyledOnboardingColoredSpan>
    </StyledMainTitle>
    <StyledOnboardingList
      isSmall
    >
      <li>
        Faster, cheaper, safer, and more accessible
      </li>
      <li>
        No single point of failure risk
      </li>
      <li>
        No counterparty risk and no relying on third parties to complete
        transactions
      </li>
      <li>
        Fast and cheap transactions to anyone, anywhere
      </li>
      <li>
        Give ownership back to the people, putting them back in control
        of capital, investments, and value
      </li>
    </StyledOnboardingList>
    <StyledOnboardingImage
      src={SafeGraphic}
      width="113"
      alt="MyBit Safe"
      isStatic
    />
    <StyledOnboardingButton
      type="primary"
      onClick={next}
      isNext
    >
      What is Ethereum?{" "}
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

export default Benefits;
