import PropTypes from 'prop-types';
import { LOAD_SUPPORTED_TOKENS_TIME } from 'constants/timers';
const SDK_CONTRACTS = require("@mybit/contracts/networks/ropsten/Contracts");
import {
  debug,
  fromWeiToEth,
} from 'utils/helpers';
import {
  ABI,
  ADDRESS,
} from './constants';
import {
  DEFAULT_TOKEN_CONTRACT,
  PLATFORM_TOKEN_CONTRACT,
} from 'constants/app';

const { Provider, Consumer } = React.createContext({});
let contract;
// Required so we can trigger getInitialProps in our exported pages
export const withKyberContext = (Component) => {
  return class Higher extends React.Component{
    static getInitialProps(ctx) {
      if(Component.getInitialProps)
        return Component.getInitialProps(ctx);
      else return {};
    }
    render(){
      return (
        <Consumer>
          {state => <Component {...this.props} supportedTokensInfo={state.supportedTokensInfo} kyberLoading={state.loading}/>}
        </Consumer>
      )
    }
  }
}

export const getExpectedAndSlippage = async (src, dest, amount) => {
    try{
      if(src === dest){
        return {
          expectedRate: 1,
          slippageRate: 1,
        };
      }
      if(!contract){
        contract = new window.web3js.eth.Contract(ABI, ADDRESS);
      }

      const result = await contract.methods.getExpectedRate(src, dest, amount).call();
      let {
        expectedRate,
        slippageRate,
      } = result;

      if(expectedRate !== '0'){
        expectedRate = fromWeiToEth(expectedRate);
        slippageRate = fromWeiToEth(slippageRate);

        return {
          expectedRate,
          slippageRate,
        };
      }
    } catch(err) {
      // Might mean token is under maintenance
    }
    return null;
  }

class KyberProvider extends React.Component {
  constructor(props){
    super(props);
    this.key = 0;
    this.state = {
      loading: true,
    }
  }

  componentDidMount = async () => {
    try {
      this.fetchSupportedTokens();
    } catch (err) {
      debug(err);
    }
    this.intervalSupportedTokens = setInterval(this.fetchSupportedTokens, LOAD_SUPPORTED_TOKENS_TIME)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalSupportedTokens);
  }

  fetchSupportedTokens = async () => {
    try{
      const supportedTokens = await fetch('https://ropsten-api.kyber.network/currencies');

      const supportedTokensData = await supportedTokens.json();

      const supportedTokensInfo = {};
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
            getExpectedAndSlippage(contractAddress, DEFAULT_TOKEN_CONTRACT, '1000000000000000000'),
            getExpectedAndSlippage(contractAddress, PLATFORM_TOKEN_CONTRACT, '1000000000000000000'),
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
            getExpectedAndSlippage(contractAddress, DEFAULT_TOKEN_CONTRACT, '1000000000000000000'),
            getExpectedAndSlippage(contractAddress, PLATFORM_TOKEN_CONTRACT, '1000000000000000000'),
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

      console.log(supportedTokensInfo)

      supportedTokensInfo['key'] = this.key + 1;
      this.key += 1;

      //debug("supportedTokensInfo (kyberContext): ", supportedTokensInfo);
      this.setState({
        supportedTokensInfo,
        loading: false,
      })
    }catch(err){
      debug("kyberContext error: ", err);
    }
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
