import regeneratorRuntime from "regenerator-runtime";
import request from 'request';
import { fetchAssets } from '../utils';
import * as AssetsController from './assetsController';
require('dotenv').config();
const Airtable = require('airtable');
const AIRTABLE_BASE_ASSETS_ROPSTEN = 'appy9WN6JEvAuyA0S';
const AIRTABLE_BASE_ASSETS_MAINNET = 'app98ncQl4JjSLBNA';
export let assetListings;
export let assetModels;
let calledGetAssets = false;
// TODO Change to AIRTABLE_BASE_ASSETS_MAINNET once live on mainnet
const base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base(AIRTABLE_BASE_ASSETS_MAINNET);

const getOperators = async () => {
  return new Promise(async (resolve, reject) => {
    const operators = {};
    base('Operators').select().eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const address = record.get('Address');
        const name = record.get('Name');
        const files = record.get('Files');
        operators[address] = {
          name,
          files,
        };
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, error =>  {
      if (error) {
        console.error(error);
        reject();
      } else {
        resolve(operators);
      }
    });
  })
}

const getAssetModels = async () => {
  return new Promise(async (resolve, reject) => {
    const assetModels = {};
    base('Asset Models').select().eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const category = record.get('Category');
        const name = record.get('Asset');
        const fundingGoal = record.get('Funding Goal');
        const modelId = record.get('Model ID');
        const files = record.get('Files');
        const image = record.get('Image');
        assetModels[modelId] = {
          category,
          name,
          fundingGoal,
          partnerAddress,
          files,
          image,
        };
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, error =>  {
      if (error) {
        console.error(error);
        reject();
      } else {
        resolve(assetModels);
      }
    });
  })
}

export const updateAssetListingFilesString = async data => {
  const { assetId, files } = data;
  let recordId;
  base('Asset Listings').select().eachPage((records, fetchNextPage) => {
    records.forEach(record => {
      if(record.get('Asset ID') === assetId){
        recordId = record.id
        base('Asset Models').update(recordId, {
          "Files": files
        }, (err, record) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    })
    fetchNextPage();
  })
}

const getAssetListings = async assetModels => {
  return new Promise(async (resolve, reject) => {
    const assetListings = {};
    base('Asset Listings').select().eachPage((records, fetchNextPage) => {
      records.forEach(record => {
        const assetId = record.get('Asset ID');
        const modelId = record.get('Model ID');
        const financials = record.get('Financials');
        const risks = record.get('Risks');
        const about = record.get('About');
        const fees = record.get('Fees');
        const city = record.get('City');
        const country = record.get('Country');
        const collateralPercentage = record.get('Collateral Percentage');
        const assetAddress1 = record.get('Route');
        const assetAddress2 = record.get('Street Number');
        const assetProvince = record.get('Province');
        const assetPostalCode = record.get('Postal Code');
        const files = record.get('Files');
        let defaultData = assetModels[modelId];
        defaultData.imageSrc = `https://s3.eu-central-1.amazonaws.com/mybit-go/assetImages:${defaultData.image}`
        assetListings[assetId] = {
          modelId,
          files,
          financials,
          about,
          risks,
          fees,
          city,
          country,
          assetAddress1,
          assetAddress2,
          assetProvince,
          assetPostalCode,
          collateralPercentage,
          defaultData,
        };
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();

    }, error =>  {
      if (error) {
        console.error(error);
        reject();
      } else {
        resolve(assetListings);
      }
    });
  })
}
const getAllAssetsInfo = async (newAsset = false) => {
  try{
    [
      assetOperators,
      assetModels,
      assetListings,
    ] = await Promise.all([
      getOperators,
      getAssetModels,
      getAssetListings,
    ])
    if(!calledGetAssets || newAsset){
      // trigger the first run
      AssetsController.getAssets();
      calledGetAssets = true;
    }
  }catch(err){
    setTimeout(getAllAssetsInfo, 2000);
  }
}

export const addNewAsset = async (data) => {
  try{
    const {
      assetId,
      country,
      city,
      collateralPercentage,
      assetName,
      about,
      financials,
      risks,
      fees,
      modelId,
      assetAddress1,
      assetAddress2,
      assetProvince,
      assetPostalCode,
      files,
    } = data;

    await base('Asset Listings').create({
      'Asset ID': assetId,
      'Model ID': modelId,
      'About': about,
      'Financials': financials,
      'Risks': risks,
      'Fees': fees,
      'City': city,
      'Country': country,
      'Collateral Percentage': collateralPercentage,
      'Route': assetAddress1,
      'Street Number': assetAddress2,
      'Province': assetProvince,
      'Postal Code': assetPostalCode,
      'Files': files,
    });

    // force refresh assets in the server
    getAllAssetsInfo(true);
  } catch(err){
    console.log(err)
  }
}

export const pipeAssetModels = network =>
  request(`https://api.airtable.com/v0/${network === 'ropsten' ? AIRTABLE_BASE_ASSETS_ROPSTEN : AIRTABLE_BASE_ASSETS_MAINNET}/Asset%20Models?api_key=${process.env.AIRTABLE_KEY}`)

export const pipeAssetListings = network =>
  request(`https://api.airtable.com/v0/${network === 'ropsten' ? AIRTABLE_BASE_ASSETS_ROPSTEN : AIRTABLE_BASE_ASSETS_MAINNET}/Asset%20Listings?api_key=${process.env.AIRTABLE_KEY}`)

export const pipeOperators = network =>
    request(`https://api.airtable.com/v0/${network === 'ropsten' ? AIRTABLE_BASE_ASSETS_ROPSTEN : AIRTABLE_BASE_ASSETS_MAINNET}/Operators?api_key=${process.env.AIRTABLE_KEY}`)

getAllAssetsInfo();
setTimeout(getAllAssetsInfo, 10000);
