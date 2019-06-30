import Router from 'next/router';
import Watch from 'ui/Watch';
import AssetTemplateWrapper from './assetTemplateWrapper';
import AssetTemplateImageHolder from './assetTemplateImageHolder';
import AssetTemplateGradient from './assetTemplateGradient';
import AssetTemplateLocationIcon from './assetTemplateLocationIcon';
import AssetTemplateName from './assetTemplateName';
import AssetTemplateLocation from './assetTemplateLocation';
import RevenueGenerator from 'components/RevenueGenerator';
const dev = true;

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
        onMouseEnter={() => this.setState({hovering: true})}
        onMouseLeave={() => this.setState({hovering: false})}
      >
        {(hovering && dev) && <RevenueGenerator assetId={assetId}/>}
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
