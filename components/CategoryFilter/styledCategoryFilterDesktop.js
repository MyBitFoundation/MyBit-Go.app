import styled from 'styled-components';

const StyledCategoryFilterDesktop = styled.div`
  @media (max-width: ${props => props.breakpoints.categoriesFilterTablet}){
    display: none;
  }
}`

export default StyledCategoryFilterDesktop;
