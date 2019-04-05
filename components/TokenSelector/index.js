import {
  Dropdown,
  Menu,
  Input,
  Icon,
  Button,
} from 'antd';
import {
  formatMonetaryValue,
} from 'utils/helpers';
import {
  DEFAULT_TOKEN,
} from 'constants/app';

import TokenBalanceItem from 'ui/TokenBalanceItem';
import TokenSelectorSearch from './tokenSelectorSearch';
import Separator from 'ui/Separator';

const separatorStyle = {
  position: 'relative',
  top: '5px',
}

class TokenSelector extends React.Component {
  state = {
    selectedToken: DEFAULT_TOKEN,
  }

  componentWillMount = () => {
    this.processBalances(this.props, true);
  }

  componentWillReceiveProps = (nextProps) => {
    const {
      balances,
      amountToPay,
    } = this.props;

    if(nextProps.balances != balances || nextProps.amountToPay !== amountToPay){
      this.processBalances(nextProps, false);
    }
  }

  processBalances = (props, callOnChange) => {
    const {
      balances,
      amountToPay,
      onChange,
    } = props;

    let selectedToken;
    const tokensEnum = balances ? Object.entries(balances) : [];
    const totalTokens = tokensEnum.length;
    const sortedBalances = this.getSortedBalances(tokensEnum, amountToPay);

    if(totalTokens === 0 || !sortedBalances[0].enoughFunds){
      selectedToken = DEFAULT_TOKEN;
    } else {
      selectedToken = sortedBalances[0].symbol;
    }

    this.setState({
      selectedToken: callOnChange ? selectedToken : this.state.selectedToken,
      totalTokens,
      tokensEnum,
      sortedBalances,
      sortedBalancesBackup: sortedBalances,
    })

    if(callOnChange) {
      onChange(selectedToken);
    }
  }

  handleSearchInputChanged = (e) => {
    const {
      sortedBalances,
      sortedBalancesBackup,
    } = this.state;

    const searchValue = e.target.value;
    if(searchValue.trim() === ''){
      this.setState({
        sortedBalances: sortedBalancesBackup,
      })
      return;
    }
    const matches = sortedBalancesBackup.filter(balance => balance.symbol.includes(searchValue.toUpperCase()))
    this.setState({
      sortedBalances: matches,
    })
  }

  getSortedBalances = (tokensEnum, amountToPay) => {
    const balancesToReturn = tokensEnum.map(([symbol, value]) => {
      const {
        balance,
        balanceInDai,
      } = value;

      return {
        enoughFunds: value.balanceInDai > amountToPay,
        symbol,
        balance,
        balanceInDai,
      }
    });

    balancesToReturn.sort((a, b) => b.balanceInDai - a.balanceInDai);
    return balancesToReturn;
  }

  getMenu = (balances, totalTokens, amountToPay) => {
    return (
      <Menu style={{minHeight: '250px', minWidth: '284px'}}>
        <TokenSelectorSearch
          placeholder="Search Token"
          onChange={this.handleSearchInputChanged}
        />
      {balances.map((value, index) => {
        const {
          balance,
          balanceInDai,
          enoughFunds,
          symbol,
        } = value;
        return (
          <Menu.Item
            key={symbol}
            onClick={() => this.handleItemClicked(symbol)}
            disabled={!enoughFunds}
          >
            <TokenBalanceItem
              name={symbol}
              balance={formatMonetaryValue(balance, 0, false)}
              balanceInDai={formatMonetaryValue(balanceInDai)}
              enoughFunds={enoughFunds}
            />
            {(index !== totalTokens - 1) && <Separator style={separatorStyle}/>}
          </Menu.Item>
        )}
      )}
      </Menu>
    )
  }

  handleItemClicked = (selectedToken) => {
    this.setState({
      selectedToken,
      visible: false,
    })
    this.props.onChange(selectedToken)
  }

  render(){
    const {
      selectedToken,
      tokensEnum,
      totalTokens,
      sortedBalances,
      visible,
    } = this.state;

    const {
      amountToPay,
      balances,
    } = this.props;

    const overlay = this.getMenu(sortedBalances, totalTokens, amountToPay);

    return (
      <Dropdown
        overlay={overlay}
        placement="topRight"
        disabled={totalTokens === 0}
        visible={visible}
        onVisibleChange={visible => this.setState({visible})}
      >
        <Button>
          {selectedToken} <Icon type="down" />
        </Button>
      </Dropdown>
    )
  }
}

export default TokenSelector;
