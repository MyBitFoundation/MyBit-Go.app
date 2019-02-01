import StyledAssetManagerSlideTitle from '../styles/styledAssetManagerSlideTitle';
import StyledAssetManagerSlideButtons from '../styles/styledAssetManagerSlideButtons';
import StyledAssetManagerSlideButton from '../styles/styledAssetManagerSlideButton';
import StyledAssetManagerSlideParagraph from '../styles/styledAssetManagerSlideParagraph';

const HowIncentivised = ({
  next,
  previous,
}) => (
  <React.Fragment>
    <StyledAssetManagerSlideTitle>
      How are Asset Managers incentivised?
    </StyledAssetManagerSlideTitle>
    <StyledAssetManagerSlideParagraph
      hasMarginTop
      isPadded
    >
      In return for maintaining the asset, Asset Managers receive a portion of the revenue it generates.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph isPadded>
      Since profits are based on an asset’s revenue rather than a fixed amount, it incentivises the
      Asset Manager to ensure the asset generates as much revenue as possible.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph isPadded>
      To follow free market principles, the percentage of revenue is chosen by the Asset Manager.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph isPadded>
      Then, if they request too high a percentage, in theory, investors will not fund the asset.
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

export default HowIncentivised;
