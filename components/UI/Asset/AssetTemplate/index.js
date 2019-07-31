import Router from 'next/router';
import Watch from 'ui/Watch';
import AssetTemplateWrapper from './assetTemplateWrapper';
import AssetTemplateImageHolder from './assetTemplateImageHolder';
import AssetTemplateLocationIcon from './assetTemplateLocationIcon';
import AssetTemplateName from './assetTemplateName';
import AssetTemplateLocation from './assetTemplateLocation';
import RevenueGenerator from 'components/RevenueGenerator';

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
}) => {
  const loadingModel = !backgroundImage;
  return (
    <AssetTemplateWrapper
      margin={margin}
      loadingModel={loadingModel}
    >
      <AssetTemplateImageHolder
        backgroundImage={backgroundImage}
        height={height}
        onClick={() => Router.push(`/asset?id=${assetId}`, `/asset/${assetId}`)}
      >
        {handleAssetFavorited && (
          <Watch
            active={watchListed}
            handleClick={handleAssetFavorited}
            assetId={assetId}
          />
        )}
        <AssetTemplateLocationIcon />
        <AssetTemplateName>{name}</AssetTemplateName>
        <AssetTemplateLocation>
          {country}, <span>{city}</span>
        </AssetTemplateLocation>
      </AssetTemplateImageHolder>
      {children}
    </AssetTemplateWrapper>
  )
}

export default AssetTemplate;
