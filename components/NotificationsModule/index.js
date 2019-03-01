import React from 'react';
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
      removeNotifications: this.removeNotifications,
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

  componentDidUpdate = () => {
    const toRemove = [];
    const entries = Object.entries(this.state.notifications);
    entries.map(([id, notification]) => {
      const details = getContentForNotification(notification);
      if(!details){
        toRemove.push(id);
      }
    });
    if(toRemove.length > 0){
      this.removeNotifications(toRemove);
    }
  }

  removeNotifications = (notificationsToRemove) => {
    const notifications = Object.assign({}, this.state.notifications);
    for(const id of notificationsToRemove){
      delete notifications[id];
    }
    this.setState({notifications});
  };

  createOrUpdateNofication = (id, data) => {
    const notifications = Object.assign({}, this.state.notifications);
    notifications[id] = data;
    this.setState({notifications});
  };

  render(){
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
};

export default NotificationsProvider;
