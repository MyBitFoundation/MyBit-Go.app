import styled, { css } from 'styled-components';

const StyledPortfolioPageValueDisplays = styled.div`

  @media(min-width: 768px){
    margin: 0px 15px;
  }

  div {
    margin-right: 10px;
    display: inline-flex;
  }

  @media(max-width: 1250px){
    .PortfolioPage__ValueDisplay--is-managementProfit{
      display: block;
      margin-top: 10px;
    }
  }

  @media(max-width: 1023px){
    .PortfolioPage__ValueDisplay--is-totalRevenue{
      display: block;
      margin-top: 10px;
    }
  }

  @media(max-width: 700px){
    .PortfolioPage__ValueDisplay--is-portfolioRevenue{
      display: block;
      margin-top: 10px;
    }
  }
}`

export default StyledPortfolioPageValueDisplays;
