import RightArrow from '../../../static/onboarding/arrow-right.png';
import MyBitGoLogo from '../../../static/onboarding/mybitgo.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';

const Welcome = ({
  next,
}) => (
  <React.Fragment>
    <StyledOnboardingImage
      src={MyBitGoLogo}
      width="90"
      alt="MyBit Onboarding Slide 1"
    />
    <StyledMainTitle>
      Welcome to MyBit Go
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isIntro
    >
      <strong>
        MyBit Go brings power and control back to you. Invest without a
        bank, broker, fund or third-party.
      </strong>
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph>
      MyBit Go is a secure investment platform available to anyone. It
      enables you to invest in high ROI opportunities and receive
      revenue in real-time.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph>
      In addition, you actually own and control your investments, unlike
      stocks.
    </StyledOnboardingParagraph>
    <StyledOnboardingButton
      type="primary"
      onClick={next}
      isNext
    >
      More on MyBit Go{' '}
      <StyledOnboardingArrow
        src={RightArrow}
        alt="Next Button Arrow"
      />
    </StyledOnboardingButton>
  </React.Fragment>
)

export default Welcome;
