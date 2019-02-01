import styled from 'styled-components';

const StyledCategoryFilterMobile = styled.div`
  display: none;
  @media (max-width: ${props => props.breakpoints.categoriesFilterTablet}){
    display: block;
  }

  @media(max-width: ${props => props.breakpoints.categoriesFilterMobile}){
    display: flex;
    width: 100%;
    justify-content: space-between;

    button{
      width: 60%;
    }

    button:nth-child(2){
      margin-right: 20px;
    }
  }
}`

export default StyledCategoryFilterMobile;
