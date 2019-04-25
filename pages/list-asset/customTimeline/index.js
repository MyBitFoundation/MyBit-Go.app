import React from 'react';
import { Timeline } from 'antd';
import styled, { css } from 'styled-components';
import CustomTimelineItem from './customTimelineItem';

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

const CustomTimeline = ({
  step,
  formData,
}) => {
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
        content={step > 1 ? `Category: Crypto\nBitcoin ATM, Value: $5000` : "Different assets will be available to fund depending on where you are"}
        step={2}
        currentStep={step}
      />
      <CustomTimelineItem
        title="Asset Location"
        content="Enter a location. For investor, it's important they know exactly where the asset is based."
        step={3}
        currentStep={step}
      />
      <CustomTimelineItem
        title="Supporting Documents"
        content="Confirm you have the necessary legan and property rights to install the asset."
        step={4}
        currentStep={step}
      />
      <CustomTimelineItem
        title="Management Fee"
        content="How much will it cost for you to operate the asset?"
        step={5}
        currentStep={step}
      />
      <CustomTimelineItem
        title="Asset Collateral"
        content="You'll need some MyBit tokens to put down as collateral for your asset and investors."
        step={6}
        currentStep={step}
      />
      <CustomTimelineItem
        title="Confirm with MetaMask"
        content="Check if everything is right, confirm and deposit collateral with MetaMask."
        step={7}
        currentStep={step}
      />
    </CustomTimelineWrapper>
  )
}

export default CustomTimeline;
