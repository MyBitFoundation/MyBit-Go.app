import regeneratorRuntime from "regenerator-runtime";
import request from 'request';
import { fetchAssets } from '../utils';
import * as AssetsController from './assetsController';
require('dotenv').config();
const Airtable = require('airtable');
const AIRTABLE_BASE_ASSETS = 'appk5LSH6lItoapCN';
const AIRTABLE_BASE_CATEGORIES = 'applQoSDpfQMllZc6';
export let assetsById;
const base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base(AIRTABLE_BASE_ASSETS);

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
  };
}

const getAllAssetsById = async (newAsset = false) => {
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
        assetsAirTableById[assetId] = {
          defaultData: airtableAsset,
          city,
          country,
          collateralPercentage,
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
    } = data;
    const rowIdAndAssetId = await getIdAndAssetIdsOfAssetName(assetName);
    await updateAirTableEntry(rowIdAndAssetId.id, rowIdAndAssetId.assetIds, assetId, country, city, collateralPercentage, assetManagerEmail);
    // force refresh assets in the server
    getAllAssetsById(true);
  } catch(err){
    console.log(err)
  }
}

export const getAssets = () =>
  request(`https://api.airtable.com/v0/${AIRTABLE_BASE_ASSETS}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)

export const getCategories = () =>
  request(`https://api.airtable.com/v0/${AIRTABLE_BASE_CATEGORIES}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)

getAllAssetsById();
