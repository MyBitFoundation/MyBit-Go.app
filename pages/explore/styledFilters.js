import styled from 'styled-components';

const StyledFilters = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  ${({theme}) => theme.categoriesFilterMobile`
    width: auto;
  `}
}`

export default StyledFilters;
