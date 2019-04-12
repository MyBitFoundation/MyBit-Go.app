import styled, { css } from 'styled-components';

const AssetPortfolioInvestmentSection = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
  margin-bottom: 5px;

  ${props => props.extraMarginBotton && css`
    margin-bottom: 30px;
  `}

  ${props => props.onlyTwoItems && css`
    margin-bottom: 60px;
  `}

  ${props => props.hasNoMarginBottom && css`
    margin-bottom: 0px;
  `}

}`

export default AssetPortfolioInvestmentSection;
