import styled from 'styled-components';

const AppHeaderHamburguerButton = styled.div`
  margin-right: 10px;
  margin-top: 10px;
  padding: 10px;

  :hover{
    cursor: pointer;
  }

  ${({theme}) => theme.tablet`
    display: none;
  `}
}`

export default AppHeaderHamburguerButton;
