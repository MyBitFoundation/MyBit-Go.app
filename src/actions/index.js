import axios from 'axios';
import { debug, MYBIT_TICKER_COINMARKETCAP, ETHEREUM_TICKER_COINMARKETCAP } from '../constants';

// Action constants
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';
export const FETCH_ASSETS = 'FETCH_ASSETS';
export const CHANGE_TRANSACTION_HISTORY_FILTERS = 'CHANGE_TRANSACTION_HISTORY_FILTERS';
export const FETCH_MYBIT_PRICE_USD = 'FETCH_MYBIT_PRICE_USD';
export const FETCH_ETHEREUM_PRICE_USD = 'FETCH_ETHEREUM_PRICE_USD';

// Actions for storybook
export const RESET_STATE = 'RESET_STATE';
export const FILL_STATE = 'FILL_STATE';

// Synchronous action creators
export const resetState = () => ({ type: RESET_STATE });
export const fillState = newState => ({ type: FILL_STATE, payload: newState });
export const fetchAssetsSuccess = assets => ({ type: FETCH_ASSETS_SUCCESS, payload: { assets } });
export const fetchAssetsFailure = error => ({ type: FETCH_ASSETS_FAILURE, payload: { error } });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const setTransactionHistoryFilters = (itemsPerPage, currentPage, sortBy, sortDir) => ({
  type: CHANGE_TRANSACTION_HISTORY_FILTERS,
  payload: {
    itemsPerPage, currentPage, sortBy, sortDir,
  },
});

// Asynchronous action creators
export const fetchAssets = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: FETCH_ASSETS });
  try {
    getState(); // TODO: Get the user credentials, etc
    // TODO: Fetch with web3
    const data = [1, 2, 3];
    dispatch(fetchAssetsSuccess(data));
  } catch (error) {
    dispatch(fetchAssetsFailure(error));
  }
};

export const fetchPriceFromCoinmarketcap = ticker => async (dispatch) => {
  axios
    .get(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`)
    .then((response) => {
      try {
        const { price } = response.data.data.quotes.USD;

        if (ticker === MYBIT_TICKER_COINMARKETCAP) {
          dispatch({ type: FETCH_MYBIT_PRICE_USD, payload: Math.round(price * 1e2) / 1e2 });
        } else if (ticker === ETHEREUM_TICKER_COINMARKETCAP) {
          dispatch({ type: FETCH_ETHEREUM_PRICE_USD, payload: Math.round(price * 1e2) / 1e2 });
        }
      } catch (err) {
        debug(err);
      }
    }).catch(err => debug(err));
};
