/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';

import {
  METAMASK_FIREFOX,
  METAMASK_CHROME,
  METAMASK_OPERA,
} from '../constants';

const { detect } = require('detect-browser');

class MetamaskChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInstalled: undefined,
      isLoggedIn: undefined,
    };
    this.isBraveBrowser = false;
    this.extensionUrl = '';

    this.checkNetworks = this.checkNetworks.bind(this);
  }

  async componentDidMount() {
    // Modern dapp browsers...
    if (window.ethereum) {
      const { ethereum } = window;
      window.web3 = new Web3(ethereum);
      await this.userHasMetamask();

      try {
        await ethereum.enable();
      } catch (error) {
      // User denied account access...
      }
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await this.userHasMetamask();
    } else {
      this.isBrowserSupported();
    }
  }

  async userHasMetamask() {
    await this.checkNetworks();
    const isLoggedIn = await this.checkIfLoggedIn();
    this.setState({
      isInstalled: true,
      isLoggedIn,
    });
  }

  async checkIfLoggedIn() {
    const accounts = await window.web3.eth.getAccounts();
    if (accounts && accounts.length === 0) {
      return false;
    } else if (!accounts) {
      return undefined;
    }

    return true;
  }

  async checkNetworks() {
    this.network = await window.web3.eth.net.getNetworkType();
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
    const browser = detect();
    if (this.isBraveBrowserBeingUsed()) {
      this.isBraveBrowser = true;
    }
    switch (browser.name) {
      case 'chrome':
        this.extensionUrl = METAMASK_CHROME;
        return true;
      case 'opera':
        this.extensionUrl = METAMASK_OPERA;
        return true;
      case 'firefox':
        this.extensionUrl = METAMASK_FIREFOX;
        return true;
      default:
        this.setState({
          isInstalled: false,
        });
        return false;
    }
  }

  render() {
    if (this.state.isInstalled === undefined || this.state.isLoggedIn === undefined) {
      return null;
    }

    return React.cloneElement(this.props.children, {
      isMetamaskInstalled: this.state.isInstalled,
      checkIfLoggedIn: this.checkIfLoggedIn,
      network: this.network,
      isBraveBrowser: this.isBraveBrowser,
      extensionUrl: this.extensionUrl,
      userIsLoggedIn: this.state.isLoggedIn,
    });
  }
}

MetamaskChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MetamaskChecker;
