import {
  Alert,
} from 'antd';
import { withNotificationsContext } from 'components/NotificationsContext';
import NotificationsWrapper from './notificationsWrapper';
import { 
  getContentForNotification,
} from 'constants/notifications';

const Notifications = ({
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

  return (
    <NotificationsWrapper>
      {toRender}
    </NotificationsWrapper>
  )
}

export default withNotificationsContext(Notifications);
