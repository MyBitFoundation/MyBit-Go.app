import React, { Component } from 'react';
import { promisifyAll } from 'bluebird';
import {
  ASSET_ABI_INTERFACE,
  ASSET_CONTRACT_ADDRESS
} from './contracts/HelloWorld.js';

const instancePromisifier = instance =>
  promisifyAll(instance, { suffix: 'Async' });

class AssetFunding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: null,
      hello: null
    };
  }
  async componentDidMount() {
    const { web3 } = this.props || {};
    const abi = await web3.eth.contract(ASSET_ABI_INTERFACE);
    const instance = instancePromisifier(abi.at(ASSET_CONTRACT_ADDRESS));
    this.setState({
      instance: instance,
      hello: await instance.helloRawAsync()
    });
  }

  render() {
    return <div className="AssetFunding">Asset Funding {this.state.hello}</div>;
  }
}

export default AssetFunding;
