import styled from 'styled-components';

const AppHeaderBalance = styled.div`
  justify-content: center;
  align-items: center;
  height: 100%;
  display: none;

  ${({theme}) => theme.tablet`
    display: flex;
  `}
}`

export default AppHeaderBalance;
