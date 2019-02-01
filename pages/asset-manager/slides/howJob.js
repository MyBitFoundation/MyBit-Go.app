import StyledAssetManagerSlideTitle from '../styles/styledAssetManagerSlideTitle';
import StyledAssetManagerSlideIntroNote from '../styles/styledAssetManagerSlideIntroNote';
import StyledAssetManagerSlideList from '../styles/styledAssetManagerSlideList';
import StyledAssetManagerSlideButtons from '../styles/styledAssetManagerSlideButtons';
import StyledAssetManagerSlideImgWrapper from '../styles/styledAssetManagerSlideImgWrapper';
import StyledAssetManagerSlideParagraph from '../styles/styledAssetManagerSlideParagraph';
import StyledAssetManagerSlideButton from '../styles/styledAssetManagerSlideButton';
import Myb from '../../../static/asset-manager/myb.png';

const HowJob = ({
  onFinish,
  previous,
}) => (
  <React.Fragment>
    <StyledAssetManagerSlideTitle>
      How do you ensure Asset Managers do their job?
    </StyledAssetManagerSlideTitle>
    <StyledAssetManagerSlideImgWrapper
      isMyb
    >
      <img alt="MyBit Logo" src={Myb} />
    </StyledAssetManagerSlideImgWrapper>
    <StyledAssetManagerSlideParagraph
      hasMarginTop
      isPadded
    >
      Asset managers can put down collateral by locking their MyBit Tokens (MYB).
      If they fail to perform their duties, investors can vote to revoke their MYB.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideParagraph isPadded>
      When this occurs, the tokens are burnt and a new Asset Manager is sought. Alternatively,
      if an Asset Manager performs their duties, they can withdraw their collateral (MYB) in
        increments as the asset generates revenue. This model encourages Asset Managers to act
      in the best interest of investors or risk loosing financially.
    </StyledAssetManagerSlideParagraph>
    <StyledAssetManagerSlideButtons>
      <StyledAssetManagerSlideButton
        type="primary"
        onClick={onFinish}
        isContinue
      >
        Get Started
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

export default HowJob;
