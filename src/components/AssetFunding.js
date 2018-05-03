import React, { Component } from 'react';
import { promisifyAll } from 'bluebird';

import { default as DatabaseUtil } from './contracts/DatabaseUtil';
import { default as HashFunctionsUtil } from './contracts/HashFunctionsUtil';

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
        '0xc481012a7563a254e34971fa6eb679d6556726ebfafa7c0cb62d444f90b6f82c';
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

      console.log('amountToBeRaised', this.state.amountToBeRaised);
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
