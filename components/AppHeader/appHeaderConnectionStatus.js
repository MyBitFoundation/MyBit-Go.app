import styled from 'styled-components';

const AppHeaderConnectionStatus = styled.div`
  display: none;
  ${({theme}) => theme.tablet`
    display: block;
  `}
}`

export default AppHeaderConnectionStatus;
