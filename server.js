require('dotenv').config();
const express = require('express');
// const basicAuth = require('express-basic-auth');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const fetchAssets = require('./src/util/serverHelper');

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const app = express();

if (process.env.NODE_ENV === 'development') {
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
  const file = req.files;
  const ResponseData = [];
  
  file.map((item) => {
    console.log(item);
    const params = {
      Bucket: bucketName,
      Key: item.originalname,
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
            message: 'It works! Awesome! Its uploaded!',
            data: ResponseData,
          });
        }
      }
    });
  });
});

// app.use(staticUserAuth);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);

async function pullAssets() {
  try {
    assets = await fetchAssets();
    assetsLoaded = true;
  } catch (err) {
    /* eslint no-console: ["error", { allow: ["log", "error"] }] */
    console.log(err);
  }
}

pullAssets();

setInterval(pullAssets, 60000);
