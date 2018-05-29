/* eslint-disable no-underscore-dangle */
// TODO: The previously suppressed error can actually be avoided with better syntax
import getWeb3Async from '../util/web3';
import * as API from '../constants/contracts/API';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import { MYBIT_TICKER_COINMARKETCAP, ETHEREUM_TICKER_COINMARKETCAP } from '../constants';

import { getCategoryFromAssetTypeHash, mergeAllLogsByAssetId } from '../util/helpers';

const web3 = getWeb3Async();

// Action constants
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';
export const FETCH_ASSETS = 'FETCH_ASSETS';
export const CHANGE_TRANSACTION_HISTORY_FILTERS = 'CHANGE_TRANSACTION_HISTORY_FILTERS';
export const FETCH_MYBIT_PRICE_USD = 'FETCH_MYBIT_PRICE_USD';
export const FETCH_MYBIT_PRICE_USD_SUCCESS = 'FETCH_MYBIT_PRICE_USD_SUCCESS';
export const FETCH_MYBIT_PRICE_USD_FAILURE = 'FETCH_MYBIT_PRICE_USD_FAILURE';
export const FETCH_ETHEREUM_PRICE_USD = 'FETCH_ETHEREUM_PRICE_USD';
export const FETCH_ETHEREUM_PRICE_USD_SUCCESS = 'FETCH_ETHEREUM_PRICE_USD_SUCCESS';
export const FETCH_ETHEREUM_PRICE_USD_FAILURE = 'FETCH_ETHEREUM_PRICE_USD_FAILURE';
export const LOAD_METAMASK_USER_DETAILS = 'LOAD_METAMASK_USER_DETAILS';
export const LOAD_METAMASK_USER_DETAILS_SUCCESS = 'LOAD_METAMASK_USER_DETAILS_SUCCESS';
export const LOAD_METAMASK_USER_DETAILS_FAILURE = 'LOAD_METAMASK_USER_DETAILS_FAILURE';

// Synchronous action creators
export const fetchAssetsSuccess = assets => ({ type: FETCH_ASSETS_SUCCESS, payload: { assets } });
export const fetchAssetsFailure = error => ({ type: FETCH_ASSETS_FAILURE, payload: { error } });
export const fetchMyBitPriceUSDSuccess =
    price => ({ type: FETCH_MYBIT_PRICE_USD_SUCCESS, payload: { price } });
export const fetchMyBitPriceUSDFailure =
    error => ({ type: FETCH_MYBIT_PRICE_USD_FAILURE, payload: { error } });
export const fetchEthereumPriceUSDSuccess =
    price => ({ type: FETCH_ETHEREUM_PRICE_USD_SUCCESS, payload: { price } });
export const fetchEthereumPriceUSDFailure =
    error => ({ type: FETCH_ETHEREUM_PRICE_USD_FAILURE, payload: { error } });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const setTransactionHistoryFilters = (itemsPerPage, currentPage, sortBy, sortDir) => ({
  type: CHANGE_TRANSACTION_HISTORY_FILTERS,
  payload: {
    itemsPerPage, currentPage, sortBy, sortDir,
  },
});
export const loadMetamaskUserDetailsSuccess =
    details => ({ type: LOAD_METAMASK_USER_DETAILS_SUCCESS, payload: { details } });
export const loadMetamaskUserDetailsFailure =
  error => ({ type: LOAD_METAMASK_USER_DETAILS_FAILURE, payload: { error } });

// Asynchronous action creators
export const loadMetamaskUserDetails = () => async (dispatch) => {
  dispatch({ type: LOAD_METAMASK_USER_DETAILS });
  try {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    // TODO: MyBit balance
    const details = { userName: accounts[0], ethBalance: web3.utils.fromWei(balance, 'ether'), myBitBalance: '0' };
    dispatch(loadMetamaskUserDetailsSuccess(details));
  } catch (error) {
    dispatch(loadMetamaskUserDetailsFailure(error));
  }
};

export const fetchPriceFromCoinmarketcap = ticker => async (dispatch) => {
  switch (ticker) {
    case MYBIT_TICKER_COINMARKETCAP:
      dispatch({ type: FETCH_MYBIT_PRICE_USD });
      break;
    case ETHEREUM_TICKER_COINMARKETCAP:
      dispatch({ type: FETCH_ETHEREUM_PRICE_USD });
      break;
    default:
      throw new Error('Invalid ticker provided to fetchPriceFromCoinmarketcap');
  }
  try {
    const response = await fetch(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`);
    const jsonResponse = await response.json();
    const { price } = jsonResponse.data.quotes.USD;
    switch (ticker) {
      case MYBIT_TICKER_COINMARKETCAP:
        dispatch({
          type: FETCH_MYBIT_PRICE_USD_SUCCESS,
          payload: { price: Math.round(price * 100) / 100 },
        });
        break;
      case ETHEREUM_TICKER_COINMARKETCAP:
        dispatch({
          type: FETCH_ETHEREUM_PRICE_USD_SUCCESS,
          payload: { price: Math.round(price * 100) / 100 },
        });
        break;
      default:
        throw new Error('Invalid ticker provided to fetchPriceFromCoinmarketcap');
    }
  } catch (error) {
    switch (ticker) {
      case MYBIT_TICKER_COINMARKETCAP:
        dispatch({ type: FETCH_MYBIT_PRICE_USD_FAILURE, payload: { error } });
        break;
      case ETHEREUM_TICKER_COINMARKETCAP:
        dispatch({ type: FETCH_ETHEREUM_PRICE_USD_FAILURE, payload: { error } });
        break;
      default:
        throw new Error('Invalid ticker provided to fetchPriceFromCoinmarketcap');
    }
  }
};

export const fetchAssets = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: FETCH_ASSETS });
  dispatch(fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP));
  try {
    const apiContract = new web3.eth.Contract(API.ABI, API.ADDRESS);
    const assetCreationContract = new web3.eth.Contract(AssetCreation.ABI, AssetCreation.ADDRESS);

    const logAssetInfoEvents =
      await assetCreationContract
        .getPastEvents('LogAssetInfo', { fromBlock: 0, toBlock: 'latest' });

    const logAssetFundingStartedEvents =
      await assetCreationContract
        .getPastEvents('LogAssetFundingStarted', { fromBlock: 0, toBlock: 'latest' });

    const logAssetInfo = logAssetInfoEvents
      .map(({ returnValues }) => returnValues)
      .map(object => ({
        assetID: object._assetID,
        installerID: object._installerID,
        amountToBeRaised: object._amountToBeRaised,
      }));

    const logAssetFundingStarted = logAssetFundingStartedEvents
      .map(({ returnValues }) => returnValues)
      .map(object => ({
        assetID: object._assetID,
        assetType: object._assetType,
        creator: object._creator,
      }));

    const combinedLogs =
      logAssetInfo
        // .concat(logAssetFundingSuccess)
        .concat(logAssetFundingStarted)
        .sort((a, b) => {
          if (a.assetID < b.assetID) { return -1; }
          if (a.assetID > b.assetID) { return 1; }
          return 0;
        });

    const assets = mergeAllLogsByAssetId(combinedLogs);

    const amountsRaised =
      await Promise.all(assets.map(async asset => apiContract.methods.amountRaised(asset.assetID)
        .call()));

    const assetsPlusRaised = assets.map((asset, index) => ({
      ...asset,
      amountRaisedInUSD: String(Number(web3.utils.fromWei(amountsRaised[index], 'ether')) * getState().misc.currentEthInUsd),
    }));

    const assetsWithCategories = assetsPlusRaised.map((asset) => {
      if (asset.assetType) {
        return { ...asset, category: getCategoryFromAssetTypeHash(web3, asset.assetType) };
      }
      return { ...asset };
    });
    dispatch(fetchAssetsSuccess(assetsWithCategories));
  } catch (error) {
    dispatch(fetchAssetsFailure(error));
  }
};

// TODO: as followed

// LogNewFunder from FundingHub which lists the funding of particular
// assets by event by owner (to be able to build up a user's portfolio) (also Kyle to help)

// Given a user, he should be able to fund a currently listed asset, looking for Payable functions,
// (Kyle to halp)

// Total asset revenue for an owner's owned assets and a breakdown by
// categories of the user's owned assets

// Transaction History functionality needs to be built (Kyle to halp)
