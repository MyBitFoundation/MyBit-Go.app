import styled from 'styled-components';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';

const Image = styled.img`
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
  <CarouselSlide>
    <CarouselSlideMainTitle
      isLong
      isSmallMobile
    >
      <CarouselSlideColoredSpan
        isBlue
      >
        How{' '}
      </CarouselSlideColoredSpan>
      do you ensure Asset Managers do their job?
    </CarouselSlideMainTitle>
    <Image
      src="/asset-manager/myb.png"
      width="90"
      alt="Tools"
    />
    <CarouselSlideParagraph
      hasMarginTop
    >
      Asset managers can put down collateral by locking their MyBit Tokens (MYB).
      If they fail to perform their duties, investors can vote to revoke their MYB.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
      When this occurs, the tokens are burnt and a new Asset Manager is sought. Alternatively,
      if an Asset Manager performs their duties, they can withdraw their collateral (MYB) in
        increments as the asset generates revenue. This model encourages Asset Managers to act
      in the best interest of investors or risk loosing financially.
    </CarouselSlideParagraph>
  </CarouselSlide>
)

export default HowJob;
