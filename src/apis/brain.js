/* eslint-disable no-underscore-dangle */

import getWeb3Async from '../util/web3';
import * as API from '../constants/contracts/API';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import * as MyBitToken from '../constants/contracts/MyBitToken';
import { getCategoryFromAssetTypeHash, mergeAllLogsByAssetId } from '../util/helpers';
import {
  ETHERSCAN_API_KEY,
  ETHERSCAN_TX_BY_ADDR_ENDPOINT,
} from '../constants';

const web3 = getWeb3Async();

export const fetchPriceFromCoinmarketcap = async ticker => new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`);
    const jsonResponse = await response.json();
    const { price } = jsonResponse.data.quotes.USD;
    resolve(Math.round(price * 100) / 100);
  } catch (error) {
    reject(error);
  }
});

export const fetchTransactionHistory = async user => new Promise(async (resolve, reject) => {
  try {
    const userAddress = user.userName;
    const endpoint = ETHERSCAN_TX_BY_ADDR_ENDPOINT(ETHERSCAN_API_KEY, AssetCreation.ADDRESS);
    const result = await fetch(endpoint);
    const jsonResult = await result.json();
    if (jsonResult.status === '0') {
      throw new Error(jsonResult.result);
    }
    // TODO: The following map needs to derive the correct information
    const transactionHistory = jsonResult.result
      .filter(txResult => txResult.to === userAddress || txResult.from === userAddress)
      .map(txResult => ({
        date: String(new Date(txResult.timestamp)) || '',
        amount: txResult.value || '',
        status: txResult.status || 'Complete',
        type: txResult.type || 'ETH',
        txId: txResult.hash || '',
      }));
    resolve(transactionHistory);
  } catch (error) {
    reject(error);
  }
});


export const loadMetamaskUserDetails = async () => new Promise(async (resolve, reject) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const myBitTokenContract = new web3.eth.Contract(MyBitToken.ABI, MyBitToken.ADDRESS);
    const myBitBalance = await myBitTokenContract.methods.balanceOf(accounts[0]).call();
    const details = { userName: accounts[0], ethBalance: web3.utils.fromWei(balance, 'ether'), myBitBalance };
    resolve(details);
  } catch (error) {
    reject(error);
  }
});

export const fetchAssets = async (user, currentEthInUsd) => new Promise(async (resolve, reject) => {
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
    const realAddress = web3.utils.toChecksumAddress(user.userName);
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
      amountRaisedInUSD: String(Number(web3.utils.fromWei(amountsRaised[index], 'ether')) * currentEthInUsd),
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
    resolve(assetsWithCategories);
  } catch (error) {
    reject(error);
  }
});
