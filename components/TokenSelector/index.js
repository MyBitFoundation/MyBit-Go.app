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
} from 'constants';

import TokenBalanceItem from 'ui/TokenBalanceItem';
import TokenSelectorSearch from './tokenSelectorSearch';
import Separator from 'ui/Separator';

const separatorStyle = {
  position: 'relative',
  top: '5px',
}

class TokenSelector extends React.Component {
  state = {
    selectedToken: null,
  }

  componentWillMount = () => {
    const {
      balances,
      amountToPay,
      onChange,
    } = this.props;

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
      selectedToken,
      totalTokens,
      tokensEnum,
      sortedBalances,
    })
    onChange(selectedToken);
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
      <Menu>
        <Menu.Item key="search">
          <TokenSelectorSearch
            placeholder="Search Token"
            onSearch={value => console.log(value)}
          />
        </Menu.Item>
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
    this.setState({selectedToken})
    this.props.onChange(selectedToken)
  }

  render(){
    const {
      selectedToken,
      tokensEnum,
      totalTokens,
      sortedBalances,
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
      >
        <Button>
          {selectedToken} <Icon type="down" />
        </Button>
      </Dropdown>
    )
  }
}

export default TokenSelector;
