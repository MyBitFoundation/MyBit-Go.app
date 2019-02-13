import styled from 'styled-components';

const StyledCategoryFilterDesktop = styled.div`
  display: none;

  ${({theme}) => theme.categoriesFilterTablet`
    display: block;
  `}
}`

export default StyledCategoryFilterDesktop;
