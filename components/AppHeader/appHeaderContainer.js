import styled, { css } from 'styled-components';

const AppHeaderContainer = styled.div`
  height: ${({theme}) => theme.sizes.headerHeightMobile}px;
  background-image: linear-gradient(62deg,rgba(0, 19, 88, 0.95),rgba(18, 90, 196, 0.95));
  margin: 0px 0px;
  padding: 0 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: center;
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
    background-image: ${({theme}) => theme.colors.backgroundGradientHorizontal}
    transition: all 0.2s;
    height: ${({theme}) => theme.sizes.headerHeightTablet}px;
    padding: 0 50px;
    position: relative;
  `}
}`

export default AppHeaderContainer;
