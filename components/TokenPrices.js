import {
  InternalLinks,
  LOAD_PRICES_TIME,
} from 'constants';

import {
  fetchWithCache,
} from 'utils/fetchWithCache';

const { Provider, Consumer } = React.createContext({});

export const withTokenPricesContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
        {state => <Component {...props} pricesContext={state} />}
      </Consumer>
    );
  };
}

class TokenPricesProvider extends React.PureComponent {
  constructor(props){
    super(props);
    this.tokenPricesEtag = '';
  }
  state = {
    loading: true,
    prices: {},
  }

  componentDidMount = () => {
    this.getPrices();
    this.intervalRefreshPrices = setInterval(this.getPrices, LOAD_PRICES_TIME);
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalRefreshPrices);
  }

  getPrices = async () => {
    try {
      const {
        prices: oldPrices,
      } = this.state;
      const response = await fetchWithCache(InternalLinks.PRICES, 'tokenPricesEtag', this);
      if(!response.isCached){
        const prices = response.data;
        let shouldUpdateState = false;
        for (const token of Object.keys(prices)) {
          const newPrice = prices[token].price;
          // Verify if we need to update the state
          if(oldPrices[token] && oldPrices[token].price !== newPrice || !oldPrices[token]){
            shouldUpdateState = true;
          }
        }
        if(shouldUpdateState){
          this.setState({
            prices,
            loading: false,
          })
        }
      }
    } catch (error) {
      console.log(error);
      if(!this.state.prices){
        this.getPrices();
      }
    }
  }

  render(){
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
};

export default TokenPricesProvider;
