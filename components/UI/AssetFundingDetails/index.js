import styled, { css } from 'styled-components';
import { memo } from 'react';
import Item from './Item';

const FundingDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-row-gap: 20px;
  ${({theme}) => theme.mobileL`
    grid-template-columns: auto auto auto;
  `}
`

const AssetFundingDetails = memo(({
  fundingGoal,
  fundingProgress,
  funded,
  numberOfInvestors,
  cryptoPayout,
  cryptoPurchase,
}) => (
  <FundingDetailsWrapper>
    <Item
      funded={funded}
      title="Funds raised"
      value={fundingProgress}
    />
    <Item
      title="Funding goal"
      value={fundingGoal}
    />
    <Item
      title="Investors"
      value={numberOfInvestors}
    />
    <Item
      title="Payout"
      value={cryptoPayout ? 'Crypto' : 'Fiat'}
    />
    <Item
      title="Acquired"
      value={cryptoPurchase ? 'Via Crypto' : 'Via Fiat'}
    />
  </FundingDetailsWrapper>
))

export default AssetFundingDetails;
