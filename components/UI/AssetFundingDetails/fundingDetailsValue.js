import styled, { css } from 'styled-components';

const FundingDetailsValue = styled.span`
  font-size: 16px;
  color: ${({theme}) => theme.colors.black};
  position: relative;
  top: 6px;
  ${props => props.funded && css`
    color: #52C41A;
  `}
}`

export default FundingDetailsValue;
