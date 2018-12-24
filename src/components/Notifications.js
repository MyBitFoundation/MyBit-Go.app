import React from 'react';
import { Alert } from 'antd';
import { getContentForNotification } from '../constants/notifications';

const Notifications = ({ data, removeNotification }) => {
  const entries = Object.entries(data);
  if(entries.length === 0){
    return null;
  }
  const initialBottomDistance = 20;
  const difference = 110;
  const toRemove = [];
  const toRender = entries.map(([id, notification], index) => {
    const details = getContentForNotification(notification);
    if(!details){
      toRemove.push(id);
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
        style={{bottom: initialBottomDistance + (index * difference) + 'px'}} key={id}
        onClose={() => removeNotification(id)}
      />
    )
  });

  for(const id of toRemove){
    removeNotification(id);
  }

  return <div className="Notifications">{toRender}</div>
};

export default Notifications;
