import regeneratorRuntime from "regenerator-runtime";
import request from 'request';
import { fetchAssets } from '../utils';
import * as AssetsController from './assetsController';
require('dotenv').config();
const Airtable = require('airtable');
const AIRTABLE_BASE_ASSETS_ROPSTEN = 'appk5LSH6lItoapCN';
const AIRTABLE_BASE_CATEGORIES_ROPSTEN = 'applQoSDpfQMllZc6';
const AIRTABLE_BASE_ASSETS_MAINNET = 'appINwEcikPPBfzbT';
const AIRTABLE_BASE_CATEGORIES_MAINNET = 'appBrZW4QHoY343Os';
export let assetsById;
// TODO Change to AIRTABLE_BASE_ASSETS_MAINNET once live on mainnet
const base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base(AIRTABLE_BASE_ASSETS_ROPSTEN);

const processAssetsFromAirTable = record => {
  const fundingGoal = record.get('Funding goal');
  const image = record.get('Image');
  // airtable assets (rows) not yet ready
  if(!fundingGoal || !image){
    return null;
  }

  return {
    name: record.get('Asset'),
    category: record.get('Category'),
    description: record.get('Description'),
    details: record.get('Details'),
    partner: record.get('Partner'),
    partnerContractAddress: record.get('Partner Address'),
    operatorId: record.get('Operator ID'),
    imageSrc: `https://s3.eu-central-1.amazonaws.com/mybit-go/assetImages:${image}`,
    fundingGoal: record.get('Funding goal'),
    assetIDs: record.get('Asset IDs'),
    cryptoPurchase: record.get('Crypto Purchase') === 1,
    cryptoPayout: record.get('Crypto Payout') === 1,
  };
}

const getAllAssetInfoById = async () => {
  return new Promise(async (resolve, reject) => {
    const assetInfoById = {};
    base('Asset Info').select().eachPage((records, fetchNextPage) => {
      records.forEach(record => {
          const assetId = record.get('Asset ID');
          const financials = record.get('Financials');
          const risks = record.get('Risks');
          const about = record.get('About');
          assetInfoById[assetId] = {
            financials,
            risks,
            about,
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
          resolve(assetInfoById);
        }
      }
    );
  });
}

const getAllAssetsById = async (newAsset = false) => {
  const allAssetInfoRecord = await getAllAssetInfoById();
  const allRecords = await base('Imported table').select();
  const firstPageOfRecords = await allRecords.firstPage();
  const assets = firstPageOfRecords.map(processAssetsFromAirTable)
  const assetsFiltered = assets.filter(asset => asset !== null)

  const assetsAirTableById = {};
  const tmpCache = {};
  assetsFiltered.forEach(asset => {
    let assetIds = asset.assetIDs;
    if(assetIds){
      const assetName = asset.name;
      const airtableAsset = tmpCache[assetName] || assetsFiltered.filter(asset => asset.name === assetName)[0];
      // add to temporary cache (will help when we have a lot of assets)
      if(airtableAsset && !tmpCache[assetName]){
        tmpCache[assetName] = airtableAsset;
      }
      assetIds = assetIds.split(',');
      assetIds.forEach(assetIdInfo => {
        const [assetId, country, city, collateralPercentage] = assetIdInfo.split('|');
        let financials, risks, about;
        if(allAssetInfoRecord[assetId]){
          financials = allAssetInfoRecord[assetId].financials;
          risks = allAssetInfoRecord[assetId].risks;
          about = allAssetInfoRecord[assetId].about;
        }
        assetsAirTableById[assetId] = {
          defaultData: airtableAsset,
          city,
          country,
          collateralPercentage,
          financials,
          risks,
          about,
        };
      });
    }
  })
  if(!assetsById || newAsset){
    // trigger the first run
    assetsById = assetsAirTableById;
    AssetsController.getAssets();
  } else {
    assetsById = assetsAirTableById;
  }
}

const getIdAndAssetIdsOfAssetName = async (assetName) => {
  const allRecords = await base('Imported table').select();
  const firstPageOfRecords = await allRecords.firstPage();
  const selectedRecord = firstPageOfRecords.filter(record => record.get('Asset') === assetName)[0];

  return selectedRecord ?
    { id: selectedRecord.id, assetIds: selectedRecord.get('Asset IDs') } :
    { id: -1, assetIds: -1 }
}

const updateAirTableEntry = async (id, currentAssetIds, newAssetId, country, city, collateralPercentage, assetManagerEmail) => {
  const formatedString = `${newAssetId}|${country}|${city}|${collateralPercentage}`
  const newAssetIds = currentAssetIds ? currentAssetIds +  `,${formatedString}`: formatedString;

  await base('Asset Managers').create({
    'Asset ID': newAssetId,
    'Email': assetManagerEmail,
  });

  return await base('Imported table').update(id, {
    "Asset IDs": newAssetIds
  });
}

export const addNewAsset = async (data) => {
  try{
    const {
      assetId,
      country,
      city,
      collateralPercentage,
      assetName,
      assetManagerEmail,
      about,
      financials,
      risks,
    } = data;
    await base('Asset Info').create({
      'Asset ID': assetId,
      'About': about,
      'Financials': financials,
      'Risks': risks,
    });

    const rowIdAndAssetId = await getIdAndAssetIdsOfAssetName(assetName);
    await updateAirTableEntry(rowIdAndAssetId.id, rowIdAndAssetId.assetIds, assetId, country, city, collateralPercentage, assetManagerEmail)
    // force refresh assets in the server
    getAllAssetsById(true);
  } catch(err){
    console.log(err)
  }
}

export const getAssets = network =>
  request(`https://api.airtable.com/v0/${network === 'ropsten' ? AIRTABLE_BASE_ASSETS_ROPSTEN : AIRTABLE_BASE_ASSETS_MAINNET}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)

export const getCategories = network =>
  request(`https://api.airtable.com/v0/${network === 'ropsten' ?  AIRTABLE_BASE_CATEGORIES_ROPSTEN : AIRTABLE_BASE_CATEGORIES_MAINNET}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)

export const getAssetsInfo = network =>
  request(`https://api.airtable.com/v0/${network === 'ropsten' ? AIRTABLE_BASE_ASSETS_ROPSTEN : AIRTABLE_BASE_ASSETS_MAINNET}/Asset%20Info?api_key=${process.env.AIRTABLE_KEY}`)

getAllAssetsById();
