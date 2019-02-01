import styled, { css } from 'styled-components';

const StyledAssetPortfolioManagedValue = styled.span`
  font-weight: 500;

  ${props => props.isGray && css`
    color: rgba(0,0,0,.25);
  `}

  ${props => props.isSmallMobile && css`
    @media(max-width: 768px){
      font-size: 14px;
    }
  `}
}`

export default StyledAssetPortfolioManagedValue;
