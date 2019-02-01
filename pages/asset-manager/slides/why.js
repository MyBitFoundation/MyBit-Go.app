import StyledAssetManagerSlideTitle from '../styles/styledAssetManagerSlideTitle';
import StyledAssetManagerSlideIntroNote from '../styles/styledAssetManagerSlideIntroNote';
import StyledAssetManagerSlideList from '../styles/styledAssetManagerSlideList';
import StyledAssetManagerSlideButtons from '../styles/styledAssetManagerSlideButtons';
import StyledAssetManagerSlideImgWrapper from '../styles/styledAssetManagerSlideImgWrapper';
import StyledAssetManagerSlideParagraph from '../styles/styledAssetManagerSlideParagraph';
import StyledAssetManagerSlideButton from '../styles/styledAssetManagerSlideButton';
import Tools from '../../../static/asset-manager/tools.png';

const Why = ({
  next,
  previous,
}) => (
  <React.Fragment>
    <StyledAssetManagerSlideTitle>
      Why is an Asset<br /> Manager needed?
    </StyledAssetManagerSlideTitle>
    <StyledAssetManagerSlideImgWrapper
      isTools
    >
      <img className="Slider__img-tools" alt="Tools" src={Tools} />
    </StyledAssetManagerSlideImgWrapper>
    <StyledAssetManagerSlideParagraph
      hasMarginTop
    >
        In a perfect, futuristic world the MyBit Go ecosystem could be fully automated.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph>
        So, when an asset has an issue, it could request another
        machine to come and fix it, replenish its funds or inventory, etc.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph>
        Since we are not yet at that stage, human oversight is required for most assets to function properly.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideButtons>
      <StyledAssetManagerSlideButton
        type="primary"
        onClick={next}
        isContinue
      >
        Next
      </StyledAssetManagerSlideButton>
      <StyledAssetManagerSlideButton
        type="secondary"
        onClick={previous}
        isBack
      >
        Back
      </StyledAssetManagerSlideButton>
    </StyledAssetManagerSlideButtons>
  </React.Fragment>
)

export default Why;
