require('dotenv').config();

const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');
import * as AssetCreation from './src/constants/contracts/AssetCreation';

const app = express();

const web3 = require('web3');
let assets = [];

const staticUserAuth = basicAuth({
  users: { admin: process.env.MYBIT_GO_ADMIN_PASSWORD },
  challenge: true,
});

app.get('/api/assets', (req, res) => {
    res.send(assets)
})

app.use(staticUserAuth);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', staticUserAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);


const web3js = new web3(new web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`));


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

  console.log(assets);
}
