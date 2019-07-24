import AssetDetailsInfoName from './assetDetailsInfoName';
import AssetDetailsInfoLocationIcon from './assetDetailsInfoLocationIcon';
import AssetDetailsInfoLocation from './assetDetailsInfoLocation';
import AssetDetailsInfoImage from './assetDetailsInfoImage';
import AssetDetailsInfoTitle from './assetDetailsInfoTitle';
import AssetDetailsInfoDescription from './assetDetailsInfoDescription';
import AssetDetailsInfoWrapper from './assetDetailsInfoWrapper';
import Watch from 'ui/Watch';
import { InternalLinks } from 'constants/links';

const getFilesToRender = (files, assetId) => {
  if(!files || files.length === 0){
    return <span>None</span>;
  }
  const toReturn = files.map(file => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`${InternalLinks.S3}${assetId}:${file}`}
    >
      {file}
    </a>
  ))

  return toReturn;
}

const newLineToParagraphs = text => {
  return text.split('\n').map((item, i) => {
    return <p key={i}>{item}</p>;
  });
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
    <AssetDetailsInfoTitle>
      Additional Costs
    </AssetDetailsInfoTitle>
    <AssetDetailsInfoDescription>
      {newLineToParagraphs(fees)}
    </AssetDetailsInfoDescription>
    <AssetDetailsInfoTitle>
      Supporting documents
    </AssetDetailsInfoTitle>
    {getFilesToRender(files, assetId)}
  </AssetDetailsInfoWrapper>
)

export default React.memo(AssetDetailsInfo);
