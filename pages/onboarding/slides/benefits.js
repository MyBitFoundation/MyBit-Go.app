import styled from 'styled-components';
import SafeGraphic from 'static/onboarding/safe-graphic.png';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideList,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const StyledImage = styled.img`
  margin: 0px auto;
  position: relative;
  margin-top: 20px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
}`

const Benefits = () => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle>
      What are the{" "}
      <StyledCarouselSlideColoredSpan
        isBlue
      >
        benefits?
      </StyledCarouselSlideColoredSpan>
    </StyledCarouselSlideMainTitle>
    <StyledCarouselSlideList
      isSmall
    >
      <li>
        Faster, cheaper, safer, and more accessible
      </li>
      <li>
        No single point of failure risk
      </li>
      <li>
        No counterparty risk and no relying on third parties to complete
        transactions
      </li>
      <li>
        Fast and cheap transactions to anyone, anywhere
      </li>
      <li>
        Give ownership back to the people, putting them back in control
        of capital, investments, and value
      </li>
    </StyledCarouselSlideList>
    <StyledImage
      src={SafeGraphic}
      width="113"
      alt="MyBit Safe"
      isStatic
    />
  </StyledCarouselSlide>
);

export default Benefits;
