import React from 'react';
import { Timeline } from 'antd';
import styled, { css } from 'styled-components';
import CustomTimelineItem from './customTimelineItem';
import {
  formatMonetaryValue,
} from 'utils/helpers';
import {
  PLATFORM_TOKEN,
} from 'constants/app';

const CustomTimelineWrapper = styled(Timeline)`
  .ant-timeline-item-content{
    margin: 0 0 0 22px;
    top: -4px;
  }

  .ant-timeline-item-head-custom{
    padding: 0px;
  }

  .ant-timeline-item:last-child{
    .ant-timeline-item-tail{
      display: none;
    }
  }
`

const CustomTimeline = React.memo(({
  step,
  formData,
  goToStep,
  listedAssetId,
}) => {
  console.log(formData)
  const{
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
    collateralMyb,
    collateralSelectedToken,
    selectedToken,
  } = formData;
  let maxStep = 1;
  if(managementFee > 0){
    maxStep = 7;
  } else if(userCountry && assetCity){
    maxStep = 5;
  } else if(assetValue){
    maxStep = 3;
  }
  return (
    <CustomTimelineWrapper>
      <CustomTimelineItem
        title="Civic Account"
        content="dev@mybit.io"
        step={1}
        currentStep={step}
      />
      <CustomTimelineItem
        title="Asset"
        content={step > 1 ? (
          <React.Fragment>
            <span>Category: {category}</span>
            <br />
            <span>{asset}, Value: {formatMonetaryValue(assetValue)}</span>
          </React.Fragment>
        ) : "Different assets will be available to fund depending on where you are"}
        step={2}
        currentStep={step}
        goToStep={maxStep > 1 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Asset Location"
        content={step > 2 ? (
          <React.Fragment>
            <div>{userCountry}, {assetCity}</div>
            <div>{`${assetAddress1}${assetAddress2 ? `, ${assetAddress2}` : ''}${assetPostalCode ? `, ${assetPostalCode}` : ''}`}</div>
          </React.Fragment>
        ) : "Enter a location. For investor, it's important they know exactly where the asset is based."}
        step={3}
        currentStep={step}
        goToStep={maxStep > 2 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Supporting Documents"
        content={step > 3 ? (
          <div>
            {fileList.length === 0 ? 'No files have been uploaded.' : fileList.map(file => <div>{file.name}</div>)}
          </div>
        ) : "Confirm you have the necessary legal and property rights to install the asset."}
        step={4}
        currentStep={step}
        goToStep={maxStep > 3 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Management Fee"
        content={step > 4 ? `${managementFee}%` : "How much will it cost for you to operate the asset?"}
        step={5}
        currentStep={step}
        goToStep={maxStep > 4 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Asset Collateral"
        content={step > 5 ?
          collateralPercentage === 0 ? 'No collateral' : (
            <div>
              <div>{`${collateralPercentage}% of the asset = ${formatMonetaryValue(collateralMyb, PLATFORM_TOKEN)}`}</div>
              <div>Currency you pay in: {formatMonetaryValue(collateralSelectedToken, selectedToken)}</div>
            </div>
          )
         : "You'll need some MyBit tokens to put down as collateral for your asset and investors."}
        step={6}
        currentStep={step}
        goToStep={maxStep > 5 ? goToStep : undefined}
      />
      <CustomTimelineItem
        title="Confirm with MetaMask"
        content={listedAssetId ? "Asset Listed successfuly" : "Check if everything is right, confirm and deposit collateral with MetaMask."}
        step={7}
        currentStep={listedAssetId ? 7 : step}
        goToStep={maxStep > 6 ? goToStep : undefined}
      />
    </CustomTimelineWrapper>
  )
})

export default CustomTimeline;
