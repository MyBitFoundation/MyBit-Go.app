import styled from 'styled-components';

const CategoryFilterWrapper = styled.div`
  position: relative;
  width: 100%;

  button{
    margin-bottom: 10px;
    width: auto;
  }

  ${({ theme }) => theme.tablet`
    margin-left: 10px;
 `}

 ${({ theme }) => theme.categoriesFilterTablet`
    width: max-content;

    button{
      margin-right: 5px;
      width: 100px;
      @media (min-width: 1230px) {
        width: 140px;
      }
    }
 `}
}`

export default CategoryFilterWrapper;
