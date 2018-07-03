import { promisifyAll } from 'bluebird';
import * as AssetCreation from './AssetCreation';

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

export default class AssetCreationUtil {
  async load(web3, assetID) {
    const abi = await web3.eth.contract(AssetCreation.ABI);
    const instance = instancePromisifier(abi.at(AssetCreation.ADDRESS));
    this.assetIDInstallerID = {};

    /* Create Listeners */
    this.LogAssetInfo = instance.LogAssetInfo(
      { _assetID: assetID },
      { fromBlock: 0, toBlock: 'latest' },
    );
    this.setEventListeners();
  }

  async setEventListeners() {
    this.LogAssetInfo.watch((error, result) => {
      if (!error) {
        const { _assetID: assetID, _installerID: installerID } = result.args;
        this.assetIDInstallerID[assetID] = installerID;
      }
    });
  }

  async returnInstallerID(assetID) {
    return this.assetIDInstallerID[assetID];
  }
}
