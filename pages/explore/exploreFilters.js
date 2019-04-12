import styled from 'styled-components';

const ExploreFilters = styled.div`
  position: relative;
  width: 100%;
  ${({theme}) => theme.categoriesFilterMobile`
    position: absolute;
    z-index: 1;
    width: auto;
  `}
}`

export default ExploreFilters;
