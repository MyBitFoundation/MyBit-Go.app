require('dotenv').config();
const express = require('express');
const request = require('request');
const Airtable = require('airtable');
const dev = process.env.NODE_ENV === 'development';
// const basicAuth = require('express-basic-auth');
const civicSip = require('civic-sip-api');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const fetchAssets = require('./src/util/serverHelper');

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const app = express();
const airtableBaseAssets = dev ? 'appnvQb0LqM1nKTTQ' : 'appqG0TWhvhplwrGL';

const base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base(airtableBaseAssets);

if (dev) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

let assets = [];
let assetsLoaded = false;

const multerStorage = multer.memoryStorage();
const multipleUpload = multer({
  storage: multerStorage,
}).any(); // TODO: use more specific validation of any()

const s3bucket = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region: bucketRegion,
  Bucket: bucketName,
});

const civicClient = civicSip.newClient({
  appId: process.env.REACT_APP_CIVIC_APP_ID,
  prvKey: process.env.CIVIC_PRIVATE_KEY,
  appSecret: process.env.CIVIC_APP_SECRET,
});

async function getIdAndAssetIdsOfAssetName(assetName){
  let records = await base('Imported table').select();
  records = await records.firstPage();
  for(let i = 0; i < records.length; i++){
    if(records[i].get('Asset') === assetName){
      return {
        id: records[i].id,
        assetIds: records[i].get('Asset IDs')
      }
    }
  };
}

async function UpdateAirTableEntry(id, currentAssetIds, newAssetId, country, city){
  return new Promise(async (resolve, reject) => {
    const formatedString = `${newAssetId}|${country}|${city}`
    const newAssetIds = currentAssetIds ? currentAssetIds +  `,${formatedString}`: formatedString;
    base('Imported table').update(id, {
      "Asset IDs": newAssetIds
    }, function(err, record) {
        console.log(record)
        if (err) { console.error(err); resolve(false);}
        else resolve(true)
    });
  });
}

app.use(express.json())

app.post('/api/airtable/update', async function(req, res){
  const assetId = req.body.assetId;
  const country = req.body.country;
  const city = req.body.city;
  const assetName = req.body.assetName;
  const rowIdAndAssetId = await getIdAndAssetIdsOfAssetName(assetName);
  const result = await UpdateAirTableEntry(rowIdAndAssetId.id, rowIdAndAssetId.assetIds, assetId, country, city, res);
  res.sendStatus(result ? 200 : 500);
});

app.use('/api/airtable/assets', function(req, res) {
  req.pipe(request(`https://api.airtable.com/v0/${airtableBaseAssets}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)).pipe(res);
});

app.use('/api/airtable/categories', function(req, res) {
  req.pipe(request(`https://api.airtable.com/v0/applQoSDpfQMllZc6/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)).pipe(res);
});

app.post('/api/list-asset/auth', (req, res) => {
  const jwt = req.header('Authorization').split('Bearer ')[1];
  civicClient.exchangeCode(jwt)
    .then((userData) => {
      res.send({ userData: JSON.stringify(userData, null, 4) });
    }).catch((error) => {
      res.statusCode = 500;
      res.send(error);
      console.log(error);
    });
});

app.get('/api/assets', (req, res) => {
  res.send({
    assets,
    assetsLoaded,
  });
});

app.get('/api/files/list', (req, res) => {
  const params = {
    Bucket: bucketName,
    MaxKeys: 1000, // TODO: make this dynamic
  };

  s3bucket.listObjectsV2(params, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.json(err);
    } else {
      res.statusCode = 200;
      res.json(data);
    }
  });
});

app.post('/api/files/upload', multipleUpload, (req, res) => {
  console.log("handling upload")
  const assetId = req.body.assetId;

  const file = req.files;
  const ResponseData = [];
  console.log("file: ", file)

  file.map((item) => {
    console.log(item);
    const params = {
      Bucket: bucketName,
      Key: `${assetId}:${item.originalname}`,
      Body: item.buffer,
      ACL: 'public-read',
    };
    s3bucket.upload(params, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.json({
          error: true,
          message: err,
        });
      } else {
        ResponseData.push(data);
        if (ResponseData.length === file.length) {
          res.statusCode = 200;
          res.json({
            error: false,
            data: ResponseData,
          });
        }
      }
    });
  });
});

// app.use(staticUserAuth);

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(8080);

async function pullAssets() {
  try {
    console.log(`${new Date().toString()} - pulling assets`)
    assets = await fetchAssets();
    assetsLoaded = true;
    console.log(`${new Date().toString()} - done pulling assets`)
  } catch (err) {
    /* eslint no-console: ["error", { allow: ["log", "error"] }] */
    console.log(err);
  }
}

pullAssets();

setInterval(pullAssets, 60000);
