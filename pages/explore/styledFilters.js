import styled from 'styled-components';

const StyledFilters = styled.div`
  position: absolute;
  z-index: 1;

  @media(max-width: ${props => props.breakpoints.categoriesFilterMobile}){
    width: 100%;
  }
}`

export default StyledFilters;
