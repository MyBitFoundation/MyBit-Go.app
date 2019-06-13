import React from 'react';
import Link from 'next/link'
import AssetDetailsMananagerInfo from './assetDetailsMananagerInfo';
import AssetDetailsManagerInfoTitle from './assetDetailsManagerInfoTitle';
import AssetDetailsManagerInfoAddress from './assetDetailsManagerInfoAddress';
import AssetDetailsManagerInfoPercentages from './assetDetailsManagerInfoPercentages';
import ValueDisplay from 'ui/ValueDisplay';
import MyBitLogo from 'static/mybit-blue.svg';
import Sliders from 'static/sliders.svg';
import { InternalLinks } from 'constants/links';
import { PLATFORM_TOKEN } from 'constants/app';
import AssetManagerProfile from 'ui/AssetManagerProfile';
import {
  formatMonetaryValue,
} from 'utils/helpers';
import Theming from 'components/Theme/theming';
import Divider from 'ui/Divider';

const Colors = Theming.colors;

const AssetDetailsManagerInfo = ({
  address,
  managerPercentage,
  collateralPercentage,
  image,
  style,
  assetManager,
}) => (
  <AssetDetailsMananagerInfo
    style={style}
  >
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <AssetDetailsManagerInfoTitle>
          Asset manager
        </AssetDetailsManagerInfoTitle>
        <Link
          as={`/asset-managers/${address}`}
          href={`/asset-managers?id=${address}`}
        >
          <a style={{fontSize: '16px'}}>Full Info</a>
        </Link>
      </div>
      <AssetDetailsManagerInfoAddress
        href={`https://ropsten.etherscan.io/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {address}
      </AssetDetailsManagerInfoAddress>
      <Divider />
     <AssetManagerProfile
        {...assetManager}
        totalRevenue={formatMonetaryValue(assetManager.totalRevenue)}
        collateralLocked={formatMonetaryValue(assetManager.collateralLocked, PLATFORM_TOKEN)}
        styling={{
          labelColor: Colors.grayBase,
          valueColor: Colors.black,
        }}
        showCollateral={false}
      />
    </div>
    <Divider />
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
        hasShadow
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
        hasShadow
      />
    </AssetDetailsManagerInfoPercentages>
  </AssetDetailsMananagerInfo>
);

export default React.memo(AssetDetailsManagerInfo);
