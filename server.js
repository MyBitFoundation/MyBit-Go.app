require('dotenv').config();
const express = require('express');
// const basicAuth = require('express-basic-auth');
const path = require('path');
const fetchAssets = require('./src/util/serverHelper');
const AWS = require('aws-sdk');
const multer  = require('multer');

const accessKeyId =  process.env.AWS_ACCESS_KEY || "xxxxxx";
const secretAccessKey = process.env.AWS_SECRET_KEY || "+xxxxxx+B+xxxxxxx";
const bucketName = process.env.BUCKET_NAME || "castle_in_berlin";
const bucketRegion = process.env.BUCKET_REGION || "alps";
const app = express();

let assets = [];
let assetsLoaded = false;

let multerStorage = multer.memoryStorage()
let multipleUpload = multer({ storage: multerStorage }).any(); //TODO: use more specific validation of any()

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
}

app.get('/api/assets', (req, res) => {
  res.send({
    assets,
    assetsLoaded,
  });
});

app.get('/api/files/list', (req, res) => {
  let s3bucket = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: bucketRegion,
    Bucket: bucketName
  });

  var params = {
    Bucket: bucketName,
    MaxKeys: 1000 //TODO: make this dynamic endpoint 
  };

  s3bucket.listObjectsV2(params, function(err, data) {
    if(err) {
      res.json(err)
    } else {
      res.json(data);
    }
  });
})

app.post('/api/files/upload', multipleUpload, (req, res) => {
  const file = req.files;

  let s3bucket = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: bucketRegion,
    Bucket: bucketName
  });

  var ResponseData = [];
  file.map((item) => {
    var params = {
      Bucket: bucketName,
      Key: item.originalname,
      Body: item.buffer,
      ACL: 'public-read'
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        res.json({
          "error": true,
          "Message": err
        });
      } else {
        ResponseData.push(data);
        if (ResponseData.length == file.length) {
          res.json({
            "error": false,
            "Message": "It works! Awesome! Its uploaded!",
            Data: ResponseData
          });
        }
      }
    });
  });

})

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
