import styled from 'styled-components';
import MyBitGoLogo from 'static/onboarding/mybitgo.png';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
} from 'components/CarouselSlide/';

const Image = styled.img`
  position: absolute;
  top: 40px;
  right: 20px;
  width: 72px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const WelcomeWrapper = styled.div`
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
  <CarouselSlide>
    <Image
      src={MyBitGoLogo}
      width="90"
      alt="MyBit Onboarding Slide 1"
    />
    <WelcomeWrapper>
      <CarouselSlideMainTitle>
        Welcome to MyBit Go
      </CarouselSlideMainTitle>
    </WelcomeWrapper>
    <CarouselSlideParagraph
      isIntro
      isShorter
    >
      <strong>
        MyBit Go brings power and control back to you. Invest without a
        bank, broker, fund or third-party.
      </strong>
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      MyBit Go is a secure investment platform available to anyone. It
      enables you to invest in high ROI opportunities and receive
      revenue in real-time.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      In addition, you actually own and control your investments, unlike
      stocks.
    </CarouselSlideParagraph>
  </CarouselSlide>
)

export default Welcome;
