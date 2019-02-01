import styled, { css } from 'styled-components';

const StyledAssetCalculatorLabel = styled.p`
  font-size: 18px;
  display: inline-block;
  padding-right: 10px;
  color: #383838;

  ${props => props.paddedTop && css`
      padding-top: 20px;

      ${props => props.ended && css`
        padding-top: 0px;
      `}
  `}
}`

export default StyledAssetCalculatorLabel;
