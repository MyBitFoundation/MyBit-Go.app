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
  getCategoryFromAssetTypeHash,
} from '../utils/helpers'

let fundingHubContract;

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

export const fetchRevenueLogsByassetId = async (assetId) =>
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

    const futureassetId = generateAssetId(
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
      .then(receipt => onReceipt(receipt.status, futureassetId));

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

export const withdrawInvestorProfit = async (userName, assetId, onTransactionHash, onReceipt, onError) => {
  try {
    const AssetContract = new window.web3js.eth.Contract(
      Asset.ABI,
      Asset.ADDRESS,
    );

    const withdrawResponse = await AssetContract.methods
      .withdraw(assetId)
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

export const fetchAssets = async (userName, currentEthInUsd, assetsAirTableById, categoriesAirTable) =>
  new Promise(async (resolve, reject) => {
    try {
      const apiContract = new window.web3js.eth.Contract(API.ABI, API.ADDRESS);
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

      resolve(assetsPlusMoreDetails);
    } catch (error) {
      debug('failed to fetch assets, error: ', error);
      reject(error);
    }
  });
