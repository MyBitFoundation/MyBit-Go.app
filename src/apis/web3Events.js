const Web3 = require('web3');

const web3Provider = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));

class Web3EventsListener {
  constructor() {
    this.activeEventsTopics = {};
    this.web3Obj = new Web3(web3Provider);
    this.setEvent = this.setEvent.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
  }

  setEvent(address, topic, cb) {
    this.activeEventsTopics[topic] = this.web3Obj.eth.subscribe('logs', {
      address: [address],
      topics: [topic],
    }, (err) => {
      /* eslint no-console: ["error", { allow: ["log", "error"] }] */
      if (err) console.log(err);
    }).on('data', trxData => cb(trxData));
  }

  removeEventListener(topic) {
    this.activeEventsTopics[topic].unsubscribe((error) => {
      if (error) {
        /* eslint no-console: ["error", { allow: ["log", "error"] }] */
        console.log(error);
      }
    });
    delete this.activeEventsTopics[topic];
  }
}

const web3EventsListener = new Web3EventsListener();

export default web3EventsListener;
