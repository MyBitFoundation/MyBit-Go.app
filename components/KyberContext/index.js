import PropTypes from 'prop-types';
import { LOAD_SUPPORTED_TOKENS_TIME } from 'constants/timers';
import {
  debug,
  fromWeiToEth,
  toWei,
} from 'utils/helpers';
import {
  ABI,
  ADDRESS,
  getSupportedTokensUrl,
} from './constants';
import {
  getDefaultTokenContract,
  getPlatformTokenContract,
} from 'constants/app';
import {
  FALLBACK_NETWORK,
} from 'constants/supportedNetworks';

const SDK_CONTRACTS = require('@mybit/contracts/networks/ropsten/Contracts');

const DEFAULT_QUANTITY = 0.5;
const { Provider, Consumer } = React.createContext({});
let kyberContract;
// Required so we can trigger getInitialProps in our exported pages
export const withKyberContextPageWrapper = Component => class Higher extends React.Component {
  static getInitialProps(ctx) {
    if (Component.getInitialProps) return Component.getInitialProps(ctx);
    return {};
  }

  render() {
    return (
      <Consumer>
        {state => (
          <Component
            {...this.props}
            supportedTokensInfo={state.supportedTokensInfo}
            kyberLoading={state.loading}
            kyberNetwork={state.network}
          />
        )}
      </Consumer>
    );
  }
};

export const withKyberContext = Component => function WrapperComponent(props) {
  return (
    <Consumer>
      {state => (
        <Component
          {...props}
          supportedTokensInfo={state.supportedTokensInfo}
          kyberLoading={state.loading}
          kyberNetwork={state.network}
        />
      )}
    </Consumer>
  );
};

export const getExpectedAndSlippage = async (src, dest, amount) => {
  try {
    if (src === dest) {
      return {
        expectedRate: 1,
        slippageRate: 1,
      };
    }

    const result = await kyberContract.methods.getExpectedRate(src, dest, amount).call();
    let {
      expectedRate,
      slippageRate,
    } = result;

    if (expectedRate !== '0') {
      expectedRate = fromWeiToEth(expectedRate);
      slippageRate = fromWeiToEth(slippageRate);

      return {
        expectedRate,
        slippageRate,
      };
    }
  } catch (e) {
    console.error(e);
    // Might mean token is under maintenance
  }
  return null;
};

class KyberProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalSupportedTokens);
  }

  componentDidUpdate = (prevProps) => {
    const {
      network: oldNetwork,
      userHasMetamask: oldUserHasMetamask,
    } = prevProps;

    const {
      network: newNetwork,
      userHasMetamask,
    } = this.props;


    if (oldNetwork !== newNetwork) {
      this.setState({ loading: true });
      this.fetchSupportedTokens(newNetwork);
    } else if (!oldUserHasMetamask && userHasMetamask) {
      kyberContract = new window.web3js.eth.Contract(ABI, ADDRESS);
      this.fetchSupportedTokens();
      this.intervalSupportedTokens = setInterval(this.fetchSupportedTokens, LOAD_SUPPORTED_TOKENS_TIME);
    }
  }

  fetchSupportedTokens = async (network) => {
    try {
      const {
        userHasMetamask,
        supportedNetworks,
      } = this.props;

      network = this.props.network || FALLBACK_NETWORK;

      const supportedTokensInfo = {};

      if (supportedNetworks.includes(network) || !userHasMetamask) {
        const supportedTokens = await fetch(getSupportedTokensUrl(network));
        const supportedTokensData = await supportedTokens.json();
        const DEFAULT_TOKEN_CONTRACT = getDefaultTokenContract(network);
        const PLATFORM_TOKEN_CONTRACT = getPlatformTokenContract(network);

        const amountToConvert = toWei(DEFAULT_QUANTITY);
        await Promise.all(supportedTokensData.data.map(async ({
          symbol,
          address: contractAddress,
          name,
          decimals,
        }) => {
          if (symbol === 'ETH') {
            const [
              exchangeRateDefaultToken,
              exchangeRatePlatformToken,
            ] = await Promise.all([
              getExpectedAndSlippage(contractAddress, DEFAULT_TOKEN_CONTRACT, amountToConvert),
              getExpectedAndSlippage(contractAddress, PLATFORM_TOKEN_CONTRACT, amountToConvert),
            ]);

            supportedTokensInfo['ETH'] = {
              contractAddress,
              name,
              decimals: 18,
              exchangeRateDefaultToken,
              exchangeRatePlatformToken,
            };
          } else {
            const [
              exchangeRateDefaultToken,
              exchangeRatePlatformToken,
            ] = await Promise.all([
              getExpectedAndSlippage(contractAddress, DEFAULT_TOKEN_CONTRACT, amountToConvert),
              getExpectedAndSlippage(contractAddress, PLATFORM_TOKEN_CONTRACT, amountToConvert),
            ]);

            // This kind of filtering needs to be tested
            if (exchangeRateDefaultToken && exchangeRatePlatformToken) {
              supportedTokensInfo[symbol] = {
                contractAddress,
                name,
                decimals,
                exchangeRateDefaultToken,
                exchangeRatePlatformToken,
              };
            }
          }
        }));
      }

      this.setState({
        supportedTokensInfo,
        loading: false,
        network,
      });
    } catch (err) {
      debug('kyberContext error: ', err);
    }
  }

  render = () => (
    <Provider value={this.state}>
      {this.props.children}
    </Provider>
  )
}

export default KyberProvider;
