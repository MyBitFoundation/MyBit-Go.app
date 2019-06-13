import React from 'react';
import AssetDetailsMananagerInfo from './assetDetailsMananagerInfo';
import AssetDetailsManagerInfoTitle from './assetDetailsManagerInfoTitle';
import AssetDetailsManagerInfoCivic from './assetDetailsManagerInfoCivic';
import AssetDetailsManagerInfoAddress from './assetDetailsManagerInfoAddress';
import AssetDetailsManagerInfoPercentages from './assetDetailsManagerInfoPercentages';
import ThreeBoxProfile from 'components/ThreeBoxProfile';
import ValueDisplay from 'ui/ValueDisplay';
import MyBitLogo from 'static/mybit-blue.svg';
import Sliders from 'static/sliders.svg';
import {
  InternalLinks,
} from 'constants/links';

const AssetDetailsManagerInfo = ({
  address,
  managerPercentage,
  collateralPercentage,
  style,
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
        <ThreeBoxProfile address={address} name />
      </AssetDetailsManagerInfoAddress>
    </div>
    <AssetDetailsManagerInfoPercentages>
      <ValueDisplay
        text="Total Management Fee"
        icon={<Sliders />}
        value={`${parseFloat((managerPercentage * 100).toFixed(2))}%`}
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
