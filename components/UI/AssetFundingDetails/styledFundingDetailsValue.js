import styled, { css } from 'styled-components';

const StyledFundingDetailsValue = styled.b`
  font-size: 18px;
  color: rgba(0,0,0,.65);
  position: relative;
  top: 6px;

  ${props => props.funded && css`
    color: #52C41A;
  `}
}`

export default StyledFundingDetailsValue;
