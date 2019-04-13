import ColorHash from 'color-hash';
import TokenBalanceItemWrapper from './tokenBalanceItemWrapper';
import TokenBalanceItemCircle from './tokenBalanceItemCircle';
import TokenBalanceItemName from './tokenBalanceItemName';
import TokenBalanceItemValue from './tokenBalanceItemValue';
import {
  ExternalLinks,
} from 'constants/links';
const colorHash = new ColorHash({lightness: 0.5});

const TokenBalanceItem = ({
  name,
  balance,
  balanceInDai,
  enoughFunds,
  hovering,
  tokenToConvertFrom,
}) => {
  const showKyber = hovering && tokenToConvertFrom;
  return (
    <TokenBalanceItemWrapper
      enoughFunds={enoughFunds}
    >
      <div style={{display: 'flex'}}>
        <TokenBalanceItemCircle color={colorHash.hex(name)}/>
        <TokenBalanceItemName>
          {name}
        </TokenBalanceItemName>
      </div>
      <TokenBalanceItemValue
        hasError={!showKyber && !enoughFunds}
      >
        <p>{balance}</p>
        {!showKyber && (
          <p>{enoughFunds ? balanceInDai : `Insufficient ${balanceInDai}`}</p>
        )}
        {showKyber && (
          <p>Get more at
            <a
              href={ExternalLinks.kyberSwapRopsten(tokenToConvertFrom, name.toLowerCase())}
              target="_blank"
              rel="noopener noreferrer"
            >
            {' '}Kyber
            </a>
          </p>
        )}
      </TokenBalanceItemValue>
    </TokenBalanceItemWrapper>
  )
}

export default TokenBalanceItem;
