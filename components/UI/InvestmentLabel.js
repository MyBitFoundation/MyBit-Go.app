import styled from 'styled-components';
import { formatMonetaryValue } from 'utils/helpers';

const InvestmentLabelWrapper = styled.div`
  background-color: rgba(0, 19, 88, 0.5);
  border-radius: 3px;
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 10px;

  span{
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
    padding: 3px 5px;
  }
`

const InvestmentLabel = ({
  value,
}) => (
  <InvestmentLabelWrapper>
    <span>Invested: {formatMonetaryValue(value)} </span>
  </InvestmentLabelWrapper>
)

export default InvestmentLabel;
