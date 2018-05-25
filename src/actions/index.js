/* eslint-disable no-underscore-dangle */
// TODO: The previously suppressed error can actually be avoided with better syntax
import getWeb3Async from '../util/web3';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import * as FundingHub from '../constants/contracts/FundingHub';
import { MYBIT_TICKER_COINMARKETCAP, ETHEREUM_TICKER_COINMARKETCAP } from '../constants';

import { mergeAllLogsByAssetId, mergeAndSumFundingEvents } from '../util/helpers';
import { getCategoryFromAssetTypeHash, mergeAllLogsByAssetId, mergeAndSumFundingEvents } from '../util/helpers';

const web3 = getWeb3Async();

// Action constants
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';
export const FETCH_ASSETS = 'FETCH_ASSETS';
export const FETCH_MYBIT_PRICE_USD = 'FETCH_MYBIT_PRICE_USD';
export const FETCH_MYBIT_PRICE_USD_SUCCESS = 'FETCH_MYBIT_PRICE_USD_SUCCESS';
export const FETCH_MYBIT_PRICE_USD_FAILURE = 'FETCH_MYBIT_PRICE_USD_FAILURE';
export const FETCH_ETHEREUM_PRICE_USD = 'FETCH_ETHEREUM_PRICE_USD';
export const FETCH_ETHEREUM_PRICE_USD_SUCCESS = 'FETCH_ETHEREUM_PRICE_USD_SUCCESS';
export const FETCH_ETHEREUM_PRICE_USD_FAILURE = 'FETCH_ETHEREUM_PRICE_USD_FAILURE';

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

// Asynchronous action creators
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
    const jsonResponse = response.json();
    const { price } = jsonResponse.data.data.quotes.USD;
    switch (ticker) {
      case MYBIT_TICKER_COINMARKETCAP:
        dispatch({ type: FETCH_MYBIT_PRICE_USD_SUCCESS, payload: { price } });
        break;
      case ETHEREUM_TICKER_COINMARKETCAP:
        dispatch({ type: FETCH_ETHEREUM_PRICE_USD_SUCCESS, payload: { price } });
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
  try {
    getState();
    const assetCreationContract = new web3.eth.Contract(AssetCreation.ABI, AssetCreation.ADDRESS);
    const fundingHubContract = new web3.eth.Contract(FundingHub.ABI, FundingHub.ADDRESS);

    const logAssetInfoEvents =
      await assetCreationContract
        .getPastEvents('LogAssetInfo', { fromBlock: 0, toBlock: 'latest' });
    const logAssetFundingSuccessEvents =
      await fundingHubContract
        .getPastEvents('LogAssetFundingSuccess', { fromBlock: 0, toBlock: 'latest' });
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
    const logAssetFundingSuccess = logAssetFundingSuccessEvents
      .map(({ returnValues }) => returnValues)
      .map(object => ({
        assetID: object._assetID,
        currentEthPrice: object._currentEthPrice,
        timestamp: object._timestamp,
      }))
      .sort((a, b) => {
        if (a.assetID < b.assetID) { return -1; }
        if (a.assetID > b.assetID) { return 1; }
        return 0;
      });
    const logAssetFundingStarted = logAssetFundingStartedEvents
      .map(({ returnValues }) => returnValues)
      .map(object => ({
        assetID: object._assetID,
        assetType: object._assetType,
        creator: object._creator,
      }));

    const talliedLogsAssetFundingSuccess = mergeAndSumFundingEvents(logAssetFundingSuccess);

    const combinedLogs =
      logAssetInfo
        .concat(talliedLogsAssetFundingSuccess)
        .concat(logAssetFundingStarted)
        .sort((a, b) => {
          if (a.assetID < b.assetID) { return -1; }
          if (a.assetID > b.assetID) { return 1; }
          return 0;
        });

    const assets = mergeAllLogsByAssetId(combinedLogs);
    dispatch(fetchAssetsSuccess(assets));
  } catch (error) {
    dispatch(fetchAssetsFailure(error));
  }
};

// TODO: as followed

// Categories from AssetCreation/LogAssetFundingStarted comes from _assetType

// Creator of an asset which comes from AssetCreation/LogAssetFundingStarted
// from _creator

// Funds raised and funding goals coming from AssetCreation/LogAssetInfo events and
// FundingHub/LogAssetFundingSuccess (frontend note: more fetchAssets functionality)

// LogNewFunder from FundingHub which lists the funding of particular
// assets by event by owner (to be able to build up a user's portfolio)

// Given a user, he should be able to fund a currently listed asset, looking for Payable functions,
// (Kyle to halp)

// Total asset revenue for an owner's owned assets and a breakdown by
// categories of the user's owned assets

// Transaction History functionality needs to be built (Kyle to halp)
