import ColorHash from 'color-hash';
import TokenBalanceItemWrapper from './tokenBalanceItemWrapper';
import TokenBalanceItemCircle from './tokenBalanceItemCircle';
import TokenBalanceItemName from './tokenBalanceItemName';
import TokenBalanceItemValue from './tokenBalanceItemValue';

const colorHash = new ColorHash({lightness: 0.5});

const TokenBalanceItem = ({
  name,
  balance,
  balanceInDai,
  enoughFunds,
}) => (
  <TokenBalanceItemWrapper
    enoughFunds={enoughFunds}
  >
    <div>
      <TokenBalanceItemCircle color={colorHash.hex(name)}/>
      <TokenBalanceItemName>
        {name}
      </TokenBalanceItemName>
    </div>
    <TokenBalanceItemValue
      enoughFunds={enoughFunds}
    >
      <p>{balance}</p>
      <p>{enoughFunds ? balanceInDai : `Insufficient ${balanceInDai}`}</p>
    </TokenBalanceItemValue>
  </TokenBalanceItemWrapper>
)

export default TokenBalanceItem;
