import styled, { css } from 'styled-components';

const MobileMenuApp = styled.div`
  background-color: white;
  top: 0px;
  position: relative;
  width: 100vw;
  opacity: 1;
  transition: all 0.3s;
  padding-bottom: 50px;

  ${props => props.isOpen && css`
    opacity: 0;
  `}
}`

export default MobileMenuApp;
