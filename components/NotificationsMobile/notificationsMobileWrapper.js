import styled, { css } from 'styled-components';

const NotificationsMobileWrapper = styled.div`
  .ant-alert-with-description{
    padding: 10px;
  }
  .ant-alert-info{
    border: none;
  }

  .ant-alert-with-description .ant-alert-icon{
    width: max-content;
    position: absolute;
    left: auto;
    right: 10px;
    font-size: 16px;
  }

  ${props => props.hasNotifications && css`
    padding-top: 10px;
  `}

  .anticon-check-circle{
    top: 14px;
  }

  .ant-alert-icon{
    top: 13px;
  }

  .ant-alert-with-description .ant-alert-close-icon{
    left: 5px;
    right: auto;
    top: auto;
    font-size: 22px;
    bottom: 0px;
  }
}`

export default NotificationsMobileWrapper;
