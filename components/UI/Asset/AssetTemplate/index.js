import Watch from 'ui/Watch';
import AssetTemplateWrapper from './assetTemplateWrapper';
import AssetTemplateImageHolder from './assetTemplateImageHolder';
import AssetTemplateGradient from './assetTemplateGradient';
import AssetTemplateLocationIcon from './assetTemplateLocationIcon';
import AssetTemplateName from './assetTemplateName';
import AssetTemplateLocation from './assetTemplateLocation';

const AssetTemplate = ({
  children,
  backgroundImage,
  handleAssetFavorited,
  assetId,
  name,
  city,
  watchListed,
  country,
  height,
  margin,
  onClickImg,
}) => (
  <AssetTemplate
    margin={margin}
  >
    <AssetTemplateImageHolder
      backgroundImage={backgroundImage}
      height={height}
      onClick={onClickImg}
    >
      {handleAssetFavorited && (
        <Watch
          active={watchListed}
          handleClick={handleAssetFavorited}
          assetId={assetId}
        />
      )}
      <AssetTemplateGradient />
      <AssetTemplateLocationIcon />
      <AssetTemplateName>{name}</AssetTemplateName>
      <AssetTemplateLocation>
        {country}, <span>{city}</span>
      </AssetTemplateLocation>
    </AssetTemplateImageHolder>
    {children}
  </AssetTemplate>
);

export default AssetTemplate;
