import { withAssetsContext } from 'components/AssetsContext';
import AssetDetailsInfoName from './assetDetailsInfoName';
import AssetDetailsInfoLocationIcon from './assetDetailsInfoLocationIcon';
import AssetDetailsInfoLocation from './assetDetailsInfoLocation';
import AssetDetailsInfoImage from './assetDetailsInfoImage';
import AssetDetailsInfoTitle from './assetDetailsInfoTitle';
import AssetDetailsInfoDescription from './assetDetailsInfoDescription';
import AssetDetailsInfoWrapper from './assetDetailsInfoWrapper';
import Watch from 'ui/Watch';
import { InternalLinks } from 'constants/links';
import Panel from 'ui/Panel';

const FilesToRender = withAssetsContext(({
  files,
  assetId,
  assetsContext,
}) => {
  if(!files || files.length === 0){
    return <span>None</span>;
  }
  return files.map(file => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://cloudflare-ipfs.com/ipfs/${file.hash}`}
      key={file.hash}
      style={{display: "block"}}
    >
      {file.name}
    </a>
  ))
})

const newLineToParagraphs = text => {
  try{
    return text.split('\n').map((item, i) => {
      return <p key={i}>{item}</p>;
    });
  }catch {
    return '';
  }
}

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
  financials,
  about,
  risks,
  files,
  fees,
}) => (
  <AssetDetailsInfoWrapper>
    <Panel maximizeForMobile>
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
        About
      </AssetDetailsInfoTitle>
      <AssetDetailsInfoDescription>
        {newLineToParagraphs(about)}
      </AssetDetailsInfoDescription>
      <AssetDetailsInfoTitle>
        Financials
      </AssetDetailsInfoTitle>
      <AssetDetailsInfoDescription>
        {newLineToParagraphs(financials)}
      </AssetDetailsInfoDescription>
      <AssetDetailsInfoTitle>
        Risks
      </AssetDetailsInfoTitle>
      <AssetDetailsInfoDescription>
        {newLineToParagraphs(risks)}
      </AssetDetailsInfoDescription>
      {fees && (
        <React.Fragment>
          <AssetDetailsInfoTitle>
            Additional Costs
          </AssetDetailsInfoTitle>
          <AssetDetailsInfoDescription>
            {newLineToParagraphs(fees)}
          </AssetDetailsInfoDescription>
        </React.Fragment>
      )}
      <AssetDetailsInfoTitle>
        Supporting documents
      </AssetDetailsInfoTitle>
      <FilesToRender files={files} assetId={assetId}/>
    </Panel>
  </AssetDetailsInfoWrapper>
)

export default React.memo(AssetDetailsInfo);
