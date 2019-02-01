import styled from 'styled-components';

const StyledCategoryFilter = styled.div`
  width: max-content;
  position: relative;

  @media(min-width: 768px){
    margin-left: 10px;
  }

  button{
    margin-right: 5px;
    width: 100px;
    @media (min-width: 1230px) {
      width: 140px;
    }
  }

  @media(max-width: 1200px){
    position: relative;
  }

  @media(max-width: ${props => props.breakpoints.categoriesFilterTablet}){
    button{
      margin-right: 10px;
      margin-bottom: 10px;
      width: auto;
    }
  }

  @media(max-width: ${props => props.breakpoints.categoriesFilterMobile}){
    width: 100%;
  }
}`

export default StyledCategoryFilter;
