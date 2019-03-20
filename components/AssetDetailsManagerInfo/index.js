import React from 'react';
import StyledAssetDetailsMananagerInfo from './styledAssetDetailsMananagerInfo';
import StyledAssetDetailsManagerInfoTitle from './styledAssetDetailsManagerInfoTitle';
import StyledAssetDetailsManagerInfoCivic from './styledAssetDetailsManagerInfoCivic';
import StyledAssetDetailsManagerInfoAddress from './styledAssetDetailsManagerInfoAddress';
import StyledAssetDetailsManagerInfoDocuments from './styledAssetDetailsManagerInfoDocuments';
import StyledAssetDetailsManagerInfoPercentages from './styledAssetDetailsManagerInfoPercentages';
import ValueDisplay from 'ui/ValueDisplay';
import MyBitLogo from 'static/mybit-blue.svg';
import Sliders from 'static/sliders.svg';
import {
  InternalLinks,
} from 'constants';

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

const AssetDetailsManagerInfo = ({
  address,
  addressShortened,
  managerPercentage,
  collateralPercentage,
  image,
  style,
  files,
}) => (
  <StyledAssetDetailsMananagerInfo
    style={style}
  >
    <div>
      <StyledAssetDetailsManagerInfoTitle>
        Asset Manager
      </StyledAssetDetailsManagerInfoTitle>
      <StyledAssetDetailsManagerInfoCivic />
      <StyledAssetDetailsManagerInfoAddress
        href={`https://ropsten.etherscan.io/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {addressShortened}
      </StyledAssetDetailsManagerInfoAddress>
      <StyledAssetDetailsManagerInfoDocuments>
        Supporting documents
      </StyledAssetDetailsManagerInfoDocuments>
      {getFilesToRender(files)}
    </div>
    <StyledAssetDetailsManagerInfoPercentages>
      <ValueDisplay
        text="Total Management Fee"
        icon={<Sliders />}
        value={`${managerPercentage * 100}%`}
        style={{
          margin: '5px 0',
        }}
        hasSeparator
        hasIcon
        isBlue
      />
      <ValueDisplay
        text="Asset Collateral"
        icon={<MyBitLogo />}
        value={`${collateralPercentage}%`}
        style={{
          margin: '5px 0',
        }}
        hasSeparator
        hasIcon
        isBlue
      />
    </StyledAssetDetailsManagerInfoPercentages>
  </StyledAssetDetailsMananagerInfo>
);

export default React.memo(AssetDetailsManagerInfo);
