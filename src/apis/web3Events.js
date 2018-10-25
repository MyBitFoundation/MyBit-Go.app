const Web3 = require('web3');

class Web3EventsListener {
  constructor() {
    this.activeEventsTopics = {};
    this.web3Obj = null;
    this.subscriberId = 0;

    this.setEvent = this.setEvent.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unSubscribe = this.unSubscribe.bind(this);
  }

  setEvent(address, topic, cb) {
    if (!this.web3Obj) {
      const web3Provider = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
      this.web3Obj = new Web3(web3Provider);
    }

    return this.web3Obj.eth.subscribe('logs', {
      address: [address],
      topics: [topic],
    }, (err) => {
      /* eslint no-console: ["error", { allow: ["log", "error"] }] */
      if (err) console.log(err);
    }).on('data', trxData => cb(trxData));
  }

  subscribe(address, topic, cb) {
    this.subscriberId = this.subscriberId + 1;
    this.activeEventsTopics[topic] = this.activeEventsTopics[topic] || {};
    this.activeEventsTopics[topic][this.subscriberId] = this.setEvent(address, topic, cb);

    return this.subscriberId;
  }

  unSubscribe(topic, subscriberId) {
    const currentTopic = this.activeEventsTopics[topic] || {};
    if (currentTopic[subscriberId]) {
      currentTopic[subscriberId].unsubscribe((error) => {
        if (error) {
          /* eslint no-console: ["error", { allow: ["log", "error"] }] */
          console.log(error);
        }
      });
      delete this.activeEventsTopics[topic][subscriberId];
    }

    return null;
  }
}

const web3EventsListener = new Web3EventsListener();

export default web3EventsListener;
