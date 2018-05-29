import * as Actions from '../actions';

const initialState = {
  assets: true,
  priceMybit: true,
  priceEther: true,
  user: true,
  transactionHistory: true,
  portfolio: true,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_ETHEREUM_PRICE_USD:
      return { ...state, priceEther: true };
    case Actions.FETCH_MYBIT_PRICE_USD:
      return { ...state, priceMybit: true };
    case Actions.FETCH_ETHEREUM_PRICE_USD_SUCCESS:
    case Actions.FETCH_ETHEREUM_PRICE_USD_FAILURE:
      return { ...state, priceEther: false };
    case Actions.FETCH_MYBIT_PRICE_USD_SUCCESS:
    case Actions.FETCH_MYBIT_PRICE_USD_FAILURE:
      return { ...state, priceMybit: false };
    case Actions.FETCH_ASSETS:
      return { ...state, assets: true };
    case Actions.FETCH_ASSETS_SUCCESS:
    case Actions.FETCH_ASSETS_FAILURE:
      return { ...state, assets: false };
    case Actions.RESET_STATE:
      return {
        assets: true,
        priceMybit: true,
        priceEther: true,
        user: true,
        transactionHistory: true,
        portfolio: true,
      };
    case Actions.FILL_STATE:
      return {
        assets: false,
        priceMybit: false,
        priceEther: false,
        user: false,
        transactionHistory: false,
        portfolio: false,
      };
    default:
      return state;
  }
};

export default loading;
