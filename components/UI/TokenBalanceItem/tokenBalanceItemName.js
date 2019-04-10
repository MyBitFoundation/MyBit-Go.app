import styled from 'styled-components';

const TokenBalanceItemName = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.black2};
  position: relative;
  top: -6px;
  margin-left: 5px;
}`

export default TokenBalanceItemName;
