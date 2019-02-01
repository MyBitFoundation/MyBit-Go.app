import RightArrow from '../../../static/onboarding/arrow-right.png';
import Key from '../../../static/onboarding/key.png';
import StyledMainTitle from '../styles/styledMainTitle';
import StyledOnboardingImage from '../styles/styledOnboardingImage';
import StyledOnboardingParagraph from '../styles/styledOnboardingParagraph';
import StyledOnboardingButton from '../styles/styledOnboardingButton';
import StyledOnboardingArrow from '../styles/styledOnboardingArrow';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';
import StyledOnboardingList from '../styles/styledOnboardingList';

const Security = ({
  next,
  previous,
  goToSlide,
}) => (
  <React.Fragment>
    <StyledOnboardingImage
      src={Key}
      width="69"
      alt="Key"
      isKey
    />
    <StyledMainTitle>
      <StyledOnboardingColoredSpan
        isBlue
      >
        Key{' '}
      </StyledOnboardingColoredSpan>
      security
    </StyledMainTitle>
    <StyledOnboardingParagraph
      isNoImagesFull
    >
      All of your investments are linked to your metamask <br />
      account. We have no control over it or ability to restore it.{" "}
      <br />
      If you lose your private key or password, it is gone forever.
    </StyledOnboardingParagraph>
    <StyledOnboardingParagraph
      isTitle
    >
      Follow these steps to avoid loss!
    </StyledOnboardingParagraph>
    <StyledOnboardingList
      isSecurity
    >
      <li>
        Make a backup of your private key and password. DO NOT just
        store it on your computer. Print it out on a piece of paper or
        save it to a USB drive.
      </li>
      <li>
        Store this paper or USB drive in a different physical location.
        A backup is not useful if it is destroyed by a fire or flood
        along with your laptop.
      </li>
      <li>
        Do not store your private key in Dropbox, Google Drive, or other
        cloud storage. If that account is compromised, your funds will
        be stolen.
      </li>
      <li>
        For added protection,{" "}
        <a
          href="https://trezor.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          get a hardware wallet
        </a>
        .
      </li>
    </StyledOnboardingList>
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

export default Security;
