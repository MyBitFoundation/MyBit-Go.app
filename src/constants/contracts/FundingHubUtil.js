import { promisifyAll } from 'bluebird';
import * as FundingHub from './FundingHub';

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

export default class FundingHubUtil {
  constructor() {
    this.totalContributorsPerAssetID = {};
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
}
