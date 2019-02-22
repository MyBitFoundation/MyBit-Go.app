import styled from 'styled-components';

const AppHeaderBancorWidget = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 305px;
  width: 100%;

  button{
    width: 140px;
    height: 43px;
    background-color: ${({theme}) => theme.buttons.primary.blue};
    color: white;
  }

  ${({theme}) => theme.tablet`
    display: flex;
  `}
}`

export default AppHeaderBancorWidget;
