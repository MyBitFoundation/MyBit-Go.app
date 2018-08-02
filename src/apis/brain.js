/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

import getWeb3Async from '../util/web3';
import * as API from '../constants/contracts/API';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import * as TokenFaucet from '../constants/contracts/TokenFaucet';
import * as FundingHub from '../constants/contracts/FundingHub';
import * as MyBitToken from '../constants/contracts/MyBitToken';
import { getCategoryFromAssetTypeHash } from '../util/helpers';
import {
  ETHERSCAN_API_KEY,
  ETHERSCAN_TX_BY_ADDR_ENDPOINT,
  ETHERSCAN_TX,
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
    if (!jsonResult.message || (jsonResult.message && jsonResult.message !== 'No transactions found' && jsonResult.message !== 'OK')) {
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
    const myBitBalance = await myBitTokenContract.methods
      .balanceOf(accounts[0]).call();
    const details = { userName: accounts[0], ethBalance: web3.utils.fromWei(balance, 'ether'), myBitBalance };
    resolve(details);
  } catch (error) {
    reject(error);
  }
});

const getNumberOfInvestors = async assetID => new Promise(async (resolve, reject) => {
  try {
    const fundingHubContract = new web3.eth.Contract(FundingHub.ABI, FundingHub.ADDRESS);
    const assetFundersLog =
      await fundingHubContract
        .getPastEvents('LogNewFunder', { fromBlock: 0, toBlock: 'latest' });

    const investorsForThisAsset = assetFundersLog.filter(txResult =>
      txResult.returnValues._assetID === assetID);

    resolve(investorsForThisAsset.length);
  } catch (err) {
    reject(err);
  }
});

export const createAsset = async params => new Promise(async (resolve, reject) => {
  try {
    const assetCreationContract = new web3.eth.Contract(AssetCreation.ABI, AssetCreation.ADDRESS);

    const installerId = web3.utils.sha3(params.installerId);
    const assetType = web3.utils.sha3(params.assetType);
    const ipfsHash = web3.utils.sha3(params.ipfsHash);

    const assetCreationResponse = await assetCreationContract.methods.newAsset(
      params.amountToBeRaisedInUSD,
      params.managerPercentage,
      params.amountToEscrow,
      installerId,
      assetType,
      params.blockAtCreation,
      ipfsHash,
    )
      .send({ from: params.userAddress });

    resolve(assetCreationResponse);
  } catch (err) {
    reject(err);
  }
});

const checkTransactionConfirmation = async (transactionHash, resolve, reject) => {
  try {
    const endpoint = ETHERSCAN_TX(ETHERSCAN_API_KEY, transactionHash);
    const result = await fetch(endpoint);
    const jsronResult = await result.json();
    if (jsronResult.status === '1') {
      resolve(true);
    } else if (jsronResult.status === '0') {
      resolve(false);
    } else {
      setTimeout(() => checkTransactionConfirmation(transactionHash, resolve, reject), 1000);
    }
  } catch (err) {
    reject(err);
  }
};

export const withdrawFromFaucet = async user => new Promise(async (resolve, reject) => {
  try {
    const TokenFaucetContract = new web3.eth.Contract(TokenFaucet.ABI, TokenFaucet.ADDRESS);
    const withdrawResponse = await TokenFaucetContract.methods.register('42000000000000000000000', 'ripplesucks').send({ from: user.userName });
    const { transactionHash } = withdrawResponse;
    checkTransactionConfirmation(transactionHash, resolve, reject);
  } catch (err) {
    reject(err);
  }
});

// The stuff thats commented out will be updated once kyle deploys the new contracts
export const fetchAssets = async (user, currentEthInUsd) => new Promise(async (resolve, reject) => {
  try {
    const apiContract = new web3.eth.Contract(API.ABI, API.ADDRESS);
    const assetCreationContract = new web3.eth.Contract(AssetCreation.ABI, AssetCreation.ADDRESS);

    const logAssetFundingStartedEvents =
      await assetCreationContract
        .getPastEvents('LogAssetFundingStarted', { fromBlock: 0, toBlock: 'latest' });

    const assets = logAssetFundingStartedEvents
      .map(({ returnValues }) => returnValues)
      .map(object => ({
        assetID: object._assetID,
        assetType: object._assetType,
        ipfsHash: object._ipfsHash,
      }));

    // const withdraw = await withdrawFromFaucet(web3.utils.toChecksumAddress(user.userName));
    /* const assetCreationResponse = await assetCreationContract.methods.
      newAsset(300000, 15, 15000, web3.utils.sha3("ATMInstallersAG"),
      web3.utils.sha3("bitcoinatms"), 190, web3.utils.sha3("123asfd4")
    ).send({ from: "0x11cF613d319DC923f3248175e0271588F1B26991" });

    console.log(assetCreationResponse); */

    // TODO Remove
    // const assetID = '0x0903212121a0073f661f7cadf9079433fc0fe5b3418482a1bdb4631d52833f9f';
    const assetManagers =
      await Promise.all(assets.map(async asset =>
        apiContract.methods.assetManager(asset.assetID).call()));

    /* const amountsToBeRaised =
      await Promise.all(assets.map(async asset =>
        apiContract.methods.amountToBeRaised(asset.assetID).call())); */

    const amountsRaised =
      await Promise.all(assets.map(async asset =>
        apiContract.methods.amountRaised(asset.assetID).call()));

    /* const fundingDeadlines =
      await Promise.all(assets.map(async asset =>
        apiContract.methods.fundingDeadline(asset.assetID).call())); */

    const realAddress = web3.utils.toChecksumAddress(user.userName);
    const ownershipUnits =
      await Promise.all(assets.map(async asset => apiContract.methods.ownershipUnits(
        asset.assetID,
        realAddress,
      ).call()));
    const assetIncomes =
      await Promise.all(assets.map(async asset => apiContract.methods.totalReceived(asset.assetID)
        .call()));

    const assetsPlusMoreDetails = await Promise.all(assets.map(async (asset, index) => {
      const numberOfInvestors = await getNumberOfInvestors(asset.assetID);
      return {
        ...asset,
        amountRaisedInUSD: String(Number(web3.utils.fromWei(amountsRaised[index], 'ether')) * currentEthInUsd),
        amountToBeRaisedInUSD: String(Number(50) * currentEthInUsd), // TODO
        fundingDeadline: 1564613920000, // TODO
        ownershipUnits: ownershipUnits[index], // TODO
        assetIncome: assetIncomes[index], // TODO
        assetManager: assetManagers[index],
        city: 'Zug', // TODO
        country: 'Switzerland', // TODO
        name: 'Ian\'s Fridge', // TODO
        numberOfInvestors,
      };
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
