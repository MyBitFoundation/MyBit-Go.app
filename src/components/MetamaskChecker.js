/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MetamaskBooting from './MetamaskBooting';
import MetamaskLogin from './MetamaskLogin';
import BrowserNotSupported from './BrowserNotSupported';
import isMetaMask from '../util/isMetamask';
import checkAccount from '../util/isUserLogged';
import { METAMASK_FIREFOX, METAMASK_CHROME, METAMASK_OPERA } from '../constants';

const { detect } = require('detect-browser');

class MetamaskChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMetamaskUserLogged: null,
    };
    this.isBraveBrowser = false;
    this.extensionUrl = '';
  }

  componentDidMount() {
    checkAccount().then((haveAccounts) => {
      if (haveAccounts.length === 0) {
        this.setState({ isMetamaskUserLogged: false });
      }
    });
  }

  isBraveBrowserBeingUsed() {
  // initial assertions
    if (!window.google_onload_fired &&
       navigator.userAgent &&
      !navigator.userAgent.includes('Chrome')) { return false; }

    // set up test
    const test = document.createElement('iframe');
    test.style.display = 'none';
    document.body.appendChild(test);

    // empty frames only have this attribute set in Brave Shield
    const isBrave = (test.contentWindow.google_onload_fired === true);

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
        return false;
    }
  }

  // if Metamask is not established, modal is displayed with directions
  renderMetamaskWarning() {
    if (!this.isBrowserSupported()) {
      return <BrowserNotSupported />;
    }
    if (!isMetaMask()) {
      return (
        <MetamaskBooting
          extensionUrl={this.extensionUrl}
          isBraveBrowser={this.isBraveBrowser}
        />
      );
    }
    return null;
  }

  render() {
    if (!this.props.shouldDisplay) {
      return null;
    }

    return (
      <div>
        {this.renderMetamaskWarning()}
        {this.state.isMetamaskUserLogged === false ? <MetamaskLogin /> : null }
      </div>
    );
  }
}

MetamaskChecker.propTypes = {
  shouldDisplay: PropTypes.bool.isRequired,
};

export default MetamaskChecker;
