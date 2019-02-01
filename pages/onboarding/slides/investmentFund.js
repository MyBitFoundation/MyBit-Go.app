import RightArrow from '../../../static/onboarding/arrow-right.png';
import MyBitDesk from '../../../static/onboarding/desk.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';
import StyledOnboardingList from '../styles/styledOnboardingList';
import StyledOnboardingButtonsWrapper from '../styles/styledOnboardingButtonsWrapper';

const InvestmentFund = ({
  next,
  previous,
  goToSlide,
}) => (
  <React.Fragment>
    <StyledOnboardingImage
      src={MyBitDesk}
      width="190"
      alt="MyBit Onboarding Slide 3"
    />
    <StyledMainTitle>
      MyBit Go is&nbsp;
      <StyledOnboardingColoredSpan
        isRed
      >
        not
      </StyledOnboardingColoredSpan>
      &nbsp;an
      <br />
      investment fund
    </StyledMainTitle>
    <StyledOnboardingList>
      <li>
        We do not invest on your behalf
      </li>
      <li>
        We do not store your personal data
      </li>
      <li>
        We do not provide investment advice
      </li>
      <li>
        We do not hold your investments or capital
      </li>
      <li>
        We cannot enforce investments
      </li>
      <li>
        We do not guarantee returns
      </li>
    </StyledOnboardingList>
    <StyledOnboardingButtonsWrapper>
      <StyledOnboardingButton
        onClick={() => goToSlide(7)}
        isSkip
      >
        Skip… I know Blockchain
      </StyledOnboardingButton>
      <StyledOnboardingButton
        type="primary"
        onClick={next}
        isNext
        isStatic
      >
        What is blockchain?{" "}
        <StyledOnboardingArrow
          src={RightArrow}
          alt="Next Button Arrow"
        />
      </StyledOnboardingButton>
    </StyledOnboardingButtonsWrapper>
    <StyledOnboardingButton
      onClick={previous}
      isBack
    >
      Back
    </StyledOnboardingButton>
  </React.Fragment>
);

export default InvestmentFund;
