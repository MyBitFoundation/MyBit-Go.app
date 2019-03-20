import styled, { css } from 'styled-components';

const TokenBalanceItemValue = styled.div`
  p{
    margin: 0px;
  }
  p:nth-child(1){
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    color: ${({theme}) => theme.colors.black2};
  }
  p:nth-child(2){
    opacity: 0.8;
    font-size: 14px;
    line-height: 24px;
    text-align: right;
    color: ${({theme}) => theme.colors.black3};

    ${props => !props.enoughFunds && css`
      color: #EE0000;
    `}
  }
}`

export default TokenBalanceItemValue;
