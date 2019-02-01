import RightArrow from '../../../static/onboarding/arrow-right.png';
import EthereumGraphic from '../../../static/onboarding/ethereum.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';
import StyledOnboardingList from '../styles/styledOnboardingList';
import StyledOnboardingButtonsWrapper from '../styles/styledOnboardingButtonsWrapper';

const Ethereum = ({
  next,
  previous,
  goToSlide,
}) => (
  <React.Fragment>
    <StyledMainTitle>
      Ethereum
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isNoImagesSmall
      hasMarginTop
    >
      Ethereum is a platform based on blockchain technology. Unlike
      Bitcoin, users can builld applications on top of it.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImagesSmall
    >
      For comparison, you can think of it like this: if Bitcoin is a
      next generation bank, then Ethereum is the software that lets
      anyone build a next generation bank.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImagesSmall
    >
      The possibilities of what can be built on Ethereum extend to
      nearly every business industry.
    </StyledOnboardingParagraph>
    <StyledOnboardingImage
      src={EthereumGraphic}
      width="230"
      alt="MyBit Globe"
      isStatic
    />
    <StyledOnboardingButton
      type="primary"
      onClick={next}
      isNext
    >
      Smart contracts{" "}
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

export default Ethereum;
