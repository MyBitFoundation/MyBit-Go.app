
import FundingHub from '../constants/contracts/FundingHub';
import { fundingTopics } from '../constants/topics';

const Web3 = require('web3');
const abiDecoder = require('abi-decoder');

const web3Provider = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
const web3Obj = new Web3(web3Provider);

abiDecoder.addABI(FundingHub.ABI);

class Web3EventsListener {
  constructor() {
    this.activeEventsTopics = {};

    this.setEvent = this.setEvent.bind(this);
    this.setLogAssetFundedListener = this.setLogAssetFundedListener.bind(this);
    this.removeLogAssetFundedListener = this.removeLogAssetFundedListener.bind(this);
  }

  setEvent(eventName, cb) {
    this.activeEventsTopics[eventName] = web3Obj.eth.subscribe('logs', {
      address: [FundingHub.ADDRESS],
      topics: [fundingTopics[eventName]],
    }, (err) => {
      /* eslint no-console: ["error", { allow: ["log", "error"] }] */
      if (err) console.log(err);
    }).on('data', trxData => cb(trxData));
  }

  setLogAssetFundedListener(cb) {
    this.setEvent('LogAssetFunded', async (trxData) => {
      const transactionDetails = await web3Obj.eth.getTransaction(trxData.transactionHash);
      const transactionValue = window.web3.fromWei(transactionDetails.value, 'ether');
      const decodedData = abiDecoder.decodeMethod(transactionDetails.input);
      return cb(decodedData, transactionValue);
    });
  }

  removeLogAssetFundedListener() {
    this.activeEventsTopics.LogAssetFunded.unsubscribe((error) => {
      if (error) {
        /* eslint no-console: ["error", { allow: ["log", "error"] }] */
        console.log(error);
      }
    });
    delete this.activeEventsTopics.LogAssetFunded;
  }
}

const web3EventsListener = new Web3EventsListener();

export default web3EventsListener;
