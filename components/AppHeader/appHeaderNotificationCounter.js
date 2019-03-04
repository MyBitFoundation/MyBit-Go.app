import styled from 'styled-components';

const AppHeaderNotificationCounter = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  font-weight: 500;
  background-color: red;
  position: absolute;
  right: 7px;
  top: 7px;

  ${({theme}) => theme.tablet`
    display: none;
  `}
}`

export default AppHeaderNotificationCounter;
