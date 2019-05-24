import React from 'react';
import { Divider } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import {
  Tooltip,
} from 'antd';
import Civic from 'static/civic_v2.svg';

const TooltipWrapper = styled(Tooltip)`
  .svg{
    width: 30px;
    height: 30px;
  }
`

const MainWrapper = styled.div`
`

const GlobalStyle = createGlobalStyle`
  .AssetManagerTooltip .ant-tooltip-inner{
    max-width: unset !important;
    width: 460px !important;
    height: 130px !important;
    background-color: rgba(17, 17, 17, 0.95) !important;
    color: #FFFFFF !important;
    font-size: 14px !important;
    line-height: 22px !important;
  }

  .AssetManagerTooltip .ant-tooltip-arrow{
    display: none;
  }

  .AssetManagerTooltip svg{
    width: 18px;
    height: 18px;
  }
`

import CheckMark from 'static/ic_unreal.svg';

const CivicVerificationWrapper = styled.span`
  align-items: center;
  display: inline-flex;
`

const CivicVerificationText = styled

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

const AssetManagerTooltip = ({
  children,
  numberOfAssets,
  startDate,
  totalRevenue,
}) => {

  return (
    <span>
    <GlobalStyle />
    <TooltipWrapper
      overlayClassName="AssetManagerTooltip"
      arrowPointAtCenter
      placement="bottom"
      destroyTooltipOnHide
      title={
        <MainWrapper>
          <PoweredBy>Identity proved by <Civic /> Civic</PoweredBy>
          <CivicVerification text="Email Verified" />
          <CivicVerification text="ID Verified" />
          <CivicVerification text="Phone Verified" />
          <Divider style={{
            margin: '5px 0px',
            backgroundColor: '#D9D9D9',
            opacity: 0.2,

          }}/>
          <div style={{display: 'flex'}}>
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
          </div>
        </MainWrapper>
      }
    >
      {children}
    </TooltipWrapper>
    </span>
  )
};

export default AssetManagerTooltip;
