import styled from 'styled-components';
import Key from 'public/onboarding/key.png';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Image = styled.img`
  position: absolute;
  top: 84px;
  right: 205px;
  width: 50px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const Security = () => (
  <CarouselSlide>
    <Image
      src={Key}
      width="69"
      alt="Key"
      isKey
    />
    <CarouselSlideMainTitle>
      <CarouselSlideColoredSpan
        isBlue
      >
        Key{' '}
      </CarouselSlideColoredSpan>
      security
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph>
      All of your investments are linked to your metamask
      account. We have no control over it or ability to restore it.{" "}
      If you lose your private key or password, it is gone forever.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph
      isTitle
    >
      Follow these steps to avoid loss!
    </CarouselSlideParagraph>
    <CarouselSlideList
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
    </CarouselSlideList>
  </CarouselSlide>
);

export default Security;
