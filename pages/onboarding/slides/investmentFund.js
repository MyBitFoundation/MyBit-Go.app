import styled from 'styled-components';
import MyBitDesk from 'public/onboarding/desk.png';
import {
  Button,
} from 'antd';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideList,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Image = styled.img`
  position: absolute;
  top: 45px;
  right: 102px;
  width: 100px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const ButtonWrapper = styled(Button)`
  position: absolute;
  color: rgb(24, 144, 255);
  font-style: normal;
  font-weight: normal;
  line-height: 22px;
  font-size: 14px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  bottom: 10px;
  right: 14px;

  ${({theme}) => theme.tablet`
    top: 100%;
    transform: translate(0%, -100%);
    left: 200px;
    bottom: auto;
    right: auto;
  `}
`

const InvestmentFund = ({
  goToSlide,
}) => (
  <CarouselSlide>
    <Image
      src={MyBitDesk}
      width="190"
      alt="MyBit Onboarding Slide 3"
    />
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      MyBit Go is&nbsp;
      <CarouselSlideColoredSpan
        isRed
      >
        not
      </CarouselSlideColoredSpan>
      &nbsp;an
      <br />
      investment fund
    </CarouselSlideMainTitle>
    <CarouselSlideList>
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
    </CarouselSlideList>
    <ButtonWrapper
      onClick={() => goToSlide(7)}
    >
      Skip... I know blockchain
    </ButtonWrapper>
  </CarouselSlide>
);

export default InvestmentFund;
