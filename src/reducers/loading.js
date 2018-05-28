import * as Actions from '../actions';

const initialState = {
  assets: true,
  prices: true,
  user: true,
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FETCH_ETHEREUM_PRICE_USD:
    case Actions.FETCH_MYBIT_PRICE_USD:
      return { ...state, prices: true };
    case Actions.FETCH_ETHEREUM_PRICE_USD_SUCCESS:
    case Actions.FETCH_ETHEREUM_PRICE_USD_FAILURE:
    case Actions.FETCH_MYBIT_PRICE_USD_SUCCESS:
    case Actions.FETCH_MYBIT_PRICE_USD_FAILURE:
      return { ...state, prices: false };
    case Actions.FETCH_ASSETS:
      return { ...state, assets: true };
    case Actions.FETCH_ASSETS_SUCCESS:
    case Actions.FETCH_ASSETS_FAILURE:
      return { ...state, assets: false };
    default:
      return state;
  }
};

export default loading;
