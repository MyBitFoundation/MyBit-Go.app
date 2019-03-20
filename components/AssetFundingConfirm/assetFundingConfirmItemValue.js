import styled, { css } from 'styled-components';

const AssetFundingConfirmItemValue = styled.div`
  p:nth-child(1){
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    color: ${({theme}) => theme.colors.black};
    margin: 0px;

    ${props => props.isLarge && css`
      font-size: 21px;
    `}
  }

  p:nth-child(2){
    font-size: 14px;
    line-height: 18px;
    text-align: right;
    color: ${({theme}) => theme.colors.black3};
    margin: 0px;
  }
}`

export default AssetFundingConfirmItemValue;
