import styled, { css } from 'styled-components';

const BalanceAmount = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  ${props => !props.isMobile && css`
    color: #FFFFFF;
  `}
}`

export default BalanceAmount;
