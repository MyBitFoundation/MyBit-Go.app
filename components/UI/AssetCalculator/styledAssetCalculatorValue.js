import styled, { css } from 'styled-components';

const StyledAssetCalculatorValue = styled.b`
  color: rgba(0,0,0,.65);
  display: inline;

  ${props => props.paddedRight && css`
    padding-right: 10px;
  `}
}`

export default StyledAssetCalculatorValue;
