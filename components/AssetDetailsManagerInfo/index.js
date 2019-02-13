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

const AssetDetailsManagetInfo = ({
  address,
  addressShortened,
  managerPercentage,
  collateralPercentage,
  filesToRender,
  image,
}) => (
  <StyledAssetDetailsMananagerInfo>
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
      {filesToRender}
    </div>
    <StyledAssetDetailsManagerInfoPercentages>
      <ValueDisplay
        text="Total Management Fee"
        icon={<Sliders />}
        value={`${managerPercentage}%`}
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

export default AssetDetailsManagetInfo;
