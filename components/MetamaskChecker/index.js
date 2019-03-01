/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';

import {
  METAMASK_FIREFOX,
  METAMASK_CHROME,
  METAMASK_OPERA,
  PROVIDER_ROPSTEN,
  CORRECT_NETWORK,
  METAMASK_ERRORS,
} from './constants';

const { Provider, Consumer } = React.createContext({});

// Required so we can trigger getInitialProps in our exported pages
export const withMetamaskContext = (Component) => {
  return class Higher extends React.Component{
    static getInitialProps(ctx) {
      if(Component.getInitialProps)
        return Component.getInitialProps(ctx);
      else return {};
    }
    render(){
      return (
        <Consumer>
          {state => <Component {...this.props} metamaskContext={state} />}
        </Consumer>
      )
    }
  }
}

class MetamaskChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHasMetamask: undefined,
      userIsLoggedIn: undefined,
      privacyModeEnabled: undefined,
      isReadOnlyMode: undefined,
      extensionUrl: undefined,
      user: { balances: {}},
      metamaskErrors: this.metamaskErrors,
    };
  };

 metamaskErrors = className => {
    const {
      userHasMetamask,
      extensionUrl,
      userIsLoggedIn,
      network,
      privacyModeEnabled
    } = this.state;

    let toRender = null;
    let error;
    if (!userHasMetamask && extensionUrl) {
      error = METAMASK_ERRORS.NO_METAMASK;
      toRender = (
        <span>Please connect via <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">MetaMask</a> to be able to fund and create assets.
          You can download the extension via{' '}
          <a href={extensionUrl} target="_blank" rel="noopener noreferrer">this</a> link.
        </span>
      );
    } else if (!userHasMetamask && !extensionUrl) {
      error = METAMASK_ERRORS.NOT_SUPPORTED;
      toRender = (
        <div>
          <span>Your browser is not supported. MetaMask supports the following browsers:
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Chrome
            </a>,
            <a
              href="https://www.mozilla.org/en-US/firefox/new/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Firefox
            </a>,
            <a
              href="https://www.opera.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Opera
            </a>{' '}
            or
            <a
              href="https://brave.com/download/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Brave
            </a>
          </span>
        </div>
      );
    } else if (userHasMetamask && !userIsLoggedIn) {
      error = METAMASK_ERRORS.NO_LOGIN;
      toRender = (
        <span>Please login in MetaMask.</span>
      );
    } else if(privacyModeEnabled === undefined){
      error = METAMASK_ERRORS.NOT_CONNECTED;
      toRender = (
        <span><span className="MetamaksErrors__connect" onClick={window.ethereum.enable}>Connect</span> your MetaMask account to get started.</span>
      );
    } else if (network !== CORRECT_NETWORK) {
      error = METAMASK_ERRORS.NOT_NETWORK;
      toRender = (
        <span>
          Only the Ropsten network is supported at the moment, please change the network in MetaMask.
        </span>
      );
    }
    return {
      render: toRender && (
        <div className={className}>
          {toRender}
        </div>
      ),
      error,
    }
  }

  componentDidMount = async () => {
    try{
      if(typeof window !== 'undefined') {
        this.detect = require('detect-browser');
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        const { ethereum } = window;
        window.web3js = new Web3(ethereum);
        const accessToAccounts = await this.haveAccessToAccounts() ? true : undefined;
        await this.userHasMetamask(accessToAccounts);

      } else if (window.web3) {
        window.web3js = new Web3(window.web3.currentProvider);
        await this.userHasMetamask(false);
      } else {
        window.web3js = new Web3(new Web3.providers.HttpProvider(PROVIDER_ROPSTEN));
        this.isBrowserSupported();
      }
    } catch(err){
      console.log(err);
    }
  }

  queryWeb3ForBalance = async (tokenInfo, userAddress) =>
    new Promise(async (resolve, reject) => {
      try {
        const tokenContract = new window.web3js.eth.Contract(
          tokenInfo.ABI,
          tokenInfo.ADDRESS,
        );

        const balance = await tokenContract.methods
          .balanceOf(userAddress)
          .call();

        resolve({
          name: tokenInfo.name,
          balance: window.web3js.utils.fromWei(balance, 'ether')
        });
      } catch (error) {
        reject(error);
      }
    })

  fetchUserBalances = async (userAddress) => {
    const balances = await Promise.all(this.props.supportedTokens.map(async token =>this.queryWeb3ForBalance(token, userAddress)));
    const balancesObj = {};
    balances.forEach(token => balancesObj[token.name] = token.balance)
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        balances: {
          ...this.state.user.balances,
          ...balancesObj,
        },
      }
    })
  }

  isReadOnlyMode = (userHasMetamask, userIsLoggedIn, network, privacyModeEnabled) => {
    return !userHasMetamask || !userIsLoggedIn || network !== CORRECT_NETWORK || privacyModeEnabled === undefined;
  }

  updateStateWithUserInfo = (privacyModeEnabled, network, ethBalance, address, userIsLoggedIn) => {
    const {
      privacyModeEnabled : oldPrivacyModeEnabled,
      network: oldNetwork,
      user: oldUser,
      address: oldAddress,
    } = this.state;

    if(oldPrivacyModeEnabled !== privacyModeEnabled || oldNetwork !== network || (!oldUser.balances || oldUser.balances.ether !== ethBalance)){
      this.fetchUserBalances(address);
      this.setState({
        network,
        user: {
          address,
          balances: {
            ...this.state.user.balances,
            ether: ethBalance,
          }
        },
        userHasMetamask: true,
        privacyModeEnabled,
        userIsLoggedIn,
        isReadOnlyMode: this.isReadOnlyMode(true, userIsLoggedIn, network, privacyModeEnabled),
      })
    }
  }

  updateStateNoAccess = (privacyModeEnabled, network, userIsLoggedIn) => {
    const {
      privacyModeEnabled : oldPrivacyModeEnabled,
      network: oldNetwork,
      userIsLoggedIn: oldUserIsLoggedIn,
    } = this.state;

    if(oldPrivacyModeEnabled !== privacyModeEnabled || oldNetwork !== network || oldUserIsLoggedIn !== userIsLoggedIn){
      this.setState({
        network,
        user: {},
        userHasMetamask: true,
        userIsLoggedIn,
        privacyModeEnabled,
        isReadOnlyMode: this.isReadOnlyMode(true, userIsLoggedIn, network, privacyModeEnabled),
      })
    }
  }

  getUserInfo = async (privacyModeEnabled, network) => {
    try{
      network = network || this.state.network;
      const accounts = await window.web3js.eth.getAccounts();
      const userIsLoggedIn = await this.checkIfLoggedIn();
      if(accounts && accounts.length > 0){
        let ethBalance;
        while(!ethBalance){
          ethBalance = await window.web3js.eth.getBalance(accounts[0]);
        }
        ethBalance = window.web3js.utils.fromWei(ethBalance, 'ether');
        this.updateStateWithUserInfo(privacyModeEnabled, network, ethBalance, accounts[0], userIsLoggedIn);
      } else {
        this.updateStateNoAccess(privacyModeEnabled, network, userIsLoggedIn);
      }
    }catch(err){
      console.log(err)
      this.getUserInfo(privacyModeEnabled, network);
    }
  }

  async haveAccessToAccounts(){
    if(window.ethereum){
      return await window.ethereum._metamask.isApproved();
    }
    else {
      return true;
    }
  }

  async userHasMetamask(privacyModeEnabled) {
    const network = await this.checkNetwork();

    //subscribe to metamask updates
    window.web3js.currentProvider.publicConfigStore.on('update', () => this.handleAddressChanged());

    //case where user has metamask but is connected to the wrong network, we
    //still need to load the data properly from the correct network
    if(network !== CORRECT_NETWORK){
      window.web3js = new Web3(new Web3.providers.HttpProvider(this.props.backupProvider))
    }

    await this.getUserInfo(privacyModeEnabled, network);
  }

  async handleAddressChanged() {
    const privacyModeEnabled = await this.haveAccessToAccounts() ? true : undefined;
    this.getUserInfo(privacyModeEnabled);
  }

  async checkIfLoggedIn() {
    const { ethereum } = window;
    if(ethereum) {
      return await window.ethereum._metamask.isUnlocked();
    }
    else {
      const accounts = await window.web3js.eth.getAccounts();
      if (accounts && accounts.length > 0) {
        return true;
      }
      return false;
    }
  }

  async checkNetwork() {
    return await window.web3js.eth.net.getNetworkType();
  }

  isBrowserSupported() {
    const browser = this.detect.detect();
    let extensionUrl;
    switch (browser.name) {
      case 'chrome':
        extensionUrl = METAMASK_CHROME;
        break;
      case 'opera':
        extensionUrl = METAMASK_OPERA;
        break;
      case 'firefox':
        extensionUrl = METAMASK_FIREFOX;
        break;
      default:
        break;
    }
    this.setState({
      isReadOnlyMode: true,
      userHasMetamask: false,
      userIsLoggedIn: false,
      extensionUrl,
    });
  }

  render() {
    if (this.state.userHasMetamask === undefined || this.state.userIsLoggedIn === undefined) {
      return null;
    }

    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}

MetamaskChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MetamaskChecker;
