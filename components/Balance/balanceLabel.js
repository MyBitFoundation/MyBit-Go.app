import styled, { css } from 'styled-components';

const BalanceLabel = styled.span`
  font-size: 14px;
  text-align: right;
  font-weight: 500;

  ${props => !props.isMobile && css`
    color: #FFFFFF;
    opacity: 0.5;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 14px;
  `}
}`

export default BalanceLabel;
