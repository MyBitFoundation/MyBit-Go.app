import StyledAssetManagerSlideTitle from '../styles/styledAssetManagerSlideTitle';
import StyledAssetManagerSlideButtons from '../styles/styledAssetManagerSlideButtons';
import StyledAssetManagerSlideButton from '../styles/styledAssetManagerSlideButton';
import StyledAssetManagerSlideParagraph from '../styles/styledAssetManagerSlideParagraph';

const Who = ({
  next,
  previous,
}) => (
  <React.Fragment>
    <StyledAssetManagerSlideTitle>
      Who is qualified to be an Asset Manager?
    </StyledAssetManagerSlideTitle>
    <StyledAssetManagerSlideParagraph
      hasMarginTop
    >
      Anyone who passes identity verification is eligible to be an Asset Manager.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph>
      Once approved, you have the right to be an Asset Manager for life.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph>
      However, this does not guarantee an income for life.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph>
      After being appointed, everything is based on trust.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph>
      That is, the more assets you manage successfully, the better your trust rating.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph>
      If you act badly, you will still be an Asset Manager, but investors may not fund
      your assets. In rare situations, you may be banned from the platform.
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

export default Who;
