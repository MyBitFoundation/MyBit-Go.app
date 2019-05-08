import styled from 'styled-components';

const TokenBalanceItemCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.color};
  display: inline-block;
}`

export default TokenBalanceItemCircle;
