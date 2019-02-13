import styled from 'styled-components';
import {
  StyledCarouselSlide,
  StyledCarouselSlideMainTitle,
  StyledCarouselSlideParagraph,
  StyledCarouselSlideList,
  StyledCarouselSlideColoredSpan,
} from 'components/CarouselSlide/';
import Myb from 'static/asset-manager/myb.png';

const StyledImage = styled.img`
  margin: 0px auto;
  position: relative;
  margin-top: 30px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
`;

const HowJob = ({
  onFinish,
  previous,
}) => (
  <StyledCarouselSlide>
    <StyledCarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      <StyledCarouselSlideColoredSpan
        isBlue
      >
        How{' '}
      </StyledCarouselSlideColoredSpan>
      do you ensure Asset Managers do their job?
    </StyledCarouselSlideMainTitle>
    <StyledImage
      src={Myb}
      width="90"
      alt="Tools"
    />
    <StyledCarouselSlideParagraph
      hasMarginTop
    >
      Asset managers can put down collateral by locking their MyBit Tokens (MYB).
      If they fail to perform their duties, investors can vote to revoke their MYB.
    </StyledCarouselSlideParagraph>
    <StyledCarouselSlideParagraph>
      When this occurs, the tokens are burnt and a new Asset Manager is sought. Alternatively,
      if an Asset Manager performs their duties, they can withdraw their collateral (MYB) in
        increments as the asset generates revenue. This model encourages Asset Managers to act
      in the best interest of investors or risk loosing financially.
    </StyledCarouselSlideParagraph>
  </StyledCarouselSlide>
)

export default HowJob;
