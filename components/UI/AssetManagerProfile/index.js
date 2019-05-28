import React from 'react';
import styled from 'styled-components';
import Civic from 'static/civic_v2.svg';
import CheckMark from 'static/ic_unreal.svg';
import Divider from 'ui/Divider';

const AssetManagerProfileDataWrapper = styled.div`
  ${({theme}) => theme.tablet`
    display: flex;
  `}
`

const PoweredBy = styled.p`
  display: flex;
  align-items: center;

  svg{
    margin: 0 5px;
  }
`

const CivicVerificationWrapper = styled.span`
  align-items: center;
  display: inline-flex;

  .svg{
    width: 30px;
    height: 30px;
  }
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
    color: ${props => props.styling ? props.styling.labelColor : '#FFFFFF'};
    opacity: 0.8;
    margin-right: 20px;
    margin-bottom: 5px;
  }

  div {
    color: ${props => props.styling ? props.styling.valueColor : 'inherit'};
  }
`

const Data = ({
  text,
  value,
  styling,
}) => (
  <DataWrapper styling={styling}>
    <p>{text}</p>
    <div>{value}</div>
  </DataWrapper>
);

const AssetManagerProfile = ({
  address,
  totalAssets,
  totalRevenue,
  startDate,
  styling,
}) => {
  return (
    <div>
      <PoweredBy>Identity proved by <Civic /> Civic</PoweredBy>
      <CivicVerification text="Email Verified" />
      <CivicVerification text="ID Verified" />
      <CivicVerification text="Phone Verified" />
      <Divider styling={{
        ...styling.divider,
      }}/>
      <AssetManagerProfileDataWrapper>
        <Data
          text="Managing Assets"
          value={totalAssets}
          styling={styling}
        />
        <Data
          text="Started as Asset Manager"
          value={startDate.format('DD-MM-YY')}
          styling={styling}
        />
        <Data
          text="Total Revenue"
          value={totalRevenue}
          styling={styling}
        />
      </AssetManagerProfileDataWrapper>
    </div>
  )
}

export default AssetManagerProfile;
