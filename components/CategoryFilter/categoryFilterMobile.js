import styled from 'styled-components';

const CategoryFilterMobile = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  button{
    width: 49%;
  }

  ${({theme}) => theme.categoriesFilterMobile`
    button:nth-child(1){
      margin-right: 10px;
    }
  `}

  ${({theme}) => theme.categoriesFilterTablet`
    display: none;
  `}
}`

export default CategoryFilterMobile;
