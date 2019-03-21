import styled, { css } from 'styled-components';

const MobileMenuWrapper = styled.div`
  background-color: white;
  padding: 20px;
  height: 100vh;
  top: 100vh;
  position: fixed;
  z-index: 10;
  width: 100vw;
  transition: all 0.3s;
  opacity: 0;
  max-height: 100vh;
  overflow-y: auto;

  ${({theme}) => theme.mobileM `
    padding: 40px;
  `}

  ${props => props.isOpen && css`
    transition: all 0.3s;
    top: 0px;
    opacity: 1;
  `}
}`

export default MobileMenuWrapper;
