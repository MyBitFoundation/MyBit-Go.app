import styled from 'styled-components';

const AppHeaderPageName = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%,0%);
  font-weight: 500;
  top: 18px;
  font-size: 18px;
  color: #fafafa;
  display: block;

  ${({theme}) => theme.tablet`
    display: none;
  `}
}`

export default AppHeaderPageName;
