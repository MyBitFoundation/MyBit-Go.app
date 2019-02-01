import RightArrow from '../../../static/onboarding/arrow-right.png';
import SetupGraphic from '../../../static/onboarding/setup.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';

import {
  withBancorContext,
} from '../../../components/UI/BancorContainer';

const RequiredSetup = withBancorContext(({
  finishOnboarding,
  previous,
  bancorContext,
}) => (
  <React.Fragment>
    <StyledOnboardingImage
      src={SetupGraphic}
      width="77"
      alt="Setup"
      isSetup
    />
    <StyledMainTitle>
      <StyledOnboardingColoredSpan
        isBlue
      >
        Required
      </StyledOnboardingColoredSpan>{" "}
      setup
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isTitle
    >
      Before you are able to use the MyBit Go platform, you will
      need the following:
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImages
    >
      MetaMask, a browser extension that turns any ordinary
      browser into one that can interact with blockchain
      applications.
      <a
        href="http://metamask.io"
        target="_blank"
        rel="noopener noreferrer"
      >
      {' '}Get MetaMask
      </a>
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImages
    >
      Cryptocurrency, such as Ether or DAI, which are the main
      cryptocurrencies MyBit Go uses to invest in assets; however,
      many more are supported.{" "}
      <a
        href="/bankor"
        onClick={(e) => {
          e.preventDefault();
          bancorContext.initBancor({
            type: 1,
            baseCurrencyId: '5937d635231e97001f744267',
            pairCurrencyId: '5b164627ae2482321708eb93',
          });
        }}
      >
        Get Ether
      </a>
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isNoImages
    >
      MyBit Tokens (MYB), the native token that fuels the <br />
      MyBit Network. Applications such as MyBit Go, which <br />
      run on the Network, require MYB to use.{" "}
      <a
        href="/bankor"
        onClick={(e) => {
          e.preventDefault();
          bancorContext.initBancor();
        }}
      >
        Get MYB
      </a>
    </StyledOnboardingParagraph>
    <StyledOnboardingButton
      type="primary"
      onClick={finishOnboarding}
      isNext
    >
      Get started and explore{" "}
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
));

export default RequiredSetup;
