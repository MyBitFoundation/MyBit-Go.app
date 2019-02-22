import styled, { css } from 'styled-components';

const AppHeaderContainer = styled.div`
  height: 60px;
  background-image: ${({theme}) => theme.colors.backgroundGradientHorizontal}
  margin: 0px 0px;
  padding: 0 10px;
  color: white;
  display: flex;
  position: relative;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  font-family: 'Roboto';
  align-items: center;

  transition: all 0.2s;

  ${props => props.hideOnMobile && css`
    height: 0px;

    ${({theme}) => theme.tablet`
      height: 90px;
    `}
  `}

  ${({theme}) => theme.tablet`
    transition: all 0.2s;
    height: 90px;
    padding: 0 50px;
  `}
}`

export default AppHeaderContainer;
