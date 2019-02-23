import React from 'react';
import {
  Alert,
} from 'antd';
import { 
  getContentForNotification,
} from 'constants/notifications';

const { Provider, Consumer } = React.createContext({});

export const withNotificationsContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
        {state => <Component {...props} notificationsContext={state} />}
      </Consumer>
    );
  };
}

class NotificationsProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      notifications: {},
      removeNotification: this.removeNotification,
      buildNotification: this.buildNotification,
      resetNotifications: this.resetNotifications,
    }
  }

  resetNotifications = () => {
    this.setState({notifications: {}})
  };

  buildNotification = (id, type, status, params) => {
    this.createOrUpdateNofication(id, {
      [type]: {
        ...params,
      },
      status,
    });
  };

  removeNotification = (id) => {
    const notifications = Object.assign({}, this.state.notifications);
    delete notifications[id];
    this.setState({notifications});
  };

  createOrUpdateNofication = (id, data) => {
    const notifications = Object.assign({}, this.state.notifications);
    notifications[id] = data;
    console.log("notifications: ", notifications)
    this.setState({notifications});
  };

  render(){
    const {
     notifications,
    } = this.state;

    const entries = Object.entries(notifications);
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
          key={id}
          onClose={() => this.removeNotification(id)}
        />
      )
    });

          console.log(toRender)


    for(const id of toRemove){
      this.removeNotification(id);
    }

    return (
      <Provider value={this.state}>
        {this.props.children}
        <div className="Notifications">{toRender}</div>
      </Provider>
    )
  }
};

export default NotificationsProvider;
