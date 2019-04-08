import styled from 'styled-components';

const TokenSelectorAmount = styled.div`
  color: ${({theme}) => theme.colors.black3};
  text-align: center;
  span{
    font-weight: 600;
    margin-left: 5px;
    color: ${({theme}) => theme.colors.grayBase};
  }
}`

export default TokenSelectorAmount;
