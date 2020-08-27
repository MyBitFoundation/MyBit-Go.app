import React from 'react';
import { Timeline } from 'antd';
import styled, { css } from 'styled-components';
import { formatMonetaryValue } from 'utils/helpers';
import { getPlatformToken } from 'constants/app';
import { omit } from 'lodash';
import CustomTimelineItem from './customTimelineItem';
import { useMetamaskContext } from 'components/MetamaskContext';

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
  readToS,
  isUserListingAsset,
  tokenWithSufficientBalance,
  metamaskErrors,
}) => {
  const {
    category,
    asset,
    assetValue,
    userCountry,
    fileList,
    managementFee,
    collateralPercentage,
    collateralInPlatformToken,
    paymentInSelectedToken,
    selectedToken,
    userCity,
    about,
    financials,
    risks,
    coverPicture,
  } = formData;
  let maxStep = 8;

  if (!asset || !assetValue || !userCountry || !userCity) {
    maxStep = 1;
  } else if (!about || !financials || !risks) {
    maxStep = 2;
  } else if (!coverPicture) {
    maxStep = 3;
  } else if (!managementFee) {
    maxStep = 5;
  } else if (!tokenWithSufficientBalance) {
    maxStep = 6;
  }

  const { network } = useMetamaskContext();

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
        currentStep={step}
        goToStep={maxStep > 1 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="General Description"
        content={step > 2 ? 'Provided information about the asset, financial aspects and associated risks.'
          : 'Tell the community about the project. Why do you think it will work? Provide financial details and the associated risks.'}
        step={2}
        currentStep={step}
        goToStep={maxStep > 2 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Cover Picture"
        content={step > 3 ? (
          <div>
            Selected
          </div>
        ) : 'Upload a cover picture of the asset.'}
        step={3}
        currentStep={step}
        goToStep={maxStep > 3 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Supporting Documents"
        content={step > 4 ? (
          <div>
            {fileList.length === 0 ? 'No files have been uploaded.' : fileList.map(file => <div>{file.name}</div>)}
          </div>
        ) : 'Confirm you have the necessary legal and property rights to install the asset.'}
        step={4}
        currentStep={step}
        goToStep={maxStep > 4 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Management Fee"
        content={step > 5 ? `${managementFee}%` : 'How much will it cost for you to operate the asset?'}
        step={5}
        currentStep={step}
        goToStep={maxStep > 5 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Asset Collateral"
        content={step > 6
          ? collateralPercentage === 0 ? 'No collateral' : (
            <div>
              <div>{`${collateralPercentage}% of the asset = ${formatMonetaryValue(collateralInPlatformToken, getPlatformToken(network))}`}</div>
              <div>
Currency you pay in:
                {' '}
                {formatMonetaryValue(paymentInSelectedToken, selectedToken)}
              </div>
            </div>
          )
          : "You'll need some MyBit tokens to put down as collateral for your asset and investors."}
        step={6}
        currentStep={step}
        goToStep={maxStep > 6 ? goToStep : undefined}
      />
      {!readToS && (
        <CustomTimelineItem
          title="Terms and Conditions"
          content="Read the risks and understand the high degree of risk associated with MyBit"
          step={7}
          currentStep={step}
          goToStep={maxStep > 7 ? goToStep : undefined}
        />
      )}
      <CustomTimelineItem
        title="Confirm with MetaMask"
        content={listedAssetId ? 'Asset Listed successfully' : 'Check if everything is right, confirm and deposit collateral with MetaMask.'}
        step={!readToS ? 8 : 7}
        currentStep={listedAssetId ? (!readToS ? 8 : 7) : step}
        goToStep={maxStep > (!readToS ? 8 : 7) ? goToStep : undefined}
      />
    </CustomTimelineWrapper>
  );
});

export default CustomTimeline;
