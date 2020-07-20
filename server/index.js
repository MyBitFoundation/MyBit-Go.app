import regeneratorRuntime from "regenerator-runtime";
import cors from 'cors';
require('dotenv').config();
const express = require('express');
const compression = require('compression');
const next = require('next');
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const port = process.env.port || 8081;
const dev = process.env.NODE_ENV !== 'production';
// import * as AwsController from './controllers/awsController';
import * as AirTableController from './controllers/airTableController';

import {
  handleRedirects,
} from './utils';

const app = next({ dev });
const handle = app.getRequestHandler();

const multipleUpload = multer({
  storage: multerStorage,
}).any(); // TODO: use more specific validation of any()

app
.prepare()
.then(() => {
  const server = express();
  server.use(express.json());
  server.use(cors());
  server.use(compression())

  server.post('/api/airtable/update/:network', async (req, res) => {
    try{
      const network = req.params.network;
      await AirTableController.addNewAsset(req.body, network);
      res.sendStatus(200)
    }catch(error){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.post('/api/airtable/updateAssetListing/:network', async (req, res) => {
    try{
      const network = req.params.network;
      await AirTableController.updateAssetListing(req.body, network);
      res.sendStatus(200)
    }catch(error){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.get('/api/airtable/assetModels/:network', (req, res) => {
    try{
      const network = req.params.network;
      req.pipe(AirTableController.pipeAssetModels(network)).pipe(res);
    }catch(err){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.get('/api/airtable/assetListings/:network', (req, res) => {
    try{
      const network = req.params.network;
      req.pipe(AirTableController.pipeAssetListings(network)).pipe(res);
    }catch(error){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.get('/api/airtable/operators/:network', (req, res) => {
    try{
      const network = req.params.network;
      req.pipe(AirTableController.pipeOperators(network)).pipe(res);
    }catch(error){
      res.statusCode = 500;
      res.send(error);
    }
  });

  // server.get('/api/assets/files', (req, res) => {
  //   res.json({
  //     filesByAssetId: AwsController.filesByAssetId,
  //   });
  // });

  server.post('/api/files/upload', multipleUpload, async (req, res) => {
    const assetId = req.body.assetId;
    const files = req.files;

    // await AwsController.handleFileUpload(files, assetId, req, res);
    res.sendStatus(200);
  });

  server.get("/manage/:id", (req, res) => {
    return app.render(req, res, "/manage", { id: req.params.id })
  })

  server.get("/asset-managers/:id", (req, res) => {
    return app.render(req, res, "/asset-managers", { id: req.params.id })
  })

  server.get("/portfolio/:type", (req, res) => {
    return app.render(req, res, "/portfolio", { type: req.params.type })
  })

  server.get("/asset/:id", (req, res) => {
    /*
    * Not the most pleasent way to handle this.
    * Unfortunately if this routing declaration is put
    * under the '*' pattern then SSR stops working for this route
    */
    return handleRedirects(req, res, handle, app, true) || app.render(req, res, "/asset", { id: req.params.id });
  })

  server.get('*', (req, res) => {
    return handleRedirects(req, res, handle, app);
  })

  server.get('*', (req, res) => {
      return handle(req, res)
  })

  server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

// AwsController.ProcessFilesForAssets();
