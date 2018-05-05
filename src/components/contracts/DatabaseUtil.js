import { promisifyAll } from 'bluebird';
import * as Database from './Database.js';

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

export default class DatabaseUtil {
  async load(web3) {
    const abi = await web3.eth.contract(Database.ABI);
    this.instance = instancePromisifier(abi.at(Database.ADDRESS));
    this.web3 = web3;
  }

  async uintStored(_bytes32) {
    const uintStored = await this.instance.uintStorageAsync(_bytes32);
    return parseInt(uintStored, 10);
  }

  async stringStorage(_bytes32) {
    const stringStored = await this.instance.stringStorageAsync(_bytes32);
    return stringStored;
  }

  async addressStorage(_bytes32) {
    var addressStored = await this.instance.addressStorageAsync(_bytes32, {
      from: this.web3.eth.coinbase
    });
    return addressStored;
  }

  async bytesStorage(_bytes32) {
    const bytesStored = await this.instance.bytesStorageAsync(_bytes32);
    return bytesStored;
  }

  async bytes32Storage(_bytes32) {
    const bytes32Stored = await this.instance.bytes32StorageAsync(_bytes32);
    return bytes32Stored;
  }

  async boolStorage(_bytes32) {
    const boolStored = await this.instance.boolStorageAsync(_bytes32);
    return boolStored;
  }

  async intStorage(_bytes32) {
    const intStored = await this.instance.intStorageAsync(_bytes32);
    return intStored;
  }
}
