/* eslint-disable no-underscore-dangle */
// TODO: The previously suppressed error can actually be avoided with better syntax
import getWeb3Async from '../util/web3';
import * as API from '../constants/contracts/API';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import * as MyBitToken from '../constants/contracts/MyBitToken';
import {
  MYBIT_TICKER_COINMARKETCAP,
  ETHEREUM_TICKER_COINMARKETCAP,
  ETHERSCAN_API_KEY,
  ETHERSCAN_TX_BY_ADDR_ENDPOINT,
} from '../constants';

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
export const FETCH_TRANSACTION_HISTORY = 'FETCH_TRANSACTION_HISTORY';
export const FETCH_TRANSACTION_HISTORY_SUCCESS = 'FETCH_TRANSACTION_HISTORY_SUCCESS';
export const FETCH_TRANSACTION_HISTORY_FAILURE = 'FETCH_TRANSACTION_HISTORY_FAILURE';

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
export const fetchTransactionHistorySuccess =
    transactionHistory =>
      ({ type: FETCH_TRANSACTION_HISTORY_SUCCESS, payload: { transactionHistory } });
export const fetchTransactionHistoryFailure =
    error => ({ type: FETCH_TRANSACTION_HISTORY_FAILURE, payload: { error } });

// Asynchronous action creators
export const fetchTransactionHistory = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_TRANSACTION_HISTORY });
  try {
    const userAddress = getState().user.userName;

    /*
    *  results from etherscan come in lower case
    *  its cheaper to create a var to hold the address in lower case,
    *  than it is to keep converting it for every iteration
    */
    const userAddressLowerCase = userAddress.toLowerCase();
    const endpoint = ETHERSCAN_TX_BY_ADDR_ENDPOINT(ETHERSCAN_API_KEY, userAddress);
    const result = await fetch(endpoint);
    const jsonResult = await result.json();
    if (jsonResult.status === '0') {
      throw new Error(jsonResult.result);
    }

    const ethTransactionHistory = jsonResult.result
      .filter(txResult =>
        txResult.to === userAddressLowerCase || txResult.from === userAddressLowerCase)
      .map((txResult) => {
        const multiplier = txResult.from === userAddressLowerCase ? -1 : 1;
        let status = 'Complete';
        if (txResult.isError === '1') {
          status = 'Fail';
        } else if (txResult.confirmations === 0) {
          status = 'Pending';
        }
        return {
          date: txResult.timeStamp * 1000,
          amount: web3.utils.fromWei(txResult.value, 'ether') * multiplier,
          status,
          type: 'ETH',
          txId: txResult.hash,
        };
      });

    // Pull MYB transactions from event log
    const myBitTokenContract = new web3.eth.Contract(MyBitToken.ABI, MyBitToken.ADDRESS);
    const logTransactions =
      await myBitTokenContract
        .getPastEvents('Transfer', { fromBlock: 0, toBlock: 'latest' });

    const mybTransactionHistory = await Promise.all(logTransactions
      .filter(txResult =>
        txResult.returnValues.to === userAddress || txResult.returnValues.from === userAddress)
      .map(async (txResult) => {
        const blockInfo = await web3.eth.getBlock(txResult.blockNumber);
        const multiplier = txResult.returnValues.from === userAddress ? -1 : 1;
        return {
          amount: (txResult.returnValues.value / 100000000) * multiplier,
          type: 'MYB',
          txId: txResult.transactionHash,
          status: 'Complete',
          date: blockInfo.timestamp * 1000,
        };
      }));

    dispatch(fetchTransactionHistorySuccess(ethTransactionHistory.concat(mybTransactionHistory)));
  } catch (error) {
    dispatch(fetchTransactionHistoryFailure(error));
  }
};
export const loadMetamaskUserDetails = cb => async (dispatch) => {
  dispatch({ type: LOAD_METAMASK_USER_DETAILS });
  try {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const myBitTokenContract = new web3.eth.Contract(MyBitToken.ABI, MyBitToken.ADDRESS);
    const myBitBalance = await myBitTokenContract.methods.balanceOf(accounts[0]).call() / 100000000;
    const details = { userName: accounts[0], ethBalance: web3.utils.fromWei(balance, 'ether'), myBitBalance };
    cb(true);
    dispatch(loadMetamaskUserDetailsSuccess(details));
  } catch (error) {
    cb(false);
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
      await Promise.all(assets.map(async asset =>
        apiContract.methods.amountRaised(asset.assetID).call()));
    const fundingDeadlines =
      await Promise.all(assets.map(async asset =>
        apiContract.methods.fundingDeadline(asset.assetID).call()));
    const realAddress = web3.utils.toChecksumAddress(getState().user.userName);
    const ownershipUnits =
      await Promise.all(assets.map(async asset => apiContract.methods.ownershipUnits(
        realAddress,
        asset.assetID,
      ).call()));
    const assetIncomes =
      await Promise.all(assets.map(async asset => apiContract.methods.totalReceived(asset.assetID)
        .call()));

    const assetsPlusMoreDetails = assets.map((asset, index) => ({
      ...asset,
      amountRaisedInUSD: String(Number(web3.utils.fromWei(amountsRaised[index], 'ether')) * getState().misc.currentEthInUsd),
      fundingDeadline: fundingDeadlines[index],
      ownershipUnits: ownershipUnits[index],
      assetIncome: assetIncomes[index],
    }));

    const assetsWithCategories = assetsPlusMoreDetails.map((asset) => {
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
