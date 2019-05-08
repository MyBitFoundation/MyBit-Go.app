import styled, { css } from 'styled-components';

const AssetPortfolioManagedSection = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
  margin-bottom: 5px;
  position: relative;

  ${props => props.hasExtraMarginBottom && css`
    margin-bottom: 30px;
  `}

  @media(max-width: 320px){
    font-size: 14px;
  }
}`

export default AssetPortfolioManagedSection;
