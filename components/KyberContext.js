import PropTypes from 'prop-types';
import { LOAD_SUPPORTED_TOKENS_TIME } from 'constants/timers';
const SDK_CONTRACTS = require("@mybit/contracts/networks/ropsten/Contracts");
import {
  debug,
} from 'utils/helpers';

const { Provider, Consumer } = React.createContext({});

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
          {state => <Component {...this.props} supportedTokensInfo={state && state.supportedTokensInfo} />}
        </Consumer>
      )
    }
  }
}

class KyberProvider extends React.Component {
  constructor(props){
    super(props);
    this.key = 0;
  }

  componentDidMount = async () => {
    try {
      this.fetchSupportedTokens();
    } catch (err) {
      debug(err);
    }
    this.intervalSupportedTokens = setInterval(this.fetchSupportedTokens, 5000)
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalSupportedTokens);
  }

  fetchSupportedTokens = async () => {
    try{
      const [
        supportedTokens,
        prices,
      ] = await Promise.all([
        fetch('https://ropsten-api.kyber.network/currencies'),
        fetch('https://tracker.kyber.network/api/tokens/pairs'),
      ])

      const [
        supportedTokensData,
        pricesData,
      ] = await Promise.all([
        supportedTokens.json(),
        prices.json(),
      ])

      const supportedTokensInfo = {};
      for(const token of supportedTokensData.data){
        const {
          symbol,
          address: contractAddress,
          name,
        } = token;

        if(symbol === 'ETH'){
          supportedTokensInfo['ETH'] = {
            contractAddress,
            name,
            decimals: 18,
          }
        } else {
          const tokenPriceInfo = pricesData[`ETH_${symbol}`];
          if(tokenPriceInfo){
            const {
              currentPrice,
              decimals,
            } = tokenPriceInfo;
            supportedTokensInfo[symbol] = {
              contractAddress,
              name,
              currentPrice,
              decimals,
            }
          }
        }
      }

      // TODO Remove once Kyber adds us
      supportedTokensInfo['MYB'] = {
        contractAddress: SDK_CONTRACTS.MyBitToken,
        currentPrice: 0.00005761,
        decimals: 18,
        name: "MYB",
      };

      supportedTokensInfo['key'] = this.key + 1;
      this.key += 1;

      debug("supportedTokensInfo (kyberContext): ", supportedTokensInfo);
      this.setState({
        supportedTokensInfo,
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
