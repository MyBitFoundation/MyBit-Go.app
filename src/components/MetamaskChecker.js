/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import MetamaskBooting from './MetamaskBooting';
import MetamaskLogin from './MetamaskLogin';
import BrowserNotSupported from './BrowserNotSupported';
import isMetaMask from '../util/isMetamask';
import checkAccount from '../util/isUserLogged';

const { detect } = require('detect-browser');

class MetamaskChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMetamaskUserLogged: null,
    };
  }

  componentDidMount() {
    checkAccount().then((haveAccounts) => {
      if (haveAccounts.length === 0) {
        this.setState({ isMetamaskUserLogged: false });
      }
    });
  }

  isBrowserSupported() {
    const browser = detect();
    const supportedBrowsers = [
      'chrome',
      'opera',
      'brave',
      'firefox',
    ];
    if (supportedBrowsers.includes(browser.name)) {
      return true;
    }
    return false;
  }

  // if Metamask is not established, modal is displayed with directions
  renderMetamaskWarrning() {
    if (!this.isBrowserSupported()) {
      return <BrowserNotSupported />;
    }
    if (!isMetaMask()) {
      return <MetamaskBooting />;
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderMetamaskWarrning()}
        {this.state.isMetamaskUserLogged === false ? <MetamaskLogin /> : null }
      </div>
    );
  }
}

export default MetamaskChecker;
