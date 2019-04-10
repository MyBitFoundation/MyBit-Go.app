import styled from 'styled-components';

const CategoryFilterDesktop = styled.div`
  display: none;

  ${({theme}) => theme.categoriesFilterTablet`
    display: block;
  `}
}`

export default CategoryFilterDesktop;
