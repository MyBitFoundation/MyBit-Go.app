import { promisifyAll } from 'bluebird';
import * as FundingHub from './FundingHub';
import { fundingTopics } from '../topics';
const Network = require('@mybit/network.js');
const abiDecoder = require('abi-decoder');

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

abiDecoder.addABI(FundingHub.ABI);

export default class FundingHubUtil {
  constructor() {
    this.totalContributorsPerAssetID = {};
    const testNet = 'wss://possibly-possible-lark.quiknode.io/49102400-d67e-456d-bd4d-05b51fef855c/kula72q-V9q6lO5DDhTahw==/'
    this.web3EventsListener = Network.getWeb3EventsListener(testNet)

    this.setLogAssetFundedListener = this.setLogAssetFundedListener.bind(this);
    this.removeLogAssetFundedListener = this.removeLogAssetFundedListener.bind(this);
  }

  async load(web3, assetID) {
    const abi = await web3.eth.contract(FundingHub.ABI);
    this.instance = instancePromisifier(abi.at(FundingHub.ADDRESS));
    this.web3 = web3;

    this.totalContributorsPerAssetID = {};

    this.LogNewFunder = this.instance.LogNewFunder(
      { _assetID: assetID },
      { fromBlock: 0, toBlock: 'latest' },
    );
    this.setEventListeners();
  }

  async setEventListeners() {
    /* Listen for the events */
    let totalContributors = 0;
    this.LogNewFunder.watch((error, result) => {
      if (!error) {
        const { _assetID: assetID } = result.args;
        totalContributors += 1;
        this.totalContributorsPerAssetID[assetID] = totalContributors;
      }
    });
  }

  async returnContributers(assetID) {
    return parseInt(this.totalContributorsPerAssetID[assetID], 10);
  }

  async fund(_assetID, _value) {
    const ethValue = this.web3.toWei(_value);
    const iT = this.instance;
    const w3 = this.web3;
    this.instance.fund.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase, value: ethValue },
      async (error, result) => {
        if (!error) {
          await iT.fundAsync(_assetID, {
            from: w3.eth.coinbase,
            value: ethValue,
            gas: parseInt(result, 10),
          });
        }
      },
    );
  }

  async payout(_assetID) {
    const iT = this.instance;
    const w3 = this.web3;
    this.instance.payout.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase },
      async (error, result) => {
        if (!error) {
          await iT.payoutAsync(_assetID, {
            from: w3.eth.coinbase,
            gas: parseInt(result, 10),
          });
        }
      },
    );
  }

  async initiateRefund(_assetID) {
    const iT = this.instance;
    const w3 = this.web3;
    this.instance.initiateRefund.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase },
      async (error, result) => {
        if (!error) {
          await iT.initiateRefundAsync(_assetID, {
            from: w3.eth.coinbase,
            gas: parseInt(result, 10),
          });
        }
      },
    );
  }

  async refund(_assetID) {
    const iT = this.instance;
    const w3 = this.web3;
    this.instance.refundAsync.estimateGas(
      _assetID,
      { from: this.web3.eth.coinbase },
      async (error, result) => {
        if (!error) {
          await iT.refundAsync(_assetID, {
            from: w3.eth.coinbase,
            gas: parseInt(result, 10),
          });
        }
      },
    );
  }

   setLogAssetFundedListener(cb) {
    const id = this.web3EventsListener.subscribeToLogs(
      'logAssetFunded',
     { 
      address: FundingHub.ADDRESS,
      topics: fundingTopics.LogAssetFunded
    },
      async (trxData) => {
        
        const transactionDetails =
          await this.web3EventsListener.web3Obj.eth.getTransaction(trxData.transactionHash);
        const transactionValue = window.web3.fromWei(transactionDetails.value, 'ether');
        const decodedData = abiDecoder.decodeMethod(transactionDetails.input);
        return cb(decodedData, transactionValue);
      },
    );
    return id;
  }

   removeLogAssetFundedListener(id) {
    this.web3EventsListener.unSubscribe(fundingTopics.LogAssetFunded, id);
  }
}
