import React, { Component } from 'react';
import { promisifyAll } from 'bluebird';

/* --- First way ---*/
import { default as DatabaseUtil } from './contracts/DatabaseUtil';
import { default as HashFunctionsUtil } from './contracts/HashFunctionsUtil';

/* --- Second Way way ---*/
import {
  DATABASE_CONTRACT_ADDRESS,
  DATABASE_ABI_INTERFACE
} from './contracts/Database.js';

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

class AssetFunding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashFunctionsInstance: null,
      databaseInstance: null,
      amountToBeRaised: null,
      assetID: null
    };
  }
  async componentDidMount() {
    const { web3 } = this.props || {};
    if (web3.isConnected()) {
      const assetID =
        '0xcbb8744ce8cb288674fbafe1b6c111c6d86308af6b2e7d396780104341a1cf8e';
      const hashFunctionsInstance = new HashFunctionsUtil();
      const databaseInstance = new DatabaseUtil();
      await hashFunctionsInstance.load(web3);
      await databaseInstance.load(web3);

      this.setState({
        hashFunctionsInstance: hashFunctionsInstance,
        databaseInstance: databaseInstance,
        amountToBeRaised: web3.fromWei(
          await databaseInstance.uintStored(
            await hashFunctionsInstance.stringBytes('amountToBeRaised', assetID)
          ),
          'ether'
        )
      });

      console.log('amountToBeRaised', amountToBeRaised);
    }
  }

  render() {
    return (
      <div className="AssetFunding">
        Asset Funding {this.state.amountToBeRaised}
      </div>
    );
  }
}

export default AssetFunding;
