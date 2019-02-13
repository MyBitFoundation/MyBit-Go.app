import styled from 'styled-components';
import MyBitGoLogo from 'static/onboarding/mybitgo.png';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
} from 'components/CarouselSlide/';

const StyledImage = styled.img`
  position: absolute;
  top: 40px;
  right: 40px;
  width: 72px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const StyledWelcome = styled.div`
  h1{
    @media(min-width: 321px) {
      padding-right: 80px;
    }

    @media(min-width: 475px) {
      padding-right: 0px;
    }
  }
`;

const Welcome = () => (
  <StyledCarouselSlide>
    <StyledImage
      src={MyBitGoLogo}
      width="90"
      alt="MyBit Onboarding Slide 1"
    />
    <StyledWelcome>
      <StyledCarouselSlideMainTitle>
        Welcome to MyBit Go
      </StyledCarouselSlideMainTitle>
    </StyledWelcome>
    <StyledCarouselSlideParagraph
      isIntro
      isShorter
    >
      <strong>
        MyBit Go brings power and control back to you. Invest without a
        bank, broker, fund or third-party.
      </strong>
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      MyBit Go is a secure investment platform available to anyone. It
      enables you to invest in high ROI opportunities and receive
      revenue in real-time.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      In addition, you actually own and control your investments, unlike
      stocks.
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
)

export default Welcome;
