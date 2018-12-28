/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import dynamic from 'next/dynamic'

import {
  METAMASK_FIREFOX,
  METAMASK_CHROME,
  METAMASK_OPERA,
  PROVIDER_MAINNET,
} from './constants';

class MetamaskChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInstalled: undefined,
      isLoggedIn: undefined,
      enabled: undefined,
      user: {},
    };
    this.isBraveBrowser = false;
    this.extensionUrl = undefined;
    this.checkNetwork = this.checkNetwork.bind(this);
    this.userHasMetamask = this.userHasMetamask.bind(this);
    this.haveAccessToAccounts = this.haveAccessToAccounts.bind(this);
    this.getAccount = this.getAccount.bind(this);
  }

  async componentDidMount() {
    try{
      if(typeof window !== 'undefined') {
        this.detect = require('detect-browser');
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        const { ethereum } = window;
        window.web3js = new Web3(ethereum);
        const accessToAccounts = await this.haveAccessToAccounts();
        await this.userHasMetamask(accessToAccounts);

      } else if (window.web3) {
        window.web3js = new Web3(window.web3.currentProvider);
        await this.userHasMetamask(false);
      } else {
        window.web3js = new Web3(new Web3.providers.HttpProvider(PROVIDER_MAINNET));
        this.isBrowserSupported();
      }
    } catch(err){
      console.log(err);
    }
  }

  async getAccount(){
    try{
      const accounts = await window.web3js.eth.getAccounts();
      if(accounts && accounts.length > 0){
        let balance;
        while(!balance){
          balance = await window.web3js.eth.getBalance(accounts[0]);
        }
        balance = window.web3js.utils.fromWei(balance, 'ether');
        if((this.state.user && this.state.user.userName !== accounts[0]) || (this.state.user.balance !== balance) || !this.state.user || !this.state.enabled){
          this.setState({
            user: {
              userName: accounts[0],
              balance,
            },
            enabled: true,
            isLoggedIn: true,
            isInstalled: true,
          })
        }
      } else{
        this.setState({
          isLoggedIn: false,
        })
      }
    }catch(err){
      console.log(err)
      this.getAccount();
    }
  }

  async haveAccessToAccounts(){
    return await window.ethereum._metamask.isApproved();
  }

  async userHasMetamask(enabled) {
    await this.checkNetwork();
    const isLoggedIn = await this.checkIfLoggedIn()
    window.web3js.currentProvider.publicConfigStore.on('update', ({selectedAddress}) => this.handleAddressChanged(selectedAddress));
    if(isLoggedIn){
      await this.getAccount();
    }

    this.setState({
      isInstalled: true,
      isLoggedIn,
      enabled,
    });
  }

  async handleAddressChanged(selectedAddress) {
    const isLoggedIn = await this.checkIfLoggedIn();
    if(isLoggedIn || !this.state.enabled){
      this.getAccount();
    }
    if(this.state.isLoggedIn !== isLoggedIn){
      this.setState({
        isLoggedIn
      });
    }
  }

  async checkIfLoggedIn() {
    const { ethereum } = window;
    if(ethereum) {
      return await window.ethereum._metamask.isUnlocked();
    }
    else {
      const accounts = await window.web3js.eth.getAccounts();
      if (accounts && accounts.length === 0) {
        return false;
      } else if (!accounts) {
        return undefined;
      }
      return true;
    }
  }

  async checkNetwork() {
    this.network = await window.web3js.eth.net.getNetworkType();
  }

  isBraveBrowserBeingUsed() {
    // initial assertions
    if (
      !window.google_onload_fired &&
      navigator.userAgent &&
      !navigator.userAgent.includes('Chrome')
    ) {
      return false;
    }

    // set up test
    const test = document.createElement('iframe');
    test.style.display = 'none';
    document.body.appendChild(test);

    // empty frames only have this attribute set in Brave Shield
    const isBrave = test.contentWindow.google_onload_fired === true;

    // teardown test
    test.parentNode.removeChild(test);

    return isBrave;
  }

  isBrowserSupported() {
    const browser = this.detect.detect();
    if (this.isBraveBrowserBeingUsed()) {
      this.isBraveBrowser = true;
    }
    switch (browser.name) {
      case 'chrome':
        this.extensionUrl = METAMASK_CHROME;
        break;
      case 'opera':
        this.extensionUrl = METAMASK_OPERA;
        break;
      case 'firefox':
        this.extensionUrl = METAMASK_FIREFOX;
        break;
      default:
        break;
    }
    this.setState({
      isInstalled: false,
      isLoggedIn: false,
    });
  }

  render() {
    if (this.state.isInstalled === undefined || this.state.isLoggedIn === undefined) {
      return null;
    }

    return React.cloneElement(this.props.children, {
      isMetamaskInstalled: this.state.isInstalled,
      network: this.network,
      isBraveBrowser: this.isBraveBrowser,
      extensionUrl: this.extensionUrl,
      isLoggedIn: this.state.isLoggedIn,
      enabled: this.state.enabled,
      user: this.state.user,
    });
  }
}

MetamaskChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MetamaskChecker;
