import regeneratorRuntime from 'regenerator-runtime';
import cors from 'cors';
import * as AirTableController from './controllers/airTableController';
import { uploadFiles } from './controllers/cloudinaryController';

import {
  handleRedirects,
} from './utils';

require('dotenv').config();
const express = require('express');
const compression = require('compression');
const next = require('next');
const multer = require('multer');

const multerStorage = multer.memoryStorage();
const port = process.env.port || 8081;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const COVERPICTURE_SIZE_LIMIT = 2 * 1024 * 1024;

const multipleUpload = multer({
  storage: multerStorage,
}).any(); // TODO: use more specific validation of any()

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(cors());
    server.use(compression());

    server.post('/api/airtable/update/:network', multipleUpload, async (req, res) => {
      try {
        const network = req.params.network;
        const assetDetails = JSON.parse(req.body.details);
        const { assetId } = assetDetails;

        if (req.files.find(file => (file.fieldname === 'file' && file.size > FILE_SIZE_LIMIT)
        || (file.fieldname === 'coverPicture' && file.size > COVERPICTURE_SIZE_LIMIT))) { throw new Error('One or more files exceed the size limit!'); }

        if (req.files.length > 6) { // 5 asset files & 1 cover picture file
          throw new Error('Too many asset files!');
        }

        const coverPicture = req.files.find(file => file.fieldname === 'coverPicture');
        const files = req.files.filter(file => file.fieldname === 'file');

        const [uploadedCoverPicture, ...uploadedFiles] = await uploadFiles(
          [coverPicture, ...files],
        );
        await AirTableController.addNewAsset(assetDetails, network);
        await AirTableController.updateAssetFiles({ assetId, files: uploadedFiles }, network);
        await AirTableController.updateCoverPicture(
          { assetId, file: uploadedCoverPicture }, network,
        );
        res.sendStatus(200);
      } catch (error) {
        console.error(error);
        res.statusCode = 500;
        res.send(error);
      }
    });

    server.post('/api/airtable/updateAssetListing/:network', async (req, res) => {
      try {
        const network = req.params.network;
        await AirTableController.updateAssetListing(req.body, network);
        res.sendStatus(200);
      } catch (error) {
        res.statusCode = 500;
        res.send(error);
      }
    });

    server.get('/api/airtable/assetListings/:network', (req, res) => {
      try {
        const network = req.params.network;
        req.pipe(AirTableController.pipeAssetListings(network)).pipe(res);
      } catch (error) {
        res.statusCode = 500;
        res.send(error);
      }
    });

    server.get('/api/airtable/operators/:network', (req, res) => {
      try {
        const network = req.params.network;
        req.pipe(AirTableController.pipeOperators(network)).pipe(res);
      } catch (error) {
        res.statusCode = 500;
        res.send(error);
      }
    });

    server.get('/api/assets/files', (req, res) => {
      res.json({
        filesByAssetId: {},
      });
    });

    // server.post('/api/files/upload/:network?', multipleUpload, async (req, res) => {
    //   try {
    //     const network = req.params.network;
    //     const assetId = req.body.assetId;
    //     const files = req.files;
    //     const uploadedFiles = await uploadFiles(files);

    //     await AirTableController.updateAssetFiles({ assetId, files: uploadedFiles }, network);
    //     res.sendStatus(200);
    //   } catch (error) {
    //     console.error(error);
    //     res.statusCode = 500;
    //     res.send(error);
    //   }
    // });

    server.get('/manage/:id', (req, res) => app.render(req, res, '/manage', { id: req.params.id }));

    server.get('/asset-managers/:id', (req, res) => app.render(req, res, '/asset-managers', { id: req.params.id }));

    server.get('/portfolio/:type', (req, res) => app.render(req, res, '/portfolio', { type: req.params.type }));

    server.get('/asset/:id', (req, res) =>
      /*
      * Not the most pleasent way to handle this.
      * Unfortunately if this routing declaration is put
      * under the '*' pattern then SSR stops working for this route
      */
      handleRedirects(req, res, handle, app, true) || app.render(req, res, '/asset', { id: req.params.id }));

    server.get('*', (req, res) => handleRedirects(req, res, handle, app));

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.info(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

// AwsController.ProcessFilesForAssets();
