import styled from 'styled-components';

const AppHeaderPageName = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-weight: 500;
  font-size: 18px;
  color: #fafafa;
  display: block;

  ${({theme}) => theme.tablet`
    display: none;
  `}
}`

export default AppHeaderPageName;
