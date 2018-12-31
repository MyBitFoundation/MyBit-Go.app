/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */

const axios = require('axios');
const dayjs = require('dayjs');
const AssetCreation = require('../constants/contracts/AssetCreation');
const FundingHub = require('../constants/contracts/FundingHub');
const API = require('../constants/contracts/API');

const Web3 = require('web3');

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`));

let currentEthInUsd = 0;

const BLOCK_NUMBER_CONTRACT_CREATION = 4619384;

async function fetchPriceFromCoinmarketcap() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios('https://api.coinmarketcap.com/v2/ticker/1027/');
      const { price } = response.data.data.quotes.USD;
      resolve(Math.round(price * 100) / 100);
    } catch (error) {
      reject(error);
    }
  });
}

async function getNumberOfInvestors(assetID) {
  return new Promise(async (resolve, reject) => {
    try {
      const fundingHubContract = new web3.eth.Contract(
        FundingHub.ABI,
        FundingHub.ADDRESS,
      );
      const assetFundersLog = await fundingHubContract.getPastEvents(
        'LogNewFunder',
        { fromBlock: BLOCK_NUMBER_CONTRACT_CREATION, toBlock: 'latest' },
      );

      const investorsForThisAsset = assetFundersLog
        .filter(txResult => txResult.returnValues._assetID === assetID);

      resolve(investorsForThisAsset.length);
    } catch (err) {
      reject(err);
    }
  });
}

function getCategoryFromAssetTypeHash(assetTypeHash) {
  switch (assetTypeHash) {
    case web3.utils.sha3('bitcoinatm'):
      return 'bitcoinatm';
    case web3.utils.sha3('cryptomining'):
      return 'cryptomining';
    case web3.utils.sha3('realestatestorage'):
      return 'realestatestorage';
    case web3.utils.sha3('realestatecoworking'):
      return 'realestatecoworking';
    case web3.utils.sha3('chargingstation'):
      return 'chargingstation';
    case web3.utils.sha3('dronedelivery'):
      return 'dronedelivery';
    case web3.utils.sha3('autonomousvehicles'):
      return 'autonomousvehicles';
    case web3.utils.sha3('solarenergy'):
      return 'solarenergy';
    case web3.utils.sha3('windenergy'):
      return 'other';
    case web3.utils.sha3('masternodes'):
      return 'masternodes';
    case web3.utils.sha3('vendingmachines'):
      return 'vendingmachines';
    default:
      return 'other';
  }
}

async function fetchAssets() {
  do {
    currentEthInUsd = await fetchPriceFromCoinmarketcap();
  } while (currentEthInUsd === 0);

  // pull asssets from newest contract
  let apiContract = new web3.eth.Contract(API.ABI, API.ADDRESS);
  let assetCreationContract = new web3.eth.Contract(
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

  const assetManagers = await Promise.all(assets.map(async asset =>
    apiContract.methods.assetManager(asset.assetID).call()));

  const amountsToBeRaised = await Promise.all(assets.map(async asset =>
    apiContract.methods.amountToBeRaised(asset.assetID).call()));

  const amountsRaised = await Promise.all(assets.map(async asset =>
    apiContract.methods.amountRaised(asset.assetID).call()));

  const fundingDeadlines = await Promise.all(assets.map(async asset =>
    apiContract.methods.fundingDeadline(asset.assetID).call()));

  const assetIncomes = await Promise.all(assets.map(async asset =>
    apiContract.methods.totalReceived(asset.assetID).call()));

  const fundingStages = await Promise.all(assets.map(async asset =>
    apiContract.methods.fundingStage(asset.assetID).call()));

  const managerPercentages = await Promise.all(assets.map(async asset =>
    apiContract.methods.managerPercentage(asset.assetID).call()));


  let assetsPlusMoreDetails = await Promise.all(assets.map(async (asset, index) => {
    const numberOfInvestors = await getNumberOfInvestors(asset.assetID);

    // determine whether asset has expired
    let pastDate = false;
    const dueDate = dayjs(Number(fundingDeadlines[index]) * 1000);
    if (dayjs(new Date()) > dueDate) {
      pastDate = true;
    }

    const amountToBeRaisedInUSD = Number(amountsToBeRaised[index]);
    const fundingStage = Number(fundingStages[index]);
    let amountRaisedInUSD = 0;

    // this fixes the issue of price fluctuations
    // a given funded asset can have different "amountRaisedInUSD" and "amountToBeRaisedInUSD"
    if (fundingStage === 3 || fundingStage === 4) {
      amountRaisedInUSD = amountToBeRaisedInUSD;
    } else {
      amountRaisedInUSD =
        Number(web3.utils.fromWei(amountsRaised[index].toString(), 'ether')) *
          currentEthInUsd;
    }

    return {
      ...asset,
      amountRaisedInUSD,
      amountToBeRaisedInUSD: amountsToBeRaised[index],
      fundingDeadline: fundingDeadlines[index],
      ownershipUnits: '0',
      assetIncome:
        Number(web3.utils.fromWei(assetIncomes[index].toString(), 'ether')) *
          currentEthInUsd,
      assetManager: assetManagers[index],
      numberOfInvestors,
      fundingStage,
      managerPercentage: Number(managerPercentages[index]),
      pastDate,
    };
  }));

    // filter for v0.1
  assetsPlusMoreDetails = assetsPlusMoreDetails
    .filter(asset => asset.amountToBeRaisedInUSD > 0);

  return assetsPlusMoreDetails;
}

module.exports = fetchAssets;
