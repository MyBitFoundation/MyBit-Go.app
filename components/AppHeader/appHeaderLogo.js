import styled from 'styled-components';

const AppHeaderLogo = styled.div`
  svg{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    max-width: 30px;
    ${({theme}) => theme.tablet`
      max-width: 60px;
    `}
  }
}`

export default AppHeaderLogo;
