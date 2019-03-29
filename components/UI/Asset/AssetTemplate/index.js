import Watch from 'ui/Watch';
import AssetTemplateWrapper from './assetTemplateWrapper';
import AssetTemplateImageHolder from './assetTemplateImageHolder';
import AssetTemplateGradient from './assetTemplateGradient';
import AssetTemplateLocationIcon from './assetTemplateLocationIcon';
import AssetTemplateName from './assetTemplateName';
import AssetTemplateLocation from './assetTemplateLocation';
import RevenueGenerator from 'components/RevenueGenerator';
const dev = process.env.NODE_ENV !== 'production';

class AssetTemplate extends React.PureComponent {
  state = {
    hovering: false,
  }

  render = () => {
    const {
      hovering,
    } = this.state;

    const {
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
    } = this.props;

    return (
      <AssetTemplateWrapper
        margin={margin}
      >
        {(true && dev) && <RevenueGenerator assetId={assetId}/>}
        <AssetTemplateImageHolder
          backgroundImage={backgroundImage}
          height={height}
          onClick={onClickImg}
          onMouseEnter={() => this.setState({hovering: true})}
          onMouseLeave={() => this.setState({hovering: false})}
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
      </AssetTemplateWrapper>
    )
  }
}

export default AssetTemplate;
