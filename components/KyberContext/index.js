import PropTypes from 'prop-types';
import { LOAD_SUPPORTED_TOKENS_TIME } from 'constants/timers';
const SDK_CONTRACTS = require("@mybit/contracts/networks/ropsten/Contracts");
import {
  debug,
  fromWeiToEth,
  toWei,
} from 'utils/helpers';
import {
  getDefaultTokenContract,
  getPlatformTokenContract,
} from 'constants/app';
import {
  FALLBACK_NETWORK,
} from 'constants/supportedNetworks';
import {
  getSupportedTokens,
  getExpectedAndSlippage,
} from "utils/kyber";

const DEFAULT_QUANTITY = 0.5;
const { Provider, Consumer } = React.createContext({});
let kyberContract;

export const withKyberContextPageWrapper = (Component) => {
  return class Higher extends React.Component{
    render(){
      return (
        <Consumer>
          {state =>
            <Component
              {...this.props}
              supportedTokensInfo={state.supportedTokensInfo}
              kyberLoading={state.loading}
              kyberNetwork={state.network}
            />
          }
        </Consumer>
      )
    }
  }
}

export const withKyberContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
        {state =>
          <Component
            {...props}
            supportedTokensInfo={state.supportedTokensInfo}
            kyberLoading={state.loading}
            kyberNetwork={state.network}
          />
        }
      </Consumer>
    );
  };
}

class KyberProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      fetching: false,
    }
  }

  componentDidMount() {
    const { network, userHasMetamask } = this.props;
    this.fetchSupportedTokens(network);
  }

  async fetchSupportedTokens(network) {
    if (this.state.fetching) {
      return;
    }

    const {
       userHasMetamask,
       supportedNetworks,
      } = this.props;

    this.setState({ fetching: true });
    network = this.props.network || FALLBACK_NETWORK;
    const supportedTokensInfo = {};

    if(supportedNetworks.includes(network) || !userHasMetamask){
      const supportedTokens = await getSupportedTokens(network);
      // const supportedTokensData = await supportedTokens.json();
      const supportedTokensData = supportedTokens.data;
      const DEFAULT_TOKEN_CONTRACT = getDefaultTokenContract(network);
      const PLATFORM_TOKEN_CONTRACT = getPlatformTokenContract(network);
      const amountToConvert = toWei(DEFAULT_QUANTITY);

      await Promise.all(supportedTokensData.data.map(async({
        symbol,
        address: contractAddress,
        name,
        decimals,
      }) => {
        if(symbol === 'ETH'){
          const [
            exchangeRateDefaultToken,
            exchangeRatePlatformToken,
          ] = await Promise.all([
            getExpectedAndSlippage(contractAddress, DEFAULT_TOKEN_CONTRACT, amountToConvert),
            getExpectedAndSlippage(contractAddress, PLATFORM_TOKEN_CONTRACT, amountToConvert),
          ])

          supportedTokensInfo['ETH'] = {
            contractAddress,
            name,
            decimals: 18,
            exchangeRateDefaultToken,
            exchangeRatePlatformToken,
          }
        } else {
          const [
            exchangeRateDefaultToken,
            exchangeRatePlatformToken,
          ] = await Promise.all([
            getExpectedAndSlippage(contractAddress, DEFAULT_TOKEN_CONTRACT, amountToConvert),
            getExpectedAndSlippage(contractAddress, PLATFORM_TOKEN_CONTRACT, amountToConvert),
          ])

          // This kind of filtering needs to be tested
          if(exchangeRateDefaultToken && exchangeRatePlatformToken){
            supportedTokensInfo[symbol] = {
              contractAddress,
              name,
              decimals,
              exchangeRateDefaultToken,
              exchangeRatePlatformToken,
            }
          }
        }
      }));
    }

    this.setState({
      supportedTokensInfo,
      loading: false,
      fetching: false,
      network,
    })
  }

  render = () => {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

export default KyberProvider;
