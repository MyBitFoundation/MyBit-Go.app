import styled, { css } from 'styled-components';

const BalanceLabel = styled.span`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  text-align: right;
  letter-spacing: 1px;
  ${props => !props.isMobile && css`
    color: #FFFFFF;
    opacity: 0.5;
  `}
}`

export default BalanceLabel;
