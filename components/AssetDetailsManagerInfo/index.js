import React from 'react';
import AssetDetailsMananagerInfo from './assetDetailsMananagerInfo';
import AssetDetailsManagerInfoTitle from './assetDetailsManagerInfoTitle';
import AssetDetailsManagerInfoCivic from './assetDetailsManagerInfoCivic';
import AssetDetailsManagerInfoAddress from './assetDetailsManagerInfoAddress';
import AssetDetailsManagerInfoDocuments from './assetDetailsManagerInfoDocuments';
import AssetDetailsManagerInfoPercentages from './assetDetailsManagerInfoPercentages';
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
  <AssetDetailsMananagerInfo
    style={style}
  >
    <div>
      <AssetDetailsManagerInfoTitle>
        Asset Manager
      </AssetDetailsManagerInfoTitle>
      <AssetDetailsManagerInfoCivic />
      <AssetDetailsManagerInfoAddress
        href={`https://ropsten.etherscan.io/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {addressShortened}
      </AssetDetailsManagerInfoAddress>
      <AssetDetailsManagerInfoDocuments>
        Supporting documents
      </AssetDetailsManagerInfoDocuments>
      {getFilesToRender(files)}
    </div>
    <AssetDetailsManagerInfoPercentages>
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
    </AssetDetailsManagerInfoPercentages>
  </AssetDetailsMananagerInfo>
);

export default React.memo(AssetDetailsManagerInfo);
