import StyledAssetDetailsInfoName from './styledAssetDetailsInfoName';
import StyledAssetDetailsInfoLocationIcon from './styledAssetDetailsInfoLocationIcon';
import StyledAssetDetailsInfoLocation from './styledAssetDetailsInfoLocation';
import StyledAssetDetailsInfoImage from './styledAssetDetailsInfoImage';
import StyledAssetDetailsInfoTitle from './styledAssetDetailsInfoTitle';
import StyledAssetDetailsInfoDescription from './styledAssetDetailsInfoDescription';
import AssetDetailsInfoWrapper from './assetDetailsInfoWrapper';
import Watch from 'ui/Watch';

const AssetDetailsInfo = ({
  name,
  imageSrc,
  city,
  country,
  details,
  description,
  watchListed,
  handleAssetFavorited,
  assetId,
}) => (
  <AssetDetailsInfoWrapper>
    <StyledAssetDetailsInfoName>
      {name}
    </StyledAssetDetailsInfoName>
    <StyledAssetDetailsInfoLocationIcon
    />
    <StyledAssetDetailsInfoLocation>
      {country}, {city}
    </StyledAssetDetailsInfoLocation>
    <StyledAssetDetailsInfoImage
      background={imageSrc}
    >
    <Watch
      active={watchListed}
      handleClick={handleAssetFavorited}
      assetId={assetId}
    />
    </StyledAssetDetailsInfoImage>

    <StyledAssetDetailsInfoTitle>
      Asset Details
    </StyledAssetDetailsInfoTitle>
    <StyledAssetDetailsInfoDescription>
      {details}
    </StyledAssetDetailsInfoDescription>
    <StyledAssetDetailsInfoTitle>
      Description
    </StyledAssetDetailsInfoTitle>
    <StyledAssetDetailsInfoDescription>
      {description}
    </StyledAssetDetailsInfoDescription>
  </AssetDetailsInfoWrapper>
)

export default React.memo(AssetDetailsInfo);
