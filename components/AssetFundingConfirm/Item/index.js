import { memo } from 'react';
import styled, { css } from 'styled-components';
import {
  formatMonetaryValue,
} from 'utils/helpers';
import {
  DEFAULT_TOKEN,
  DEFAULT_TOKEN_MAX_DECIMALS,
} from 'constants/app';

const AssetFundingConfirmItem = styled.div`
  display: flex;
  justify-content: space-between;
}`

const AssetFundingConfirmItemName = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${({theme}) => theme.colors.black3};
}`

export const AssetFundingConfirmItemValue = styled.div`
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

const Item = memo(({
  title,
  firstValue,
  secondValue,
  selectedToken,
  loading,
}) => (
  <AssetFundingConfirmItem>
    <AssetFundingConfirmItemName>
      {title}
    </AssetFundingConfirmItemName>
    <AssetFundingConfirmItemValue>
      <p>{firstValue}</p>
      <p>{!loading && secondValue}</p>
    </AssetFundingConfirmItemValue>
  </AssetFundingConfirmItem>
))

export default Item;
