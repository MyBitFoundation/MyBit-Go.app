import regeneratorRuntime from "regenerator-runtime";
require('dotenv').config();
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const express = require('express');
const cors = require('cors')
const dev = process.env.NODE_ENV === 'development';
const path = require('path');
import * as CivicController from './controllers/civicController';
import * as AwsController from './controllers/awsController';
import * as AirTableController from './controllers/airTableController';

const multipleUpload = multer({
  storage: multerStorage,
}).any(); // TODO: use more specific validation of any()

const app = express();

if (dev) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

app.use(express.json())
app.use(cors())

app.post('/api/airtable/update', async (req, res) => {
  try{
    await AirTableController.addNewAsset(req.body);
    res.sendStatus(200)
  }catch(err){
    res.statusCode = 500;
    res.send(error);
  }
});

app.use('/api/airtable/assets', (req, res) => {
  req.pipe(AirTableController.getAssets()).pipe(res);
});

app.use('/api/airtable/categories', (req, res) => {
  req.pipe(AirTableController.getCategories()).pipe(res);
});

app.post('/api/list-asset/auth', async (req, res) => {
  try{
    const jwt = req.header('Authorization').split('Bearer ')[1];
    const userData = await CivicController.exchangeCode(jwt);
    res.send({ userData: JSON.stringify(userData, null, 4) });
  }catch(err){
    res.statusCode = 500;
    res.send(error);
  }
});

app.get('/api/assets/files', (req, res) => {
  res.json({
    filesByAssetId: AwsController.filesByAssetId,
  });
});

app.post('/api/files/upload', multipleUpload, async (req, res) => {
  await AwsController.handleFileUpload(files, assetId, req, res);
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(8081, () => console.log("started server"));

AwsController.ProcessFilesForAssets();
