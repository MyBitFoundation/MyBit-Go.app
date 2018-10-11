require('dotenv').config();
const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const axios = require('axios');
const dayjs = require('dayjs');
const AssetCreation = require('./src/constants/contracts/AssetCreation');
const FundingHub = require('./src/constants/contracts/FundingHub');
const API = require('./src/constants/contracts/API');
const app = express();

const Web3 = require('web3');
let assets = [];
let assetsLoaded = false;
let currentEthInUsd = 0;

const staticUserAuth = basicAuth({
  users: { admin: process.env.MYBIT_GO_ADMIN_PASSWORD },
  challenge: true,
});

if(process.env.NODE_ENV === "development"){
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

app.get('/api/assets', (req, res) => {
    res.send({
      assets,
      assetsLoaded
    })
})

app.use(staticUserAuth);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', staticUserAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);

const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`));


async function fetchPriceFromCoinmarketcap(){
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(
        `https://api.coinmarketcap.com/v2/ticker/1027/`
      );
      const price = response.data.data.quotes.USD.price;
      resolve(Math.round(price * 100) / 100);
    } catch (error) {
      reject(error);
    }
  });
}

async function getNumberOfInvestors(assetID){
  return new Promise(async (resolve, reject) => {
    try {
      const fundingHubContract = new web3.eth.Contract(
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
}

function getCategoryFromAssetTypeHash(web3, assetTypeHash){
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
};

async function fetchAssets(){
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

  const assetIncomes = await Promise.all(assets.map(async asset =>
    apiContract.methods.totalReceived(asset.assetID).call()));

  const fundingStages = await Promise.all(assets.map(async asset =>
    apiContract.methods.fundingStage(asset.assetID).call()));

  let assetsPlusMoreDetails = await Promise.all(assets.map(async (asset, index) => {
    const numberOfInvestors = await getNumberOfInvestors(asset.assetID);

    // determine whether asset has expired
    let pastDate = false;
    const dueDate = dayjs(Number(fundingDeadlines[index]) * 1000);
    if (dayjs(new Date()) > dueDate) {
      pastDate = true;
    }

    const amountToBeRaisedInUSD = amountsToBeRaised[index];
    const fundingStage = fundingStages[index];
    let amountRaisedInUSD = 0;

    // this fixes the issue of price fluctuations
    // a given funded asset can have different "amountRaisedInUSD" and "amountToBeRaisedInUSD"
    if (fundingStage === '3' || fundingStage === '4') {
      amountRaisedInUSD = amountToBeRaisedInUSD;
    } else {
      amountRaisedInUSD = (
        Number(web3.utils.fromWei(amountsRaised[index].toString(), 'ether')) *
          currentEthInUsd
      ).toFixed(2);
    }

    return {
      ...asset,
      amountRaisedInUSD,
      amountToBeRaisedInUSD: amountsToBeRaised[index],
      fundingDeadline: fundingDeadlines[index],
      ownershipUnits: 0,
      assetIncome: (
        Number(web3.utils.fromWei(assetIncomes[index].toString(), 'ether')) *
          currentEthInUsd
      ).toFixed(2),
      assetManager: assetManagers[index],
      numberOfInvestors,
      fundingStage: fundingStages[index],
      pastDate,
    };
  }));

    // filter for v0.1
  assetsPlusMoreDetails = assetsPlusMoreDetails
    .filter(asset => asset.amountToBeRaisedInUSD > 0);

  const assetsWithCategories = assetsPlusMoreDetails.map((asset) => {
    if (asset.assetType) {
      return {
        ...asset,
        category: getCategoryFromAssetTypeHash(web3, asset.assetType),
      };
    }
    return { ...asset };
  });

  return assetsWithCategories;
}

async function main(){
  try{
    do {
      currentEthInUsd = await fetchPriceFromCoinmarketcap();
    }while (currentEthInUsd == 0);

      assets = await fetchAssets();
      assetsLoaded = true;

    }catch(err){
      console.log(err);
    }
}

main();

setInterval(main, 60000);
