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
      hasError={!enoughFunds && !hovering}
    >
      <p>{balance}</p>
      {!hovering && (
        <p>{enoughFunds ? balanceInDai : `Insufficient ${balanceInDai}`}</p>
      )}
      {hovering && (
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

export default TokenBalanceItem;
