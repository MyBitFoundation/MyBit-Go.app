import styled, { css } from 'styled-components';

const StyledAssetPortfolioInvestmentValue = styled.span`
  font-weight: 500;
  ${props => props.isGreen && css`
    color: #2db84b;
  `}

  ${props => props.isGray && css`
    color: rgba(0,0,0,.25);
  `}
}`

export default StyledAssetPortfolioInvestmentValue;
