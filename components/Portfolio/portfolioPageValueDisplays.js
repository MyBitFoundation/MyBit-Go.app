import styled, { css } from 'styled-components';

const PortfolioPageValueDisplays = styled.div`

  ${({theme}) => theme.tablet`
    margin: 0px 15px;
  `}

  .PortfolioPage__ValueDisplay--is-unrealisedProfit, .PortfolioPage__ValueDisplay--is-realisedProfit {
    margin-top: 10px;
    display: block;
  }

  @media(min-width: 950px){
    .PortfolioPage__ValueDisplay--is-unrealisedProfit, .PortfolioPage__ValueDisplay--is-valueOrRevenue{
      display: inline-flex;
      margin-top: 0px;
      margin-right: 10px;
    }
  }

  @media(min-width: 1250px){
    .PortfolioPage__ValueDisplay--is-realisedProfit{
      display: inline-flex;
      margin-top: 0px;
      margin-right: 10px;
    }
  }
}`

export default PortfolioPageValueDisplays;
