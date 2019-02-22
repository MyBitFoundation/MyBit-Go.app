import Watch from 'ui/Watch';
import StyledAssetTemplate from './styledAssetTemplate';
import StyledAssetTemplateImageHolder from './styledAssetTemplateImageHolder';
import StyledAssetTemplateGradient from './styledAssetTemplateGradient';
import StyledAssetTemplateLocationIcon from './styledAssetTemplateLocationIcon';
import StyledAssetTemplateName from './styledAssetTemplateName';
import StyledAssetTemplateLocation from './styledAssetTemplateLocation';

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
}) => (
  <StyledAssetTemplate
    margin={margin}
  >
    <StyledAssetTemplateImageHolder
      backgroundImage={backgroundImage}
      height={height}
    >
      {handleAssetFavorited && (
        <Watch
          active={watchListed}
          handleClick={handleAssetFavorited}
          assetId={assetId}
        />
      )}
      <StyledAssetTemplateGradient />
      <StyledAssetTemplateLocationIcon />
      <StyledAssetTemplateName>{name}</StyledAssetTemplateName>
      <StyledAssetTemplateLocation>
        {country}, <span>{city}</span>
      </StyledAssetTemplateLocation>
    </StyledAssetTemplateImageHolder>
    {children}
  </StyledAssetTemplate>
);

export default AssetTemplate;
