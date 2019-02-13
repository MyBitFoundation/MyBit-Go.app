import styled from 'styled-components';
import MyBitDesk from 'static/onboarding/desk.png';
import StyledOnboardingColoredSpan from '../styles/styledOnboardingColoredSpan';

import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideList,
} from 'components/CarouselSlide/';

const StyledImage = styled.img`
  position: absolute;
  top: 45px;
  right: 102px;
  width: 100px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const InvestmentFund = () => (
  <StyledCarouselSlide>
    <StyledImage
      src={MyBitDesk}
      width="190"
      alt="MyBit Onboarding Slide 3"
    />
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      MyBit Go is&nbsp;
      <StyledOnboardingColoredSpan
        isRed
      >
        not
      </StyledOnboardingColoredSpan>
      &nbsp;an
      <br />
      investment fund
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideList>
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
    </StyledCarouselSlideList>
  </StyledCarouselSlide>
);

export default InvestmentFund;
