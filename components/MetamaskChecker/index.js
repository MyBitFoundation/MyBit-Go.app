/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Web3 from 'web3';
import { withKyberContext } from 'components/KyberContext';
import {
  METAMASK_FIREFOX,
  METAMASK_CHROME,
  METAMASK_OPERA,
  PROVIDER_ROPSTEN,
  CORRECT_NETWORK,
  METAMASK_ERRORS,
} from './constants';

import {
  getBalanceOfERC20Token,
  getBalanceInDai,
} from './utils';
import SupportedBrowsers from 'ui/SupportedBrowsers';

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
      loadingBalances: true,
    };
    this.hasSetInitialState = false;
  };

 metamaskErrors = className => {
    const {
      userHasMetamask,
      extensionUrl,
      userIsLoggedIn,
      network,
      privacyModeEnabled
    } = this.state;

    console.log(this.state)

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
            <SupportedBrowsers />
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

  componentWillReceiveProps = nextProps => {
    const {
      supportedTokensInfo,
    } = this.props;
    const {
      user,
    } = this.state;

    //if(nextProps.supportedTokensInfo !== supportedTokensInfo && user.address){
      this.getUserInfo(this.state.privacyModeEnabled, this.state.network, nextProps.supportedTokensInfo);
    //}
  }

  fetchUserBalances = async (supportedTokensInfo, ethBalance, userAddress, cb) => {
    const updatedTokensWithBalance = {};
    let sumOfBalances = 0;

    const balances = await Promise.all(Object.entries(supportedTokensInfo).map(async ([
      symbol,
      tokenData,
    ]) => {
      let balance = 0;
      if(symbol === 'ETH'){
        balance = ethBalance;
      } else {
        balance = await getBalanceOfERC20Token(tokenData.contractAddress, tokenData.decimals, userAddress);
      }
      // we are only interested in listing balances > 0
      if(balance > 0){
        const balanceInDai = getBalanceInDai(supportedTokensInfo, symbol, balance);
        sumOfBalances += balanceInDai;
        updatedTokensWithBalance[symbol] = {
          ...tokenData,
          balance,
          balanceInDai,
        }
      }
    }));

    this.setState({
      ...this.state,
      loadingBalances: false,
      user: {
        ...this.state.user,
        balances: updatedTokensWithBalance,
        avgBalance: Number(parseFloat(sumOfBalances.toFixed(2))),
      },
    });
  }

  isReadOnlyMode = (userHasMetamask, userIsLoggedIn, network, privacyModeEnabled) => {
    return !userHasMetamask || !userIsLoggedIn || network !== CORRECT_NETWORK || privacyModeEnabled === undefined;
  }

  updateStateWithUserInfo = (privacyModeEnabled, network, ethBalance, address, userIsLoggedIn, supportedTokensInfo) => {
    const {
      privacyModeEnabled : oldPrivacyModeEnabled,
      network: oldNetwork,
      user: oldUser,
    } = this.state;

    const {
      address: oldAddress,
    } = oldUser;

    const supportedTokens = supportedTokensInfo || this.props.supportedTokensInfo;
    //TODO bad. need a way to know when to refresh, we need a more specific flag from the kyberContext component
    if(supportedTokens){
      this.fetchUserBalances(supportedTokens, ethBalance, address);
    }

    if(oldPrivacyModeEnabled !== privacyModeEnabled || oldNetwork !== network || oldUser.address !== address ){
      this.setState({
        network,
        user: {
          ...this.state.user,
          address,
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

  getUserInfo = async (privacyModeEnabled, network, supportedTokensInfo) => {
    try{
      network = network || this.state.network;
      const accounts = await window.web3js.eth.getAccounts();
      const userIsLoggedIn = await this.checkIfLoggedIn();
      if(accounts && accounts.length > 0){
        let ethBalance;
        while(!ethBalance){
          ethBalance = await window.web3js.eth.getBalance(accounts[0]);
        }
        ethBalance = Number(window.web3js.utils.fromWei(ethBalance, 'ether'));

        this.updateStateWithUserInfo(privacyModeEnabled, network, ethBalance, accounts[0], userIsLoggedIn, supportedTokensInfo);
      } else {
        this.updateStateNoAccess(privacyModeEnabled, network, userIsLoggedIn);
      }
    }catch(err){
      console.log(err)
      this.getUserInfo(privacyModeEnabled, network, supportedTokensInfo);
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
      loadingBalances: false,
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

export default withKyberContext(MetamaskChecker);
