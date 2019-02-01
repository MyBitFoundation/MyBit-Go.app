import regeneratorRuntime from "regenerator-runtime";
import cors from 'cors';
require('dotenv').config();
const express = require('express');
const next = require('next')
const multer = require('multer');
const multerStorage = multer.memoryStorage();
const port = process.env.port || 8081;
const dev = process.env.NODE_ENV !== 'production';
import * as CivicController from './controllers/civicController';
import * as AwsController from './controllers/awsController';
import * as AirTableController from './controllers/airTableController';
import {
  redirects,
} from './constants';

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

  redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
    server[method](from, (req, res) => {
      res.redirect(type, to)
    })
  })

  server.post('/api/airtable/update', async (req, res) => {
    try{
      await AirTableController.addNewAsset(req.body);
      res.sendStatus(200)
    }catch(error){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.use('/api/airtable/assets', (req, res) => {
    try{
      req.pipe(AirTableController.getAssets()).pipe(res);
    }catch(err){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.use('/api/airtable/categories', (req, res) => {
    try{
      req.pipe(AirTableController.getCategories()).pipe(res);
    }catch(error){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.post('/api/list-asset/auth', async (req, res) => {
    try{
      const jwt = req.header('Authorization').split('Bearer ')[1];
      const userData = await CivicController.exchangeCode(jwt);
      res.send({ userData: JSON.stringify(userData, null, 4) });
    }catch(err){
      res.statusCode = 500;
      res.send(error);
    }
  });

  server.get('/api/assets/files', (req, res) => {
    res.json({
      filesByAssetId: AwsController.filesByAssetId,
    });
  });

  server.post('/api/files/upload', multipleUpload, async (req, res) => {
    await AwsController.handleFileUpload(files, assetId, req, res);
  });

  server.get("/asset/:id", (req, res) => {
    return app.render(req, res, "/asset", { id: req.params.id })
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

AwsController.ProcessFilesForAssets();
