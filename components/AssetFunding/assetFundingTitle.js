import React from 'react';
import styled from 'styled-components';
import CloseButton from 'public/close-button.svg';

const AssetFundingTitleWrapper = styled.div`
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  text-align: center;
  color: ${({theme}) => theme.colors.black};
  position: relative;
  padding: 0px 25px;

  ${({theme}) => theme.mobileL`
    padding: 0px;
  `}
}`

const CloseButtonWrapper = styled(CloseButton)`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(-100%,-50%);

  :hover{
    cursor: pointer;
  }
`

const AssetFundingTitle = ({
  text,
  onClick,
}) => (
  <AssetFundingTitleWrapper>
    {text}
    <CloseButtonWrapper onClick={onClick}/>
  </AssetFundingTitleWrapper>
);


export default AssetFundingTitle;
