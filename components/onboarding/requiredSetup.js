import styled from 'styled-components';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Image = styled.img`
  position: absolute;
  right: 10px;
  width: 68px;
  top: 141px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

import {
  withBancorContext,
} from 'components/BancorContext';

const RequiredSetup = withBancorContext(({
  bancorContext,
}) => (
  <CarouselSlide>
    <Image
      src="/onboarding/setup.png"
      width="77"
      alt="Setup"
      isSetup
    />
    <CarouselSlideMainTitle>
      <CarouselSlideColoredSpan
        isBlue
      >
        Required
      </CarouselSlideColoredSpan>{" "}
      setup
    </CarouselSlideMainTitle>
    <CarouselSlideParagraph
      isTitle
    >
      Before you are able to use the MyBit Go platform, you will
      need the following:
    </CarouselSlideParagraph>
    <CarouselSlideParagraph
      isShorter
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
    </CarouselSlideParagraph>
    <CarouselSlideParagraph
      isShorter
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
    </CarouselSlideParagraph>
  </CarouselSlide>
));

export default RequiredSetup;
