import styled from 'styled-components';

const AppHeaderConnectionStatus = styled.div`
  display: none;
  box-sizing: border-box;
  width: max-content;
  padding: 4px 10px;
  position: absolute;
  right: 0px;
  top: ${({theme}) => theme.sizes.headerHeightTablet / 2}px;
  transform: translate(-0%, -50%);

  ${({theme}) => theme.tablet`
    display: block;
  `}
}`

export default AppHeaderConnectionStatus;
