import React from 'react';
import { Timeline } from 'antd';
import styled, { css } from 'styled-components';
import { formatMonetaryValue } from 'utils/helpers';
import { PLATFORM_TOKEN } from 'constants/app';
import { omit } from 'lodash';
import CustomTimelineItem from './customTimelineItem';

const CustomTimelineWrapper = styled(props => (
  <Timeline {...omit(props, CustomTimelineWrapper.OmitProps)} />
))`
  .ant-timeline-item-content {
    margin: 0 0 0 22px;
    top: -4px;
  }

  .ant-timeline-item-head-custom {
    padding: 0px;
  }

  .ant-timeline-item:last-child {
    .ant-timeline-item-tail {
      display: none;
    }
  }

  ${props => props.listedAssetId
    && css`
      li {
        cursor: default;
      }
    `}
`;

CustomTimelineWrapper.OmitProps = ['listedAssetId'];

const CustomTimeline = React.memo(({
  step,
  formData,
  goToStep,
  listedAssetId,
  dev,
  readToS,
  isUserListingAsset,
  tokenWithSufficientBalance,
  metamaskErrors,
}) => {
  const {
    category,
    asset,
    assetValue,
    assetAddress1,
    assetAddress2,
    userCountry,
    assetCity,
    assetPostalCode,
    fileList,
    managementFee,
    collateralPercentage,
    collateralInPlatformToken,
    collateralInSelectedToken,
    selectedToken,
  } = formData;
  let maxStep = 1;
  if (isUserListingAsset || tokenWithSufficientBalance) {
    maxStep = 9;
  } else if (managementFee > 0) {
    maxStep = 8;
  } else if (userCountry && assetCity) {
    maxStep = 5;
  } else if (assetValue && !metamaskErrors) {
    maxStep = 3;
  }

  return (
    <CustomTimelineWrapper
      listedAssetId={listedAssetId}
    >
      <CustomTimelineItem
        title="Asset"
        content={step > 1 ? (
          <React.Fragment>
            <span>
Category:
              {' '}
              {category}
            </span>
            <br />
            <span>
              {asset}
, Value:
              {' '}
              {formatMonetaryValue(assetValue)}
            </span>
          </React.Fragment>
        ) : 'Pick the asset you will be managing.'}
        step={1}
        currentStep={step - 1}
        goToStep={maxStep > 1 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="General Description"
        content={step > 2 ? 'Provided information about the asset, financial aspects and associated risks.'
          : 'Tell the community about the project. Why do you think it will work? Provide financial details and the associated risks.'}
        step={3}
        currentStep={step}
        goToStep={maxStep > 2 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Asset Location"
        content={step > 3 ? (
          <React.Fragment>
            <div>
              {userCountry}
,
              {' '}
              {assetCity}
            </div>
            <div>{`${assetAddress1}${assetAddress2 ? `, ${assetAddress2}` : ''}${assetPostalCode ? `, ${assetPostalCode}` : ''}`}</div>
          </React.Fragment>
        ) : "Enter a location. For investor, it's important they know exactly where the asset is based."}
        step={4}
        currentStep={step}
        goToStep={maxStep > 3 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Cover Picture"
        content={step > 4 ? (
          <div>
            {fileList.length === 0 ? 'No files have been uploaded.' : fileList.map(file => <div>{file.name}</div>)}
          </div>
        ) : 'Upload a cover picture of the asset.'}
        step={5}
        currentStep={step}
        goToStep={maxStep > 4 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Supporting Documents"
        content={step > 5 ? (
          <div>
            {fileList.length === 0 ? 'No files have been uploaded.' : fileList.map(file => <div>{file.name}</div>)}
          </div>
        ) : 'Confirm you have the necessary legal and property rights to install the asset.'}
        step={6}
        currentStep={step}
        goToStep={maxStep > 5 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Management Fee"
        content={step > 6 ? `${managementFee}%` : 'How much will it cost for you to operate the asset?'}
        step={7}
        currentStep={step}
        goToStep={maxStep > 6 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Asset Collateral"
        content={step > 7
          ? collateralPercentage === 0 ? 'No collateral' : (
            <div>
              <div>{`${collateralPercentage}% of the asset = ${formatMonetaryValue(collateralInPlatformToken, PLATFORM_TOKEN)}`}</div>
              <div>
Currency you pay in:
                {' '}
                {formatMonetaryValue(collateralInSelectedToken, selectedToken)}
              </div>
            </div>
          )
          : "You'll need some MyBit tokens to put down as collateral for your asset and investors."}
        step={8}
        currentStep={step}
        goToStep={maxStep > 7 ? goToStep : undefined}
      />
      {!readToS && (
        <CustomTimelineItem
          title="Terms and Conditions"
          content="Read the risks and understand the high degree of risk associated with MyBit"
          step={9}
          currentStep={step}
          goToStep={maxStep > 8 ? goToStep : undefined}
        />
      )}
      <CustomTimelineItem
        title="Confirm with MetaMask"
        content={listedAssetId ? 'Asset Listed successfully' : 'Check if everything is right, confirm and deposit collateral with MetaMask.'}
        step={!readToS ? 10 : 9}
        currentStep={listedAssetId ? (!readToS ? 10 : 9) : step}
        goToStep={maxStep > (!readToS ? 10 : 9) ? goToStep : undefined}
      />
    </CustomTimelineWrapper>
  );
});

export default CustomTimeline;
