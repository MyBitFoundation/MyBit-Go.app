import StyledAssetManagerSlideTitle from '../styledAssetManagerSlideTitle';
import StyledAssetManagerSlideIntroNote from '../styledAssetManagerSlideIntroNote';
import StyledAssetManagerSlideList from '../styledAssetManagerSlideList';
import StyledAssetManagerSlideListItem from '../styledAssetManagerSlideListItem';
import StyledAssetManagerSlideButtons from '../styledAssetManagerSlideButtons';

const What = ({
  next,
}) => (
  <React.Fragment>
    <StyledAssetManagerSlideTitle>
      What is an Asset Manager?
    </StyledAssetManagerSlideTitle>
    <StyledAssetManagerSlideIntroNote>
        Asset Managers are critical to the MyBit Go platform.
        They supervise the assets and are responsible for:
    </StyledAssetManagerSlideIntroNote>

    <StyledAssetManagerSlideList>
      <StyledAssetManagerSlideListItem>
        Coordinating any local approval required and/or navigating regulations
        (e.g. getting approval from a store owner to place a Crypto ATM in their store).
      </StyledAssetManagerSlideListItem>
      <StyledAssetManagerSlideListItem>
        Listing assets: only Asset Managers have the power to initiate new funding campaigns for assets.
      </StyledAssetManagerSlideListItem>
      <StyledAssetManagerSlideListItem>
        Oversight and maintenance: the Asset Manager is in charge of overseeing the asset
        and ensuring it functions properly. This may include security, repairs, marketing,
        or replenishing funds in the case of a Crypto ATM.
      </StyledAssetManagerSlideListItem>
    </StyledAssetManagerSlideList>
    <StyledAssetManagerSlideButtons
      isCentered
    >
      <Button type="primary" onClick={next}>Next</Button>
    </StyledAssetManagerSlideButtons>
  </React.Fragment>
)

export default What;
