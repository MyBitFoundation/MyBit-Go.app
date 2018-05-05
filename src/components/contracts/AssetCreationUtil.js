import { promisifyAll } from 'bluebird';
import * as AssetCreation from './AssetCreation.js';

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

var assetIDInstallerID;

export default class AssetCreationUtil {
  async load(web3, assetID) {
    const abi = await web3.eth.contract(AssetCreation.ABI);
    var instance = instancePromisifier(abi.at(AssetCreation.ADDRESS));
    assetIDInstallerID = {};

    /* Create Listeners */
    this.LogAssetInfo = instance.LogAssetInfo(
      { _assetID: assetID },
      { fromBlock: 0, toBlock: 'latest' }
    );
    this.setEventListeners();
  }

  async setEventListeners() {
    /* Listen for the events */
    let _installerID;
    let _assetID;
    this.LogAssetInfo.watch(function(e, r) {
      if (!e) {
        _assetID = r['args']['_assetID'];
        _installerID = r['args']['_installerID'];
        assetIDInstallerID[_assetID] = _installerID;
      }
    });
  }

  async returnInstallerID(assetID) {
    return assetIDInstallerID[assetID];
  }
}
