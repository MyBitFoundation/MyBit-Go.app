import React from 'react';
import {
  Alert,
} from 'antd';
import { withNotificationsContext } from 'components/NotificationsModule';
import NotificationsMobileWrapper from './notificationsMobileWrapper';
import NotificationsMobileTitle from './notificationsMobileTitle';
import NotificationsMobileContentWrapper from './notificationsMobileContentWrapper';
import NotificationsMobileCounter from './notificationsMobileCounter';
import Bell from 'static/bell.svg';

import {
   getContentForNotification,
} from 'constants/notifications';

const NotificationsMobile = ({
  notificationsContext,
}) => {
  const {
   notifications,
   removeNotifications,
  } = notificationsContext;

  const entries = Object.entries(notifications);
  const toRemove = [];
  const toRender = entries.map(([id, notification], index) => {
    const details = getContentForNotification(notification);
    if(!details){
      return null;
    }
    const type = notification.status;
    return (
      <Alert
        message={details.title}
        description={details.message}
        type={type}
        showIcon
        closable={type === 'success' || type === 'error'}
        key={id}
        onClose={() => removeNotifications([id])}
      />
    )
  });

  const numberOfNotifications = toRender.length;
  return (
    <NotificationsMobileWrapper
      hasNotifications={numberOfNotifications > 0}
    >
      <NotificationsMobileTitle>
        {numberOfNotifications > 0 && (
          <NotificationsMobileCounter>
            {numberOfNotifications}
          </NotificationsMobileCounter>
        )}
        <Bell /> <span>Notifications</span>
      </NotificationsMobileTitle>
      <NotificationsMobileContentWrapper>
        {toRender}
      </NotificationsMobileContentWrapper>
      {numberOfNotifications === 0 && (
        <p>No new notifications</p>
      )}
    </NotificationsMobileWrapper>
  )
};

export default withNotificationsContext(NotificationsMobile);
