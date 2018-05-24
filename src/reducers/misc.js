import { FETCH_MYBIT_PRICE_USD, FETCH_ETHEREUM_PRICE_USD } from '../actions';

const initialState = {};

const misc = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MYBIT_PRICE_USD:
      return { ...state, currentMybitInUsd: action.payload };
    case FETCH_ETHEREUM_PRICE_USD:
      return { ...state, currentEthInUsd: action.payload };
    default:
      return state;
  }
};

export default misc;
