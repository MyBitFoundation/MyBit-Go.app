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

    resolve(ethTransactionHistory.concat(mybTransactionHistory));
  } catch (error) {
    reject(error);
  }
});


export const loadMetamaskUserDetails = async () => new Promise(async (resolve, reject) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    const myBitTokenContract = new web3.eth.Contract(MyBitToken.ABI, MyBitToken.ADDRESS);
    const myBitBalance = await myBitTokenContract.methods.balanceOf(accounts[0]).call() / 100000000;
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
