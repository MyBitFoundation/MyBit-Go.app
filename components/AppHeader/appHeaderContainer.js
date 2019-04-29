import styled, { css } from 'styled-components';

const AppHeaderContainer = styled.div`
  height: ${({theme}) => theme.sizes.headerHeightMobile}px;
  background-color: #001358;
  margin: 0px 0px;
  padding: 0 20px;
  color: white;
  overflow: hidden;
  transition: all 0.2s;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 2;

  ${props => props.hideOnMobile && css`
    height: 0px;

    ${({theme}) => theme.tablet`
      height: ${({theme}) => theme.sizes.headerHeightTablet}px;
    `}
  `}

  ${({theme}) => theme.tablet`
    transition: all 0.2s;
    height: ${({theme}) => theme.sizes.headerHeightTablet}px;
    position: relative;
  `}
}`

export default AppHeaderContainer;
