import styled from 'styled-components';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideList,
  CarouselSlideColoredSpan,
} from 'components/CarouselSlide/';
import Tools from 'static/asset-manager/tools.png';

const Image = styled.img`
  margin: 0px auto;
  position: relative;
  margin-top: 30px;
  display: none !important;

  ${({theme}) => theme.tablet`
    display: block !important;
  `}
`;

const Why = ({
  next,
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
        Why
      </CarouselSlideColoredSpan> is an Asset Manager needed?
    </CarouselSlideMainTitle>
    <Image
      src={Tools}
      width="190"
      alt="Tools"
    />
    <CarouselSlideParagraph
      hasMarginTop
    >
        In a perfect, futuristic world the MyBit Go ecosystem could be fully automated.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
        So, when an asset has an issue, it could request another
        machine to come and fix it, replenish its funds or inventory, etc.
    </CarouselSlideParagraph>
    <CarouselSlideParagraph>
        Since we are not yet at that stage, human oversight is required for most assets to function properly.
    </CarouselSlideParagraph>
  </CarouselSlide>
)

export default Why;
