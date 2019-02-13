import styled from 'styled-components';
import SetupGraphic from 'static/onboarding/setup.png';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const StyledImage = styled.img`
  position: absolute;
  top: 165px;
  right: 10px;
  width: 77px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

import {
  withBancorContext,
} from '../../../components/UI/BancorContainer';

const RequiredSetup = withBancorContext(({
  bancorContext,
}) => (
  <StyledCarouselSlide>
    <StyledImage
      src={SetupGraphic}
      width="77"
      alt="Setup"
      isSetup
    />
    <StyledCarouselSlideMainTitle>
      <StyledCarouselSlideColoredSpan
        isBlue
      >
        Required
      </StyledCarouselSlideColoredSpan>{" "}
      setup
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideParagraph
      isTitle
    >
      Before you are able to use the MyBit Go platform, you will
      need the following:
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph
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
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph
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
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph
      isShorter
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
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
));

export default RequiredSetup;
