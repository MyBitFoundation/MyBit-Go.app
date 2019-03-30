import styled, { css } from 'styled-components';

const FundingCalculatorValue = styled.span`
  display: block;
  color: ${({theme}) => theme.colors.black};
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;

  ${({theme}) => theme.tablet`
    display: inline-block;
    text-align: auto;
  `}
}`

export default FundingCalculatorValue;
