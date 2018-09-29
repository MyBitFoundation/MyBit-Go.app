/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import getWeb3Async from '../util/web3';
import * as API from '../constants/contracts/API';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import * as TokenFaucet from '../constants/contracts/TokenFaucet';
import * as FundingHub from '../constants/contracts/FundingHub';
import * as MyBitToken from '../constants/contracts/MyBitToken';
import { getCategoryFromAssetTypeHash } from '../util/helpers';
import {
  debug,
  ETHERSCAN_API_KEY,
  ETHERSCAN_TX_BY_ADDR_ENDPOINT,
  ETHERSCAN_TX,
  ETHERSCAN_BALANCE,
  getAddressForAsset,
  isAssetIdEnabled,
} from '../constants';

const web3 = getWeb3Async();
const IPFS_URL =
  'https://ipfs.io/ipfs/QmekJbKUnSZRU5CbQZwxWdnFPSvjbdbSkeonBZyPAGXpnd/';

export const fetchPriceFromCoinmarketcap = async ticker =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`);
      const jsonResponse = await response.json();
      const { price } = jsonResponse.data.quotes.USD;
      resolve(Math.round(price * 100) / 100);
    } catch (error) {
      reject(error);
    }
  });

export const fetchTransactionHistory = async user =>
  new Promise(async (resolve, reject) => {
    try {
      const userAddress = user.userName;
      /*
    *  results from etherscan come in lower case
    *  its cheaper to create a var to hold the address in lower case,
    *  than it is to keep converting it for every iteration
    */
      const userAddressLowerCase = userAddress.toLowerCase();
      const endpoint = ETHERSCAN_TX_BY_ADDR_ENDPOINT(
        ETHERSCAN_API_KEY,
        userAddress,
      );
      const result = await fetch(endpoint);
      const jsonResult = await result.json();
      if (
        !jsonResult.message ||
        (jsonResult.message &&
          jsonResult.message !== 'No transactions found' &&
          jsonResult.message !== 'OK')
      ) {
        throw new Error(jsonResult.result);
      }

      const ethTransactionHistory = jsonResult.result
        .filter(txResult =>
          txResult.to === userAddressLowerCase ||
            txResult.from === userAddressLowerCase)
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
      const myBitTokenContract = new web3.eth.Contract(
        MyBitToken.ABI,
        MyBitToken.ADDRESS,
      );
      const logTransactions = await myBitTokenContract.getPastEvents(
        'Transfer',
        { fromBlock: 0, toBlock: 'latest' },
      );

      const mybTransactionHistory = await Promise.all(logTransactions
        .filter(txResult =>
          txResult.returnValues.to === userAddress ||
              txResult.returnValues.from === userAddress)
        .map(async (txResult) => {
          const blockInfo = await web3.eth.getBlock(txResult.blockNumber);
          const multiplier =
              txResult.returnValues.from === userAddress ? -1 : 1;
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

export const loadMetamaskUserDetails = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const myBitTokenContract = new web3.eth.Contract(
        MyBitToken.ABI,
        MyBitToken.ADDRESS,
      );
      const myBitBalance = await myBitTokenContract.methods
        .balanceOf(accounts[0])
        .call();
      const details = {
        userName: accounts[0],
        ethBalance: web3.utils.fromWei(balance, 'ether'),
        myBitBalance,
      };
      resolve(details);
    } catch (error) {
      reject(error);
    }
  });

const getNumberOfInvestors = async assetID =>
  new Promise(async (resolve, reject) => {
    try {
      const fundingHubContract = new web3.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );
      const assetFundersLog = await fundingHubContract.getPastEvents(
        'LogNewFunder',
        { fromBlock: 0, toBlock: 'latest' },
      );

      const investorsForThisAsset = assetFundersLog.filter(txResult => txResult.returnValues._assetID === assetID);

      resolve(investorsForThisAsset.length);
    } catch (err) {
      reject(err);
    }
  });

const createAsset = async params =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCreationContract = new web3.eth.Contract(
        AssetCreation.ABI,
        AssetCreation.ADDRESS,
      );

      const installerId = web3.utils.sha3(params.installerId);
      const assetType = web3.utils.sha3(params.assetType);
      const ipfsHash = web3.utils.sha3(params.ipfsHash);

      const assetCreationResponse = await assetCreationContract.methods
        .newAsset(
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

const checkTransactionConfirmation = async (
  transactionHash,
  resolve,
  reject,
) => {
  try {
    const endpoint = ETHERSCAN_TX(ETHERSCAN_API_KEY, transactionHash);
    const result = await fetch(endpoint);
    const jsronResult = await result.json();
    if (jsronResult.status === '1') {
      resolve(true);
    } else if (jsronResult.status === '0') {
      resolve(false);
    } else {
      setTimeout(
        () => checkTransactionConfirmation(transactionHash, resolve, reject),
        1000,
      );
    }
  } catch (err) {
    reject(err);
  }
};

export const withdrawFromFaucet = async user =>
  new Promise(async (resolve, reject) => {
    try {
      const TokenFaucetContract = new web3.eth.Contract(
        TokenFaucet.ABI,
        TokenFaucet.ADDRESS,
      );
      const withdrawResponse = await TokenFaucetContract.methods
        .withdraw('ripplesucks')
        .send({ from: user.userName });
      const { transactionHash } = withdrawResponse;
      checkTransactionConfirmation(transactionHash, resolve, reject);
    } catch (err) {
      reject(err);
    }
  });

export const fundAsset = async (user, assetId, amount) =>
  new Promise(async (resolve, reject) => {
    try {
      const fundingHubContract = new web3.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );
      const weiAmount = web3.utils.toWei(amount.toString(), 'ether');

      const fundingResponse = await fundingHubContract.methods
        .fund(assetId)
        .send({
          value: weiAmount,
          from: user.userName,
        });

      const { transactionHash } = fundingResponse;
      checkTransactionConfirmation(transactionHash, resolve, reject);
    } catch (err) {
      reject(err);
    }
  });

export const fetchAssets = async (user, currentEthInUsd) =>
  new Promise(async (resolve, reject) => {
    try {
      // pull asssets from newest contract
      let apiContract = new web3.eth.Contract(API.ABI, API.ADDRESS);
      let assetCreationContract = new web3.eth.Contract(
        AssetCreation.ABI,
        AssetCreation.ADDRESS,
      );

      let logAssetFundingStartedEvents = await assetCreationContract.getPastEvents(
        'LogAssetFundingStarted',
        { fromBlock: 0, toBlock: 'latest' },
      );

      let assets = logAssetFundingStartedEvents
        .map(({ returnValues }) => returnValues)
        .map(object => ({
          assetID: object._assetID,
          assetType: object._assetType,
          ipfsHash: object._ipfsHash,
        }));

      // pull assets from older contract

      apiContract = new web3.eth.Contract(API.ABI, API.ADDRESS);
      assetCreationContract = new web3.eth.Contract(
        AssetCreation.ABI,
        AssetCreation.OLD_ADDRESS,
      );

      logAssetFundingStartedEvents = await assetCreationContract.getPastEvents(
        'LogAssetFundingStarted',
        { fromBlock: 0, toBlock: 'latest' },
      );

      const assetsOlderContract = logAssetFundingStartedEvents
        .map(({ returnValues }) => returnValues)
        .map(object => ({
          assetID: object._assetID,
          assetType: object._assetType,
          ipfsHash: object._ipfsHash,
        }));

      assets = assets.concat(assetsOlderContract);

      const assetManagers = await Promise.all(assets.map(async asset =>
        apiContract.methods.assetManager(asset.assetID).call()));

      const amountsToBeRaised = await Promise.all(assets.map(async asset =>
        apiContract.methods.amountToBeRaised(asset.assetID).call()));

      const amountsRaised = await Promise.all(assets.map(async asset =>
        apiContract.methods.amountRaised(asset.assetID).call()));

      const fundingDeadlines = await Promise.all(assets.map(async asset =>
        apiContract.methods.fundingDeadline(asset.assetID).call()));

      const realAddress = web3.utils.toChecksumAddress(user.userName);
      const ownershipUnits = await Promise.all(assets.map(async asset =>
        apiContract.methods.ownershipUnits(asset.assetID, realAddress).call()));

      const assetIncomes = await Promise.all(assets.map(async asset =>
        apiContract.methods.totalReceived(asset.assetID).call()));

      const fundingStages = await Promise.all(assets.map(async asset =>
        apiContract.methods.fundingStage(asset.assetID).call()));

      let assetsPlusMoreDetails = await Promise.all(assets.map(async (asset, index) => {
        const numberOfInvestors = await getNumberOfInvestors(asset.assetID);

        // asset details are hardcoded for now
        let assetIdDetails = isAssetIdEnabled(asset.assetID);
        if (!assetIdDetails) {
          assetIdDetails = {};
          assetIdDetails.city = 'Zurich';
          assetIdDetails.country = 'Switzerland';
          assetIdDetails.description = 'Coming soon';
          assetIdDetails.details = 'Coming soon';
          assetIdDetails.name = 'Coming soon';
        }

        // determine whether asset has expired
        let pastDate = false;
        const dueDate = dayjs(Number(fundingDeadlines[index]) * 1000);
        if (dayjs(new Date()) > dueDate) {
          pastDate = true;
        }

        return {
          ...asset,
          amountRaisedInUSD: (
            Number(web3.utils.fromWei(amountsRaised[index], 'ether')) *
              currentEthInUsd
          ).toFixed(2),
          amountToBeRaisedInUSD: amountsToBeRaised[index],
          fundingDeadline: dueDate,
          ownershipUnits: ownershipUnits[index],
          assetIncome: (
            Number(web3.utils.fromWei(assetIncomes[index], 'ether')) *
              currentEthInUsd
          ).toFixed(2),
          assetManager: assetManagers[index],
          city: assetIdDetails.city,
          country: assetIdDetails.country,
          name: assetIdDetails.name,
          numberOfInvestors,
          description: assetIdDetails.description,
          details: assetIdDetails.details,
          imageSrc: assetIdDetails.imgSrc,
          fundingStage: fundingStages[index],
          pastDate,
        };
      }));

      // filter for v0.1
      assetsPlusMoreDetails = assetsPlusMoreDetails.filter(asset => asset.amountToBeRaisedInUSD > 0);

      const assetsWithCategories = assetsPlusMoreDetails.map((asset) => {
        if (asset.assetType) {
          return {
            ...asset,
            category: getCategoryFromAssetTypeHash(web3, asset.assetType),
          };
        }
        return { ...asset };
      });

      resolve(assetsWithCategories);
    } catch (error) {
      reject(error);
    }
  });
