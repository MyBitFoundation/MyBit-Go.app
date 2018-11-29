require('dotenv').config();
const express = require('express');
// const basicAuth = require('express-basic-auth');
const path = require('path');
const fetchAssets = require('./src/util/serverHelper');

const app = express();

let assets = [];
let assetsLoaded = false;

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
