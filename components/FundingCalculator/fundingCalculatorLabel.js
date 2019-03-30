import styled, { css } from 'styled-components';

const FundingCalculatorLabel = styled.div`
  font-size: 16px;
  line-height: 22px;
  display: inline-block;
  color: ${({theme}) => theme.colors.black3};
  text-align: center;
  margin-bottom: 10px;

  ${({theme}) => theme.tablet`
    font-size: 18px;
    line-height: 24px;
    text-align: auto;
    padding-right: 10px;
    margin-bottom: auto;
    :after{
      content: ':';
      position: relative;
      display: inline-block;
    };

  `}
}`

export default FundingCalculatorLabel;
