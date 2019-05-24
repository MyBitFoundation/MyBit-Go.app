import React from 'react';
import { Divider } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import {
  Tooltip,
} from 'antd';
import Civic from 'static/civic_v2.svg';
import CheckMark from 'static/ic_unreal.svg';

const AssetManagerTooltipWrapper = styled(Tooltip)`
  .svg{
    width: 30px;
    height: 30px;
  }
`

const GlobalStyle = createGlobalStyle`
  .AssetManagerTooltip .ant-tooltip-inner{
    max-width: unset !important;
    background-color: rgba(17, 17, 17, 0.95) !important;
    height: auto !important;
    width: auto !important;
    color: #FFFFFF !important;
    font-size: 14px !important;
    line-height: 22px !important

    ${({theme}) => theme.tablet`
      width: 460px !important;
      height: 130px !important;
    `}
  }

  .AssetManagerTooltip .ant-tooltip-arrow{
    display: none;
  }

  .AssetManagerTooltip svg{
    width: 18px;
    height: 18px;
  }
`

const CivicVerificationWrapper = styled.span`
  align-items: center;
  display: inline-flex;
`

const CivicVerification =  ({
  text,
}) => (
  <CivicVerificationWrapper>
    <CheckMark style={{marginRight: '10px'}}/>
    <span style={{marginRight: '20px'}}>{text}</span>
  </CivicVerificationWrapper>
);

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p:nth-child(1){
    color: #FFFFFF;
    opacity: 0.8;
    margin-right: 20px;
    margin-bottom: 5px;
  }
`

const Data = ({
  text,
  value,
}) => (
  <DataWrapper>
    <p>{text}</p>
    <div>{value}</div>
  </DataWrapper>
);

const PoweredBy = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  svg{
    margin: 0 5px;
  }
`

const AssetManagerTooltipDataWrapper = styled.div`
  ${({theme}) => theme.tablet`
    display: flex;
  `}
`

const AssetManagerTooltip = ({
  children,
  numberOfAssets,
  startDate,
  totalRevenue,
}) => {

  return (
    <span>
      <GlobalStyle />
      <AssetManagerTooltipWrapper
        overlayClassName="AssetManagerTooltip"
        arrowPointAtCenter
        placement="bottom"
        destroyTooltipOnHide
        title={
          <React.Fragment>
            <PoweredBy>Identity proved by <Civic /> Civic</PoweredBy>
            <CivicVerification text="Email Verified" />
            <CivicVerification text="ID Verified" />
            <CivicVerification text="Phone Verified" />
            <Divider style={{
              margin: '5px 0px',
              backgroundColor: '#D9D9D9',
              opacity: 0.2,

            }}/>
            <AssetManagerTooltipDataWrapper>
              <Data
                text="Managing Assets"
                value={numberOfAssets}
              />
              <Data
                text="Started as Asset Manager"
                value={startDate.format('DD-MM-YY')}
              />
              <Data
                text="Total Revenue"
                value={totalRevenue}
              />
            </AssetManagerTooltipDataWrapper>
          </React.Fragment>
        }
      >
        {children}
      </AssetManagerTooltipWrapper>
    </span>
  )
};

export default AssetManagerTooltip;
