/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import axios from 'axios';
import dayjs from 'dayjs';
import * as API from '../constants/contracts/API';
import * as AssetCreation from '../constants/contracts/AssetCreation';
import * as FundingHub from '../constants/contracts/FundingHub';
import * as MyBitToken from '../constants/contracts/MyBitToken';
import * as Asset from '../constants/contracts/Asset';
import * as AssetCollateral from '../constants/contracts/AssetCollateral';

import { ErrorTypes } from 'constants/errorTypes';
import {
  InternalLinks,
  ExternalLinks,
} from 'constants/links';
import {
  FundingStages,
  getFundingStage
} from 'constants/fundingStages';
import {
  BLOCK_NUMBER_CONTRACT_CREATION,
  DEFAULT_TOKEN_CONTRACT,
} from 'constants/app';

import {
  generateRandomURI,
  debug,
  getCategoryFromAssetTypeHash,
  fromWeiToEth,
  toWei,
} from '../utils/helpers';

import BN from 'bignumber.js';
BN.config({ EXPONENTIAL_AT: 80 });

const SDK_CONTRACTS = require("@mybit/contracts/networks/ropsten/Contracts");

let fundingHubContract;

let Network;

export const fetchPriceFromCoinmarketcap = async ticker =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${ticker}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
      const jsonResponse = await response.json();
      const info = jsonResponse["market_data"];
      const price = Number(info['current_price']['usd']);
      const priceChangePercentage = Number(info['price_change_percentage_24h']);

      resolve({
        price,
        priceChangePercentage,
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

const roiEscrow = async assetId =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCollateralContract = new window.web3js.eth.Contract(
        AssetCollateral.ABI,
        AssetCollateral.ADDRESS,
      );

      const response = await assetCollateralContract.methods
        .roiEscrow(assetId).call();
        debug(response)
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
export const unlockedEscrow = async assetId =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCollateralContract = new window.web3js.eth.Contract(
        AssetCollateral.ABI,
        AssetCollateral.ADDRESS,
      );

      const response = await assetCollateralContract.methods
        .unlockedEscrow(assetId).call();

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const remainingEscrow = async assetId =>
  new Promise(async (resolve, reject) => {
    try {
      const assetCollateralContract = new window.web3js.eth.Contract(
        AssetCollateral.ABI,
        AssetCollateral.ADDRESS,
      );

      const response = await assetCollateralContract.methods
        .remainingEscrow(assetId).call();

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });

export const withdrawAssetManager = async (userName, assetId, onTransactionHash, onReceipt, onError) => {
  try {
    const assetContract = new window.web3js.eth.Contract(
      Asset.ABI,
      Asset.ADDRESS,
    );

    const response = await assetContract.methods
      .withdrawManagerIncome(assetId)
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
export const withdrawEscrow = async (userName, assetId, onTransactionHash, onReceipt, onError) => {
  try {
    const assetCollateralContract = new window.web3js.eth.Contract(
      AssetCollateral.ABI,
      AssetCollateral.ADDRESS,
    );

    const response = await assetCollateralContract.methods
      .withdrawEscrow(assetId)
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

const getNumberOfInvestors = async assetId =>
  new Promise(async (resolve, reject) => {
    try {
      fundingHubContract = fundingHubContract ? fundingHubContract : new window.web3js.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );

      const assetFundersLog = await fundingHubContract.getPastEvents(
        'LogNewFunder',
        { fromBlock: 0, toBlock: 'latest' },
      );

      const investorsForThisAsset = assetFundersLog
        .filter(txResult => txResult.returnValues._assetID === assetId);

      resolve(investorsForThisAsset.length);
    } catch (err) {
      reject(err);
    }
  });

export const createAsset = async (onTransactionHash, onReceipt, onError, params) => {
  try {
    const {
      asset,
      userAddress,
      managerPercentage,
      collateralMyb,
      partnerContractAddress,
      amountToBeRaised,
    } = params;

    const randomURI = generateRandomURI(window.web3js);
    const api = await Network.api();
    const operatorID = await api.methods.getOperatorID(partnerContractAddress).call();
    const response = await Network.createAsset({
      escrow: toWei(collateralMyb),
      assetURI: randomURI,
      assetManager: userAddress,
      fundingLength: 2592000,
      startTime: 1551732113,
      amountToRaise: toWei(10),
      assetManagerPercent: managerPercentage,
      operatorID,
      fundingToken: DEFAULT_TOKEN_CONTRACT,
      paymentToken: SDK_CONTRACTS.MyBitToken,
      createAsset: {
        onTransactionHash,
        onError: error => processErrorType(error, onError),
      }
    })

    onReceipt(response.asset);
  } catch (error) {
    debug(error)
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
      data.append('file', file.originFileObj ? file.originFileObj : file);
    }
    const result = await axios.post(InternalLinks.S3_UPLOAD,
      data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    if(performInternalAction){
      performInternalAction();
    } else {
      return result;
    }

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
  collateralPercentage,
  performInternalAction,
) => {

  try{
    await axios.post(InternalLinks.UPDATE_ASSETS, {
      assetId,
      assetName,
      country,
      city,
      collateralPercentage,
    });
    performInternalAction();
  } catch(err){
    setTimeout(() => updateAirTableWithNewAsset(assetId, assetName, country, city, collateralPercentage, performInternalAction), 5000);
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

export const payoutAsset = async ({
  userAddress,
  assetId,
  onTransactionHash,
  onReceipt,
  onError,
}) => {
  const response = await Network.payout({
    asset: assetId,
    from: userAddress,
    onTransactionHash,
    onError: error => processErrorType(error, onError),
    onReceipt,
  })
}

export const withdrawInvestorProfit = async (userName, assetId, onTransactionHash, onReceipt, onError) => {
  try {
    const dividendTokenETH = await Network.dividendTokenETH(assetId);
    const response = await dividendTokenETH.methods.withdraw()
      .send({from: userName, gas: '1000000'})
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
    const response = await Network.fundAsset({
      asset: assetId,
      investor: userName,
      paymentToken: DEFAULT_TOKEN_CONTRACT,
      amount,
      buyAsset: {
        onTransactionHash,
        onError: error => processErrorType(error, onError),
      }
    })

    onReceipt(response.status);
  } catch (error) {
    debug(error);
  }
}

const processErrorType = (error, handleError) => {
  console.log(error)
  if(error.message.includes("User denied transaction signature")){
    handleError(ErrorTypes.METAMASK);
  } else{
    handleError(ErrorTypes.ETHEREUM);
  };
}

export const getManagerIncomeEarned = async (managerAddress, assetId) =>
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
      .filter(({ returnValues }) => returnValues._manager === managerAddress && returnValues._assetID === assetId)
      .reduce((accumulator, currentValue) =>
        (accumulator) + Number(currentValue.returnValues._managerAmount)
        ,0)

    resolve(incomeEarned);
  });

export const getManagerIncomeWithdraw = async (managerAddress, assetId) =>
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
      .filter(({ returnValues }) => returnValues._manager === managerAddress && returnValues._assetID === assetId)
      .reduce((accumulator, currentValue) =>
        (accumulator) + Number(currentValue.returnValues.owed)
        ,0)

    resolve(withdrawn);
  });

const getAssetLogsStartedAndWentLive = (assetCreationContract, fundingHubContract) => {
  return Promise.all([
    assetCreationContract.getPastEvents(
      'LogAssetFundingStarted',
      { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
    ),
    fundingHubContract.getPastEvents(
      'LogAssetPayout',
      { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
    )
  ])
}

const getAssetDetails = (assets, apiContract, address) => {
  return Promise.all([
    Promise.all(assets.map(asset =>
      apiContract.methods.assetManager(asset.assetId).call())),

    Promise.all(assets.map(asset =>
      apiContract.methods.amountToBeRaised(asset.assetId).call())),

    Promise.all(assets.map(asset =>
      apiContract.methods.amountRaised(asset.assetId).call())),

    Promise.all(assets.map(asset =>
      apiContract.methods.fundingDeadline(asset.assetId).call())),

    address && Promise.all(assets.map(asset =>
      apiContract.methods.ownershipUnits(asset.assetId, address).call())),

    Promise.all(assets.map(asset =>
      apiContract.methods.totalReceived(asset.assetId).call())),

    Promise.all(assets.map(asset =>
      apiContract.methods.fundingStage(asset.assetId).call())),

    Promise.all(assets.map(asset =>
      apiContract.methods.managerPercentage(asset.assetId).call())),
  ]);
}

const getExtraAssetDetails = (ownershipUnitsTmp, isAssetManager, apiContract, asset, realAddress) => {
  return Promise.all([
    getNumberOfInvestors(asset.assetId),
    ownershipUnitsTmp > 0 ? apiContract.methods.getAmountOwed(asset.assetId, realAddress).call() : 0,
    isAssetManager ? Promise.all([
          getManagerIncomeEarned(realAddress, asset.assetId),
          getManagerIncomeWithdraw(realAddress, asset.assetId)
        ]) : [0, 0],
    ]);
}

export const fetchAssets = async (userAddress, assetsAirTableById, categoriesAirTable) =>
  new Promise(async (resolve, reject) => {
    try {
      if(!Network){
        Network = require('@mybit/network.js')(window.web3js, SDK_CONTRACTS);
      }
      const realAddress = userAddress && window.web3js.utils.toChecksumAddress(userAddress);
      //console.log("Network: ", Network)
      const api = await Network.api();
      //console.log("API: ", api)
      //const operators = await Network.operators();
      //const events = await Network.events();
      const database = await Network.database();
      const events = await Network.events();
      //console.log("events: ", events);
      //console.log("database: ", database)
      //console.log("userAddress: ", userAddress)

      //console.log(database.boolStorage(window.web3js.utils.soliditySha3("operator.acceptsEther", operatorID)))

      let assets = await Network.getTotalAssets();
      assets =
        assets
          .filter(assetContractAddress => assetsAirTableById[assetContractAddress] !== undefined)
          .map(assetContractAddress => {
            return {
              ...assetsAirTableById[assetContractAddress],
              assetId: assetContractAddress,
            }
          });

      //console.log("assets: ", assets)

      const assetDetails = await Promise.all(assets.map(async asset =>  {
        const {
          assetId,
        } = asset;
        const dividendTokenETH = await Network.dividendTokenETH(assetId);
        let platformFee = await api.methods.getAssetPlatformFee(assetId).call();
        const assetOperator = await Network.getAssetOperator(assetId);
        const crowdsaleFinalized = await api.methods.crowdsaleFinalized(assetId).call();
        const fundingDeadline = await api.methods.getCrowdsaleDeadline(assetId).call();
        let fundingGoal = await Network.getFundingGoal(assetId);
        const assetManager = await Network.getAssetManager(assetId);
        const assetInvestors = await Network.getAssetInvestors(assetId);
        let fundingProgress = await Network.getFundingProgress(assetId);
        let assetManagerFee = await api.methods.getAssetManagerFee(assetId).call();

        const escrowId = await api.methods.getAssetManagerEscrowID(assetId, assetManager).call();
        const escrow = await api.methods.getAssetManagerEscrow(escrowId).call();
        let daysSinceItWentLive = 1;
        let assetIncome = 0;
        let managerHasToCallPayout = false;
        let investment = 0;
        let totalShares = 0;
        let availableShares = 0;
        let owedToInvestor = 0;

        assetManagerFee = BN(assetManagerFee);
        platformFee = BN(platformFee);
        fundingGoal = BN(fundingGoal);
        fundingProgress = BN(fundingProgress);
        totalShares = fundingGoal.plus(assetManagerFee).plus(platformFee);
        availableShares = totalShares.minus(assetManagerFee).minus(platformFee).minus(fundingProgress);
        assetManagerFee = assetManagerFee.div(totalShares).toNumber();
        platformFee = platformFee.div(totalShares).toNumber();
        fundingGoal = fundingGoal.toNumber();

        availableShares = availableShares.toNumber();
        totalShares = totalShares.toNumber();

        console.log("Total sharest: ", totalShares)
        console.log("Asset contract: ", assetId)
        console.log("Asset operator: ", assetOperator)
        console.log("Crowdsale finalized: ", crowdsaleFinalized);
        console.log("Funding Deadline: ", fundingDeadline);
        console.log("Funding goal: ", fundingGoal);
        console.log("Asset manager: ", assetManager);
        console.log("Asset Investors: ", assetInvestors)
        console.log("Funding Progress: ", fundingProgress)
        console.log("Manager fee bgn: ", assetManagerFee)
        console.log("Platform fee: ", platformFee)
        console.log("Escrow Id: ", escrowId);
        console.log("Escrow: ", fromWeiToEth(BN(escrow).toString()))
        console.log("\n\n")

        let percentageOwnedByUser = 0;
        if(realAddress && assetInvestors.includes(realAddress)){
          const balanceOfUser = await dividendTokenETH.methods.balanceOf(realAddress).call();
          investment = fromWeiToEth(BN(balanceOfUser).toString());
          percentageOwnedByUser = BN(balanceOfUser).div(totalShares).toNumber();
          if(crowdsaleFinalized){
            const timestamp = await Network.getTimestampeOfFundedAsset(assetId)
            //console.log("BLOCK: ", timestamp)
            if(timestamp){
              daysSinceItWentLive = dayjs().diff(dayjs(timestamp * 1000), 'day');
              daysSinceItWentLive = daysSinceItWentLive === 0 ? 1 : daysSinceItWentLive;
              assetIncome = await dividendTokenETH.methods.assetIncome().call();
              assetIncome = Number(fromWeiToEth(BN(assetIncome)));
              fundingProgress = fundingProgress - ((assetManagerFee + platformFee) * fundingProgress)
              owedToInvestor = await dividendTokenETH.methods.getAmountOwed(realAddress).call();
              //console.log("ASSET INCOME: ", assetIncome)
              /*const result = await Network.issueDividends({
                asset: assetId,
                account: realAddress,
                amount: toWei(1),
              });*/
              //console.log("daysSinceItWentLive: ", daysSinceItWentLive);
            } else {
              managerHasToCallPayout = true;
            }
          }

          console.log("DividendTokenETH: ", dividendTokenETH)
          console.log("INVESTMENT: ", fromWeiToEth(BN(balanceOfUser).toString()));
          console.log("Percentage: ", percentageOwnedByUser);
          console.log("owedToInvestor: ", fromWeiToEth(BN(owedToInvestor)));
          console.log("\n\n")
          console.log("\n\n")
        }

        const searchQuery = `mybit_watchlist_${assetId}`;
        const alreadyFavorite = window.localStorage.getItem(searchQuery) === 'true';

        // determine whether asset has expired
        const dueDate = dayjs(fundingDeadline * 1000);
        const pastDate = dayjs() >= dueDate ? true : false;

        const fundingStageTmp = crowdsaleFinalized ? 0 : (!pastDate && !crowdsaleFinalized) ? 2 : 1;
        const fundingStage = getFundingStage(fundingStageTmp);

        const isAssetManager = assetManager === realAddress;

        return {
          ...asset,
          managerHasToCallPayout,
          fundingGoal: Number(Number(fromWeiToEth(fundingGoal)).toFixed(2)),
          fundingProgress: Number(Number(fromWeiToEth(fundingProgress)).toFixed(2)),
          fundingStage,
          pastDate,
          isAssetManager,
          assetManager,
          percentageOwnedByUser,
          daysSinceItWentLive,
          assetIncome,
          owedToInvestor,
          userInvestment: investment,
          totalSupply: Number(fromWeiToEth(totalShares)),
          availableShares: Number(fromWeiToEth(availableShares)),
          managerPercentage: assetManagerFee,
          fundingDeadline: dueDate,
          numberOfInvestors: assetInvestors.length,
          blockNumberitWentLive: 0,
          managerTotalIncome: 0,
          managerTotalWithdrawn: 0,
          watchListed: alreadyFavorite,
          funded: fundingStage === FundingStages.FUNDED,
        };
      }));
      //console.log("getOpenCrowdsales: ", Network.getOpenCrowdsales())
      //console.log("OPERATORS: ", operators)
      //console.log("all events: ", operators.allEvents())
      //console.log(operatorID)
      //console.log("getting operator id...")
      //const operatorID = await api.methods.getOperatorID('0x4DC8346e7c5EFc0db20f7DC8Bb1BacAF182b077d').call();

      /*const x = await Network.acceptERC20Token({
        id: operatorID,
        token: DEFAULT_TOKEN_CONTRACT,
        operator: '0x4DC8346e7c5EFc0db20f7DC8Bb1BacAF182b077d',
      });*/


      // 30 days = 2678400
      // 3 hours = 10800
      /*console.log(Network.createAsset({
        escrow: toWei(2500),
        assetURI: '0xBB64ac045539bC0e9FFfd04399347a8459e8282A12356791011234567',
        assetManager: '0xBB64ac045539bC0e9FFfd04399347a8459e8282A',
        fundingLength: 10800,
        startTime: 1551732113,
        amountToRaise: toWei(0.77),
        assetManagerPercent: 17,
        operatorID,
      }));*/

      console.log("ALL ASSETS: ", assetDetails)
      resolve(assetDetails);

      /*const apiContract = new window.web3js.eth.Contract(API.ABI, API.ADDRESS);
      const assetCreationContract = new window.web3js.eth.Contract(
        AssetCreation.ABI,
        AssetCreation.ADDRESS,
      );

      const fundingHubContract = new window.web3js.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );

      const [
        logAssetFundingStartedEvents,
        logAssetsWentLive,
      ] = await getAssetLogsStartedAndWentLive(assetCreationContract, fundingHubContract);

      let assets = logAssetFundingStartedEvents
        .map(({ returnValues }) => returnValues)
        .map(object => ({
          assetId: object._assetID,
          assetType: object._assetType,
          ipfsHash: object._ipfsHash,
        }));

      const assetsWentLive = logAssetsWentLive
        .map(object => ({
          assetId: object.returnValues._assetID,
          blockNumber: object.blockNumber,
        }));

      const realAddress = userName && window.web3js.utils.toChecksumAddress(userName);

      // if the asset Id is not on airtable it doens't show up in the platform
      assets =
        assets
          .filter(asset => assetsAirTableById[asset.assetId] !== undefined)
          .map(asset => {
            return {
              ...asset,
              ...assetsAirTableById[asset.assetId],
              collateralPercentage: Number(assetsAirTableById[asset.assetId].collateralPercentage),
            }
          });

      const [
        assetManagers,
        amountsToBeRaised,
        amountsRaised,
        fundingDeadlines,
        ownershipUnits,
        assetIncomes,
        fundingStages,
        managerPercentages,
      ] = await getAssetDetails(assets, apiContract, realAddress);

      let assetsPlusMoreDetails = await Promise.all(assets.map(async (asset, index) => {
        const ownershipUnitsTmp = (realAddress && ownershipUnits[index]) || 0;
        const isAssetManager = assetManagers[index] === realAddress;

        const [
          numberOfInvestors,
          owedToInvestor,
          managerDetails,
        ] = await getExtraAssetDetails(ownershipUnitsTmp, isAssetManager, apiContract, asset, realAddress);

        const [
          managerTotalIncome,
          managerTotalWithdrawn,
        ] = managerDetails;

        // determine whether asset has expired
        const dueDate = dayjs(Number(fundingDeadlines[index]) * 1000);
        const pastDate = dayjs(new Date()) > dueDate ? true : false;
        const amountToBeRaisedInUSD = Number(amountsToBeRaised[index]);
        const fundingStageTmp = Number(fundingStages[index]);
        const fundingStage = getFundingStage(fundingStageTmp);

        const blockNumberitWentLive =
          fundingStageTmp === 4
            ? assetsWentLive.filter(assetTmp => assetTmp.assetId === asset.assetId)[0].blockNumber
            : undefined;

        // this fixes the issue of price fluctuations
        // a given funded asset can have different "amountRaisedInUSD" and "amountToBeRaisedInUSD"
        const amountRaisedInUSD =
          fundingStage === FundingStages.FUNDED
          ? amountToBeRaisedInUSD
          : Number(window.web3js.utils.fromWei(amountsRaised[index].toString(), 'ether')) *
              currentEthInUsd;

        const searchQuery = `mybit_watchlist_${asset.assetId}`;
        const alreadyFavorite = window.localStorage.getItem(searchQuery) === 'true';

        return {
          ...asset,
          amountRaisedInUSD,
          amountToBeRaisedInUSD,
          fundingStage,
          blockNumberitWentLive,
          pastDate,
          numberOfInvestors,
          isAssetManager,
          managerTotalIncome,
          managerTotalWithdrawn,
          fundingDeadline: dueDate,
          ownershipUnits: ownershipUnitsTmp.toString(),
          assetIncome:
            Number(window.web3js.utils.fromWei(assetIncomes[index].toString(), 'ether')) *
              currentEthInUsd,
          assetManager: assetManagers[index],
          managerPercentage: Number(managerPercentages[index]),
          watchListed: alreadyFavorite,
          owedToInvestor: owedToInvestor.toString(),
          funded: fundingStage === FundingStages.FUNDED,
        };
      }));

      // remove assets that are not in Airtable
      assetsPlusMoreDetails = assetsPlusMoreDetails
        .filter(asset => asset && asset.amountToBeRaisedInUSD > 0);

      resolve(assetsPlusMoreDetails);*/
    } catch (error) {
      debug('failed to fetch assets, error: ', error);
      reject(error);
    }
  });
