import AssetDetailsInfoName from './assetDetailsInfoName';
import AssetDetailsInfoLocationIcon from './assetDetailsInfoLocationIcon';
import AssetDetailsInfoLocation from './assetDetailsInfoLocation';
import AssetDetailsInfoImage from './assetDetailsInfoImage';
import AssetDetailsInfoTitle from './assetDetailsInfoTitle';
import AssetDetailsInfoDescription from './assetDetailsInfoDescription';
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
    <AssetDetailsInfoName>
      {name}
    </AssetDetailsInfoName>
    <AssetDetailsInfoLocationIcon
    />
    <AssetDetailsInfoLocation>
      {country}, {city}
    </AssetDetailsInfoLocation>
    <AssetDetailsInfoImage
      background={imageSrc}
    >
    <Watch
      active={watchListed}
      handleClick={handleAssetFavorited}
      assetId={assetId}
    />
    </AssetDetailsInfoImage>

    <AssetDetailsInfoTitle>
      Asset Details
    </AssetDetailsInfoTitle>
    <AssetDetailsInfoDescription>
      {details}
    </AssetDetailsInfoDescription>
    <AssetDetailsInfoTitle>
      Description
    </AssetDetailsInfoTitle>
    <AssetDetailsInfoDescription>
      {description}
    </AssetDetailsInfoDescription>
  </AssetDetailsInfoWrapper>
)

export default React.memo(AssetDetailsInfo);
