import styled, { css } from 'styled-components';

const TokenBalanceItemWrapper = styled.div`
  width: 260px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;

  ${props => !props.enoughFunds && css`
    opacity: 0.7;
  `}
}`

export default TokenBalanceItemWrapper;
