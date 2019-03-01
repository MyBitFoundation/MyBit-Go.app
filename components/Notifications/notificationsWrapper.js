import styled from 'styled-components';

const NotificationsWrapper = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0px;
  right: 0px;
  display: flex;
  flex-direction: column-reverse;


  .ant-alert-with-description{
    padding: 15px 35px 15px 64px;
  }

  .ant-alert{
    position: relative;
    z-index: 100000;
    right: 20px;
    max-width: 500px;
    margin-bottom: 20px;

    & a:focus{
      text-decoration: none;
    }
  }
}`

export default NotificationsWrapper;
