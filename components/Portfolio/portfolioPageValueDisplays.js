import styled, { css } from 'styled-components';

const PortfolioPageValueDisplays = styled.div`

  ${({theme}) => theme.tablet`
    margin: 0px 15px;
  `}

  .PortfolioPage__ValueDisplay--is-2, .PortfolioPage__ValueDisplay--is-3 {
    margin-top: 10px;
    display: block;
  }

  @media(min-width: 950px){
    .PortfolioPage__ValueDisplay--is-2, .PortfolioPage__ValueDisplay--is-1{
      display: inline-flex;
      margin-top: 0px;
      margin-right: 10px;
    }
  }

  @media(min-width: 1250px){
    .PortfolioPage__ValueDisplay--is-3{
      display: inline-flex;
      margin-top: 0px;
      margin-right: 10px;
    }
  }
}`

export default PortfolioPageValueDisplays;
