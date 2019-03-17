import styled from 'styled-components';

const AppHeaderConnectionStatus = styled.div`
  display: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 16px;
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
