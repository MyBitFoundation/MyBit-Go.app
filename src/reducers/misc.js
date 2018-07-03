import { FETCH_MYBIT_PRICE_USD_SUCCESS, FETCH_ETHEREUM_PRICE_USD_SUCCESS } from '../actions';

const initialState = {};

const misc = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MYBIT_PRICE_USD_SUCCESS:
      return { ...state, currentMybitInUsd: action.payload.price };
    case FETCH_ETHEREUM_PRICE_USD_SUCCESS:
      return { ...state, currentEthInUsd: action.payload.price };
    default:
      return state;
  }
};

export default misc;
