import styled from 'styled-components';

const AppHeaderAddress = styled.div`
  display: none;
  position: absolute;
  right: 0px;
  top: 0px;

  ${({theme}) => theme.tablet`
    display: block;
  `}
}`

export default AppHeaderAddress;
