import styled from 'styled-components';

const AppHeaderLogo = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  display: inline-block;
  padding-right: 65px;

  svg{
    height: 100%;
    width: 100%;
    max-width: 40px;

    ${({theme}) => theme.tablet`
      max-width: 50px;
    `}
  }

  ${({theme}) => theme.tablet`
    padding-top: 5px;
    padding-left: 0px;
  `}

}`

export default AppHeaderLogo;
