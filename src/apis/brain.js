/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import axios from 'axios';
import dayjs from 'dayjs';
import * as API from '../constants/contracts/API';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import * as TokenFaucet from '../constants/contracts/TokenFaucet';
import * as FundingHub from '../constants/contracts/FundingHub';
import * as MyBitToken from '../constants/contracts/MyBitToken';
import { getCategoryFromAssetTypeHash } from '../util/helpers';
import {
  debug,
  ETHERSCAN_TX_BY_ADDR_ENDPOINT,
  ETHERSCAN_TX,
  ETHERSCAN_BALANCE,
  getAddressForAsset,
  testAssetIds,
  UPDATE_ASSETS_URL,
  S3_UPLOAD_URL,
  BLOCK_NUMBER_CONTRACT_CREATION,
} from '../constants';

import {
  generateAssetId,
  generateRandomHex,
} from '../util/helpers'

const IPFS_URL =
  'https://ipfs.io/ipfs/QmekJbKUnSZRU5CbQZwxWdnFPSvjbdbSkeonBZyPAGXpnd/';

export const fetchPriceFromCoinmarketcap = async ticker =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.coinmarketcap.com/v2/ticker/${ticker}/`);
      const jsonResponse = await response.json();
      const { price, percent_change_24h } = jsonResponse.data.quotes.USD;
      resolve({
        price,
        priceChangePercentage: percent_change_24h,
      });
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
      const endpoint = ETHERSCAN_TX_BY_ADDR_ENDPOINT(userAddress);
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
          txResult.to === userAddressLowerCase || txResult.from === userAddressLowerCase)
        .map((txResult, index) => {
          const multiplier = txResult.from === userAddressLowerCase ? -1 : 1;
          let status = 'Confirmed';
          if (txResult.isError === '1') {
            status = 'Error';
          } else if (txResult.confirmations === 0) {
            status = 'Pending';
          }
          return {
            amount: window.web3js.utils.fromWei(txResult.value, 'ether') * multiplier,
            type: 'ETH',
            txId: txResult.hash,
            status,
            date: txResult.timeStamp * 1000,
            key: `${txResult.hash} ${index}`,
          };
        });

      // Pull MYB transactions from event log
      const myBitTokenContract = new window.web3js.eth.Contract(
        MyBitToken.ABI,
        MyBitToken.ADDRESS,
      );
      const logTransactions = await myBitTokenContract.getPastEvents(
        'Transfer',
        { fromBlock: 0, toBlock: 'latest' },
      );

      const mybTransactionHistory = await Promise.all(logTransactions
        .filter(txResult =>
          txResult.returnValues.to === userAddress || txResult.returnValues.from === userAddress)
        .map(async (txResult, index) => {
          const blockInfo = await window.web3js.eth.getBlock(txResult.blockNumber);
          const multiplier =
            txResult.returnValues.from === userAddress ? -1 : 1;

          return {
            amount: window.web3js.utils.fromWei(txResult.returnValues[2], 'ether') * multiplier,
            type: 'MYB',
            txId: txResult.transactionHash,
            status: 'Confirmed',
            date: blockInfo.timestamp * 1000,
            key: `${txResult.transactionHash} ${index}`,
          };
        }));

      const mixedEthAndMybitTransactions =
        ethTransactionHistory.concat(mybTransactionHistory);

      resolve(mixedEthAndMybitTransactions);
    } catch (error) {
      reject(error);
    }
  });

export const loadMetamaskUserDetails = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await window.web3js.eth.getAccounts();
      const balance = await window.web3js.eth.getBalance(accounts[0]);
      const myBitTokenContract = new window.web3js.eth.Contract(
        MyBitToken.ABI,
        MyBitToken.ADDRESS,
      );
      const myBitBalance = await myBitTokenContract.methods
        .balanceOf(accounts[0])
        .call();

      const details = {
        userName: accounts[0],
        ethBalance: window.web3js.utils.fromWei(balance, 'ether'),
        myBitBalance: window.web3js.utils.fromWei(myBitBalance, 'ether'),
      };
      resolve(details);
    } catch (error) {
      reject(error);
    }
  });

const getNumberOfInvestors = async assetID =>
  new Promise(async (resolve, reject) => {
    try {
      const fundingHubContract = new window.web3js.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );
      const assetFundersLog = await fundingHubContract.getPastEvents(
        'LogNewFunder',
        { fromBlock: 0, toBlock: 'latest' },
      );

      const investorsForThisAsset = assetFundersLog
        .filter(txResult => txResult.returnValues._assetID === assetID);

      resolve(investorsForThisAsset.length);
    } catch (err) {
      reject(err);
    }
  });

export const createAsset = async params =>
  new Promise(async (resolve, reject) => {
    try {
      const id = Date.now();
      const {
        updateNotification,
        assetName,
        onSuccess,
        onFailure,
        country,
        city,
        fileList,
      } = params;

      updateNotification(id, {
        metamaskProps: {
          assetName: assetName,
          operationType: 'list-asset',
        },
        status: 'info',
      });
      const assetCreationContract = new window.web3js.eth.Contract(
        AssetCreation.ABI,
        AssetCreation.ADDRESS,
      );

      const installerId = generateRandomHex(window.web3js);
      const assetType = params.assetType;
      const ipfsHash = installerId; // ipfshash doesn't really matter right now
      const randomBlockNumber = Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 10000) + 500;

      const futureAssetId = generateAssetId(
        window.web3js,
        params.userAddress,
        params.managerPercentage,
        params.amountToBeRaisedInUSD,
        installerId,
        assetType,
        randomBlockNumber
      );

      const assetCreationResponse = await assetCreationContract.methods
        .newAsset(
          params.amountToBeRaisedInUSD.toString(),
          params.managerPercentage.toString(),
          '0',
          installerId,
          assetType,
          randomBlockNumber.toString(),
          ipfsHash,
        )
        .send({ from: params.userAddress })
        .on('transactionHash', (transactionHash) => {
          updateNotification(id, {
            listAssetProps: {
              assetName: assetName,
            },
            status: 'info',
          });
        })
        .on('error', (error) => {
          onFailure();
          updateNotification(id, {
            metamaskProps: {},
            status: 'error',
            operationType: 'list-asset',
          });
          resolve(false);
        })
        .then( async(receipt) => {
          //TODO add error handling
          if(receipt.status){
            const response = await axios.post(UPDATE_ASSETS_URL, {
              assetId: futureAssetId,
              assetName: assetName,
              country: country,
              city: city,
            });

            if(fileList.length > 0){
              let data = new FormData();
              data.append('assetId', futureAssetId);
              for(const file of fileList){
                data.append('file', file.originFileObj);
              }
              axios.post(S3_UPLOAD_URL,
                data, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
              ).then((response) => {
                console.log('success');
              })
              .catch((err) => {
                console.log('fail');
              });
            }

            onSuccess(() => updateNotification(id, {
              listAssetProps: {
                assetName: assetName,
                assetId: futureAssetId,
              },
              status: 'success',
            }))
          } else {
            updateNotification(id, {
              listAssetProps: {
                assetName: assetName,
              },
              status: 'error',
            });
          }

          debug(receipt)
          resolve(receipt.status);
        });

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
    const endpoint = ETHERSCAN_TX(transactionHash);
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
      const TokenFaucetContract = new window.web3js.eth.Contract(
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

export const fundAsset = async (user, assetId, amount, onFailureContributionPopup, onSuccessRefreshData, notificationId, assetName, updateNotification, amountDollars) =>
  new Promise(async (resolve, reject) => {
    try {
      updateNotification(notificationId, {
        metamaskProps: {
          assetName: assetName,
          operationType: 'contribution',
        },
        status: 'info',
      });

      const fundingHubContract = new window.web3js.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );
      const weiAmount = window.web3js.utils.toWei(amount.toString(), 'ether');

      const fundingResponse = await fundingHubContract.methods
        .fund(assetId)
        .send({
          value: weiAmount,
          from: user.userName,
        })
        .on('transactionHash', (transactionHash) => {
          updateNotification(notificationId, {
            fundingProps: {
              assetName: assetName,
              amount: amountDollars,
            },
            status: 'info',
          });
        })
        .on('error', (error) => {
          onFailureContributionPopup();
          updateNotification(notificationId, {
            metamaskProps: {
              assetName: assetName,
              operationType: 'contribution',
            },
            status: 'error',
          });
          debug(error);
          resolve(false);
        })
        .then((receipt) => {
          if(receipt.status){
            onSuccessRefreshData();
          } else {
            onFailureContributionPopup();
            updateNotification(notificationId, {
              fundingProps: {
                assetName: assetName,
                operationType: 'contribution',
              },
              status: 'error',
            });
          }
          resolve(receipt.status);
        });
    } catch (err) {
      resolve(false);
    }
  });

export const fetchAssets = async (user, currentEthInUsd, assetsAirTableById, categoriesAirTable) =>
  new Promise(async (resolve, reject) => {
    try {
      // pull asssets from newest contract
      let apiContract = new window.web3js.eth.Contract(API.ABI, API.ADDRESS);
      let assetCreationContract = new window.web3js.eth.Contract(
        AssetCreation.ABI,
        AssetCreation.ADDRESS,
      );

      let logAssetFundingStartedEvents = await assetCreationContract.getPastEvents(
        'LogAssetFundingStarted',
        { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
      );

      let assets = logAssetFundingStartedEvents
        .map(({ returnValues }) => returnValues)
        .map(object => ({
          assetID: object._assetID,
          assetType: object._assetType,
          ipfsHash: object._ipfsHash,
        }));

      // pull assets from older contract
      apiContract = new window.web3js.eth.Contract(API.ABI, API.ADDRESS);
      assetCreationContract = new window.web3js.eth.Contract(
        AssetCreation.ABI,
        AssetCreation.OLD_ADDRESS,
      );

      logAssetFundingStartedEvents = await assetCreationContract.getPastEvents(
        'LogAssetFundingStarted',
        { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
      );

      const assetsOlderContract = logAssetFundingStartedEvents
        .map(({ returnValues }) => returnValues)
        .map(object => ({
          assetID: object._assetID,
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

      const realAddress = window.web3js.utils.toChecksumAddress(user.userName);
      const ownershipUnits = await Promise.all(assets.map(async asset =>
        apiContract.methods.ownershipUnits(asset.assetID, realAddress).call()));

      const assetIncomes = await Promise.all(assets.map(async asset =>
        apiContract.methods.totalReceived(asset.assetID).call()));

      const fundingStages = await Promise.all(assets.map(async asset =>
        apiContract.methods.fundingStage(asset.assetID).call()));

      const managerPercentages = await Promise.all(assets.map(async asset =>
        apiContract.methods.managerPercentage(asset.assetID).call()));

      let assetsPlusMoreDetails = await Promise.all(assets.map(async (asset, index) => {
        const numberOfInvestors = await getNumberOfInvestors(asset.assetID);

        let assetIdDetails = assetsAirTableById[asset.assetID];
        // if the asset Id is not on airtable it doens't show up in the platform
        if (!assetIdDetails) {
          return undefined;
        }

        // determine whether asset has expired
        let pastDate = false;
        const dueDate = dayjs(Number(fundingDeadlines[index]) * 1000);
        if (dayjs(new Date()) > dueDate) {
          pastDate = true;
        }

        const amountToBeRaisedInUSD = Number(amountsToBeRaised[index]);
        const fundingStage = fundingStages[index];
        let amountRaisedInUSD = 0;

        // this fixes the issue of price fluctuations
        // a given funded asset can have different "amountRaisedInUSD" and "amountToBeRaisedInUSD"
        if (fundingStage === '3' || fundingStage === '4') {
          amountRaisedInUSD = amountToBeRaisedInUSD;
        } else {
          amountRaisedInUSD =
            Number(window.web3js.utils.fromWei(amountsRaised[index].toString(), 'ether')) *
              currentEthInUsd;
        }

        const searchQuery = `mybit_watchlist_${asset.assetID}`;
        const alreadyFavorite = window.localStorage.getItem(searchQuery) === 'true';

        return {
          ...asset,
          amountRaisedInUSD,
          amountToBeRaisedInUSD,
          fundingDeadline: dueDate,
          ownershipUnits: ownershipUnits[index],
          assetIncome:
            Number(window.web3js.utils.fromWei(assetIncomes[index].toString(), 'ether')) *
              currentEthInUsd,
          assetManager: assetManagers[index],
          city: assetIdDetails.city,
          country: assetIdDetails.country,
          name: assetIdDetails.name,
          numberOfInvestors,
          description: assetIdDetails.description,
          details: assetIdDetails.details,
          imageSrc: assetIdDetails.imageSrc,
          fundingStage: fundingStages[index],
          managerPercentage: Number(managerPercentages[index]),
          pastDate,
          watchListed: alreadyFavorite,
          category: assetIdDetails.category,
        };
      }));

      // filter for v0.1
      assetsPlusMoreDetails = assetsPlusMoreDetails
        .filter(asset => asset && asset.amountToBeRaisedInUSD > 0);

      if (process.env.NODE_ENV !== 'development') {
        // filter for test assets. Only for development
        assetsPlusMoreDetails = assetsPlusMoreDetails.filter(asset =>
          asset.description !== 'Coming soon');
      }

      resolve(assetsPlusMoreDetails);
    } catch (error) {
      reject(error);
    }
  });
