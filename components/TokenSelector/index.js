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
import TokenSelectorSearchWrapper from './tokenSelectorSearchWrapper';
import TokenSelectorAmount from './tokenSelectorAmount';
import TokenSelectorNoResults from './tokenSelectorNoResults';

const separatorStyle = {
  position: 'relative',
  top: '5px',
}

class TokenSelector extends React.Component {
  state = {
    selectedToken: DEFAULT_TOKEN,
    hoveringToken: null,
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

  onHover = (hoveringToken) => {
    if(hoveringToken !== this.state.hoveringToken){
      this.setState({hoveringToken})
    }
  }

  onMouseOut = () => {
    if(this.state.hoveringToken){
      this.setState({hoveringToken: undefined})
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

  getTokenToConvertFrom = () => {
    const {
      sortedBalances,
    } = this.state;

    return sortedBalances.length > 0 && sortedBalances[0].symbol.toLowerCase();
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
    const {
      hoveringToken,
      sortedBalancesBackup,
    } = this.state;

    const tokenToConvertFrom = hoveringToken && this.getTokenToConvertFrom();

    return (
      <Menu style={{minHeight: '268px', minWidth: '284px'}}>
        <TokenSelectorSearchWrapper
          key="search"
        >
          <TokenSelectorSearch
            placeholder="Search Token"
            onChange={this.handleSearchInputChanged}
          />
          <div>
            <TokenSelectorAmount>
              Amount: <span>{formatMonetaryValue(amountToPay)}</span>
            </TokenSelectorAmount>
          </div>
          {(balances.length === 0 && sortedBalancesBackup.length > 0) && (
            <TokenSelectorNoResults>
              No results
            </TokenSelectorNoResults>
          )}
        </TokenSelectorSearchWrapper>
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
            onMouseOver={!enoughFunds ? this.onHover.bind(this, symbol) : undefined}
            onMouseOut={!enoughFunds ? this.onMouseOut.bind(this, symbol) : undefined}
          >
            <TokenBalanceItem
              name={symbol}
              balance={formatMonetaryValue(balance, symbol, false)}
              balanceInDai={formatMonetaryValue(balanceInDai)}
              enoughFunds={enoughFunds}
              hovering={hoveringToken === symbol}
              tokenToConvertFrom={tokenToConvertFrom}
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
