import React, { Component } from 'react';

import { parseEtherFromBalance } from '../util/helpers';
import { ARTIFICIAL_DELAY_IN_MS, debug } from '../constants';

const renderAccountsBalanceInfo = (accounts, loadingBalance, accountsMap, loadBalance) => {
  const getAccountEthBalance =
      account => (accountsMap[account] ? ` ${accountsMap[account]} ETH ` : ' N/A ETH ');
  const getAccountBalance =
      account => (loadingBalance ? ' Loading your balance ' : getAccountEthBalance(account));
  return accounts.map(account => (
    <pre key={account}>
      Account: {account}<br />
      Balance: {getAccountBalance(account)}
      <button onClick={() => loadBalance(account)}>Get Balance</button>
    </pre>
  ));
};

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountsMap: {},
      loadingAccounts: false,
      loadingBalance: false,
    };
    this.loadBalance = this.loadBalance.bind(this);
  }
  async componentWillMount() {
    const { web3 } = this.props;
    this.setState({ loadingAccounts: true });
    setTimeout(async () => {
      debug('Loading accounts...');
      const accounts = await web3.eth.getAccountsAsync();
      debug('Accounts loaded.');
      this.setState({ loadingAccounts: false, accounts });
    }, ARTIFICIAL_DELAY_IN_MS);
  }
  async loadBalance(account) {
    const { web3 } = this.props;
    this.setState({ loadingBalance: true });
    setTimeout(async () => {
      const balance = await parseEtherFromBalance(
        web3,
        await web3.eth.getBalanceAsync(account),
      );
      const { accountsMap } = this.state;
      debug('Balance for account', account, balance);
      this.setState({
        loadingBalance: false,
        accountsMap: Object.assign(accountsMap, { [account]: balance }),
      });
    }, ARTIFICIAL_DELAY_IN_MS);
  }
  render() {
    return (
      <div>
        {this.state.loadingAccounts && <span>Loading...</span>}
        {this.state.accounts.length > 0 && (
          <div>
            {renderAccountsBalanceInfo(
              this.state.accounts,
              this.state.loadingBalance,
              this.state.accountsMap,
              this.loadBalance,
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Accounts;
