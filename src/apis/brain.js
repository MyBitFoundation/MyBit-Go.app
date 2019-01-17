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
import * as Asset from '../constants/contracts/Asset';
import * as AssetCollateral from '../constants/contracts/AssetCollateral';
import { getCategoryFromAssetTypeHash } from '../util/helpers';
import {
  ErrorTypes,
  FundingStages,
  getFundingStage,
  ExternalLinks,
  InternalLinks,
  BLOCK_NUMBER_CONTRACT_CREATION,
} from '../constants';

import {
  generateAssetId,
  generateRandomHex,
  debug,
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

export const fetchTransactionHistory = async userAddress =>
  new Promise(async (resolve, reject) => {
    try {
      /*
    *  results from etherscan come in lower case
    *  its cheaper to create a var to hold the address in lower case,
    *  than it is to keep converting it for every iteration
    */
      const userAddressLowerCase = userAddress.toLowerCase();
      const endpoint = ExternalLinks.ETHERSCAN_TX_BY_ADDR_ENDPOINT(userAddress);
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
      if(accounts.length === 0){
        resolve();
      }
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

const roiEscrow = async assetID =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCollateralContract = new window.web3js.eth.Contract(
        AssetCollateral.ABI,
        AssetCollateral.ADDRESS,
      );

      const response = await assetCollateralContract.methods
        .roiEscrow(assetID).call();
        debug(response)
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const unlockedEscrow = async assetID =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCollateralContract = new window.web3js.eth.Contract(
        AssetCollateral.ABI,
        AssetCollateral.ADDRESS,
      );

      const response = await assetCollateralContract.methods
        .unlockedEscrow(assetID).call();

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const remainingEscrow = async assetID =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCollateralContract = new window.web3js.eth.Contract(
        AssetCollateral.ABI,
        AssetCollateral.ADDRESS,
      );

      const response = await assetCollateralContract.methods
        .remainingEscrow(assetID).call();

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const withdrawAssetManager = async (userName, assetID, onTransactionHash, onReceipt, onError) => {
  try {
    const assetContract = new window.web3js.eth.Contract(
      Asset.ABI,
      Asset.ADDRESS,
    );

    const response = await assetContract.methods
      .withdrawManagerIncome(assetID)
      .send({ from: userName })
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then(receipt => onReceipt(receipt.status));

  } catch (error) {
    processErrorType(error, onError)
  }
}

export const withdrawEscrow = async (userName, assetID, onTransactionHash, onReceipt, onError) => {
  try {
    const assetCollateralContract = new window.web3js.eth.Contract(
      AssetCollateral.ABI,
      AssetCollateral.ADDRESS,
    );

    const response = await assetCollateralContract.methods
      .withdrawEscrow(assetID)
      .send({ from: userName })
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then(receipt => onReceipt(receipt.status));

  } catch (error) {
    processErrorType(error, onError)
  }
}

export const fetchRevenueLogsByAssetId = async (assetId) =>
  new Promise(async (resolve, reject) => {
    try {
      // pull asssets from newest contract
      let assetContract = new window.web3js.eth.Contract(
        Asset.ABI,
        Asset.ADDRESS,
      );

      let logIncomeReceived = await assetContract.getPastEvents(
        'LogIncomeReceived',
        { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
      );

      let revenueIncomeData = await Promise.all(logIncomeReceived
        .filter(({returnValues}) => returnValues._assetID === assetId)
        .map(async data => {
          const blockNumber = data.blockNumber;
          const blockInfo = await window.web3js.eth.getBlock(blockNumber);
          const timestamp = blockInfo.timestamp;
          const amount = data.returnValues._amount;
          return{
            amount,
            timestamp,
          }
        }))

        resolve(revenueIncomeData);
      }catch(err){
        debug(err);
        reject(err);
      }
  })

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

export const createAsset = async (onTransactionHash, onReceipt, onError, params) => {
  try {
    const {
      assetName,
      country,
      city,
      fileList,
      collateralMyb,
      collateralPercentage,
      amountToBeRaisedInUSD,
      userAddress,
      managerPercentage,
    } = params;

    const collateral = window.web3js.utils.toWei(collateralMyb.toString(), 'ether');
    debug(collateral)

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
      userAddress,
      managerPercentage,
      amountToBeRaisedInUSD,
      installerId,
      assetType,
      randomBlockNumber
    );

    const assetCreationResponse = await assetCreationContract.methods
      .newAsset(
        amountToBeRaisedInUSD.toString(),
        params.managerPercentage.toString(),
        '0',
        installerId,
        assetType,
        randomBlockNumber.toString(),
        ipfsHash,
      )
      .send({ from: userAddress })
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then(receipt => onReceipt(receipt.status, futureAssetId));

  } catch (error) {
    processErrorType(error, onError)
  }
}

export const uploadFilesToAWS = async (
  assetId,
  fileList,
  performInternalAction,
) => {
  try{
    let data = new FormData();
    data.append('assetId', assetId);
    for(const file of fileList){
      data.append('file', file.originFileObj);
    }
    await axios.post(InternalLinks.S3_UPLOAD,
      data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    performInternalAction();
  } catch(err){
    setTimeout(() => uploadFilesToAWS(assetId, fileList, performInternalAction), 5000);
    debug(err);
  }
}

export const createEntryForNewCollateral = async (
  address,
  escrow,
  assetId,
  performInternalAction,
) => {
  try{
    await axios.post(InternalLinks.MYBIT_API_COLLATERAL, {
      address,
      escrow,
      assetId,
    })
    performInternalAction();
  } catch(err){
    setTimeout(() => createEntryForNewCollateral(address, escrow, assetId, performInternalAction), 5000);
    debug(err);
  }
}

export const updateAirTableWithNewAsset = async (
  assetId,
  assetName,
  country,
  city,
  collateral,
  collateralPercentage,
  performInternalAction,
) => {
  try{
    await axios.post(InternalLinks.UPDATE_ASSETS, {
      assetId,
      assetName,
      country,
      city,
      collateral,
      collateralPercentage,
    });
    performInternalAction();
  } catch(err){
    setTimeout(() => updateAirTableWithNewAsset(assetId, assetName, country, city, collateral, collateralPercentage, performInternalAction), 5000);
    debug(err);
  }
}

export const checkTransactionConfirmation = async (
  transactionHash,
  resolve,
  reject,
) => {
  try {
    const endpoint = ExternalLinks.ETHERSCAN_TX(transactionHash);
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


export const withdrawInvestorProfit = async (userName, assetID, onTransactionHash, onReceipt, onError) => {
  try {
    const AssetContract = new window.web3js.eth.Contract(
      Asset.ABI,
      Asset.ADDRESS,
    );

    const withdrawResponse = await AssetContract.methods
      .withdraw(assetID)
      .send({ from: userName })
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then((receipt) => {
        onReceipt(receipt.status);
      });
  } catch (error) {
    processErrorType(error, onError)
  }
}

export const fundAsset = async (userName, assetId, amount, onTransactionHash, onReceipt, onError) => {
  try {
    const fundingHubContract = new window.web3js.eth.Contract(
      FundingHub.ABI,
      FundingHub.ADDRESS,
    );
    const weiAmount = window.web3js.utils.toWei(amount.toString(), 'ether');

    const fundingResponse = await fundingHubContract.methods
      .fund(assetId)
      .send({
        value: weiAmount,
        from: userName,
      })
      .on('transactionHash', (transactionHash) => {
        onTransactionHash();
      })
      .on('error', (error) => {
        processErrorType(error, onError);
      })
      .then((receipt) => {
        onReceipt(receipt.status);
      });
  } catch (error) {
    processErrorType(error, onError)
  }
}

const processErrorType = (error, handleError) => {
  if(error.message.includes("User denied transaction signature")){
    handleError(ErrorTypes.METAMASK);
  } else{
    handleError(ErrorTypes.ETHEREUM);
  };
}

export const getManagerIncomeEarned = async (managerAddress, assetID) =>
  new Promise(async (resolve, reject) => {
    let assetContract = new window.web3js.eth.Contract(
      Asset.ABI,
      Asset.ADDRESS,
    );

    let logsIncomeEarned = await assetContract.getPastEvents(
      'LogManagerIncomeEarned',
      { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
    );

    let incomeEarned = logsIncomeEarned
      .filter(({ returnValues }) => returnValues._manager === managerAddress && returnValues._assetID === assetID)
      .reduce((accumulator, currentValue) =>
        (accumulator) + Number(currentValue.returnValues._managerAmount)
        ,0)

    resolve(incomeEarned);
  });

export const getManagerIncomeWithdraw = async (managerAddress, assetID) =>
  new Promise(async (resolve, reject) => {
    let assetContract = new window.web3js.eth.Contract(
      Asset.ABI,
      Asset.ADDRESS,
    );

    let logsIncomeEarned = await assetContract.getPastEvents(
      'LogManagerIncomeWithdraw',
      { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
    );

    let withdrawn = logsIncomeEarned
      .filter(({ returnValues }) => returnValues._manager === managerAddress && returnValues._assetID === assetID)
      .reduce((accumulator, currentValue) =>
        (accumulator) + Number(currentValue.returnValues.owed)
        ,0)

    resolve(withdrawn);
  });


export const fetchAssets = async (userName, currentEthInUsd, assetsAirTableById, categoriesAirTable) =>
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

      let fundingHubContract = new window.web3js.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );

      let logAssetsWentLive = await fundingHubContract.getPastEvents(
        'LogAssetPayout',
        { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
      );

      let assetsWentLive = logAssetsWentLive
        .map(object => ({
          assetID: object.returnValues._assetID,
          blockNumber: object.blockNumber,
        }));

      const assetManagers = await Promise.all(assets.map(async asset =>
        apiContract.methods.assetManager(asset.assetID).call()));

      const amountsToBeRaised = await Promise.all(assets.map(async asset =>
        apiContract.methods.amountToBeRaised(asset.assetID).call()));

      const amountsRaised = await Promise.all(assets.map(async asset =>
        apiContract.methods.amountRaised(asset.assetID).call()));

      const fundingDeadlines = await Promise.all(assets.map(async asset =>
        apiContract.methods.fundingDeadline(asset.assetID).call()));

      const realAddress = userName && window.web3js.utils.toChecksumAddress(userName);

      const ownershipUnits = realAddress && await Promise.all(assets.map(async asset =>
        apiContract.methods.ownershipUnits(asset.assetID, realAddress).call()));

      const assetIncomes = await Promise.all(assets.map(async asset =>
        apiContract.methods.totalReceived(asset.assetID).call()));

      const fundingStages = await Promise.all(assets.map(async asset =>
        apiContract.methods.fundingStage(asset.assetID).call()));

      const managerPercentages = await Promise.all(assets.map(async asset =>
        apiContract.methods.managerPercentage(asset.assetID).call()));

      let assetsPlusMoreDetails = await Promise.all(assets.map(async (asset, index) => {
        let assetIdDetails = assetsAirTableById[asset.assetID];

        // if the asset Id is not on airtable it doens't show up in the platform
        if (!assetIdDetails) {
          return undefined;
        }

        const numberOfInvestors = Number(await getNumberOfInvestors(asset.assetID));

        const ownershipUnitsTmp = (realAddress && ownershipUnits[index]) || 0;
        let owedToInvestor = 0;
        if(ownershipUnitsTmp > 0){
          owedToInvestor = await apiContract.methods.getAmountOwed(asset.assetID, realAddress).call();
        }

        // determine whether asset has expired
        let pastDate = false;
        const dueDate = dayjs(Number(fundingDeadlines[index]) * 1000);
        if (dayjs(new Date()) > dueDate) {
          pastDate = true;
        }

        const amountToBeRaisedInUSD = Number(amountsToBeRaised[index]);
        const fundingStageTmp = Number(fundingStages[index]);
        const fundingStage = getFundingStage(fundingStageTmp);

        let blockNumberitWentLive = undefined;
        let amountRaisedInUSD = 0;

        if(fundingStageTmp === 4){
          blockNumberitWentLive = assetsWentLive.filter(assetTmp => assetTmp.assetID === asset.assetID)[0].blockNumber;
        }

        // this fixes the issue of price fluctuations
        // a given funded asset can have different "amountRaisedInUSD" and "amountToBeRaisedInUSD"
        if(fundingStage === FundingStages.FUNDED){
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
          fundingStage,
          blockNumberitWentLive,
          pastDate,
          numberOfInvestors,
          fundingDeadline: dueDate,
          ownershipUnits: ownershipUnitsTmp.toString(),
          assetIncome:
            Number(window.web3js.utils.fromWei(assetIncomes[index].toString(), 'ether')) *
              currentEthInUsd,
          assetManager: assetManagers[index],
          city: assetIdDetails.city,
          country: assetIdDetails.country,
          name: assetIdDetails.name,
          description: assetIdDetails.description,
          details: assetIdDetails.details,
          imageSrc: assetIdDetails.imageSrc,
          partner: assetIdDetails.partner,
          managerPercentage: Number(managerPercentages[index]),
          watchListed: alreadyFavorite,
          category: assetIdDetails.category,
          owedToInvestor: owedToInvestor.toString(),
          collateral: assetIdDetails.collateral,
          collateralPercentage: Number(assetIdDetails.collateralPercentage),
          funded: fundingStage === FundingStages.FUNDED,
        };
      }));

      // remove assets that are not in Airtable
      assetsPlusMoreDetails = assetsPlusMoreDetails
        .filter(asset => asset && asset.amountToBeRaisedInUSD > 0);

      debug(assetsPlusMoreDetails)
      resolve(assetsPlusMoreDetails);
    } catch (error) {
      debug(error)
      reject(error);
    }
  });
