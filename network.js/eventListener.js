const Web3 = require('web3');

class Web3EventsListener {
    constructor(providerNet) {
        this.providerNet = providerNet || 'wss://ropsten.infura.io/ws';
        this.activeEventsMap = {};
        this.web3Instance = null;
        this.subscriberId = 0;
        this.setEvent = this.setEvent.bind(this);
        this.subscriber = this.subscriber.bind(this);
        this.subscribeToLogs = this.subscribeToLogs.bind(this);
        this.subscribeToPendingTransactions = this.subscribeToPendingTransactions.bind(this);
        this.subscribeToNewBlockHeaders = this.subscribeToNewBlockHeaders.bind(this);
        this.subscribeToSyncing = this.subscribeToSyncing.bind(this);
        this.unSubscribe = this.unSubscribe.bind(this);
    }

    setEvent (type, params, cb, eventEmitter) {
      this.web3Instance = !this.web3Instance ? new Web3(new Web3(new Web3.providers.WebsocketProvider(this.providerNet))) : this.web3Instance

      const errCb = (err) => {
        /* eslint no-console: ["error", { allow: ["log", "error"] }] */
        if (err) console.log(err);
      }

      const eventSubscription = params ? this.web3Instance.eth.subscribe(type, params, errCb) : this.web3Instance.eth.subscribe(type, errCb);

      return eventSubscription.on(eventEmitter, result => cb(result));
    }
  
    subscriber(event, setEvent) {
      this.subscriberId = this.subscriberId + 1;
      this.activeEventsMap[event] = this.activeEventsMap[event] || {};
      this.activeEventsMap[event][this.subscriberId] = setEvent();
       return this.subscriberId;
    }
    
    subscribeToLogs(event, params, cb, eventEmitter = 'data') {
        return this.subscriber(event, () => this.setEvent(
            'logs',
            {
                address: [params.address],
                topics: [params.topics],
            },
            cb, 
            eventEmitter
        ));
    }
    
    subscribeToPendingTransactions(event, cb, eventEmitter = 'data') {
        return this.subscriber(event, () => this.setEvent(
            'pendingTransactions',
            null,
            cb, 
            eventEmitter
        ));
    };

    subscribeToNewBlockHeaders(event, cb, eventEmitter = 'data'){
        return this.subscriber(event, () => this.setEvent(
            'newBlockHeaders',
            null,
            cb, 
            eventEmitter
        ))
    };

    subscribeToSyncing(event, cb, eventEmitter = 'data') {
        return this.subscriber(event, () => this.setEvent(
            'syncing',
            null,
            cb, 
            eventEmitter
        ))
    };
    
    unSubscribe(event, subscriberId) {
      const currentEvent = this.activeEventsMap[event] || {};
      if (currentEvent[subscriberId]) {
        currentEvent[subscriberId].unsubscribe((error) => {
          if (error) {
            /* eslint no-console: ["error", { allow: ["log", "error"] }] */
            console.log(error);
          }
        });
        delete this.activeEventsMap[event][subscriberId];
      }
       return null;
    }
  };

  module.exports = Web3EventsListener;