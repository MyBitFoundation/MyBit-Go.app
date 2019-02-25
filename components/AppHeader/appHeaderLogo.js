import styled from 'styled-components';

const AppHeaderLogo = styled.div`
  display: inline-block;
  margin-right: 65px;

  svg{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    max-width: 30px;
    ${({theme}) => theme.tablet`
      position: relative;
      max-width: 60px;
    `}
  }
}`

export default AppHeaderLogo;
