import regeneratorRuntime from "regenerator-runtime";
import request from 'request';
require('dotenv').config();
const Airtable = require('airtable');
const AIRTABLE_BASE_ASSETS = 'appk5LSH6lItoapCN';
const AIRTABLE_BASE_CATEGORIES = 'applQoSDpfQMllZc6';

const base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base(AIRTABLE_BASE_ASSETS);

const getIdAndAssetIdsOfAssetName = async (assetName) => {
  const allRecords = await base('Imported table').select();
  const firstPageOfRecords = await allRecords.firstPage();
  const selectedRecord = firstPageOfRecords.filter(record => record.get('Asset') === assetName)[0];

  return selectedRecord ?
    { id: selectedRecord.id, assetIds: selectedRecord.get('Asset IDs') } :
    { id: -1, assetIds: -1 }
}

const updateAirTableEntry = async (id, currentAssetIds, newAssetId, country, city, collateralPercentage) => {
  const formatedString = `${newAssetId}|${country}|${city}|${collateralPercentage}`
  const newAssetIds = currentAssetIds ? currentAssetIds +  `,${formatedString}`: formatedString;
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
    } = data;
    const rowIdAndAssetId = await getIdAndAssetIdsOfAssetName(assetName);
    return await updateAirTableEntry(rowIdAndAssetId.id, rowIdAndAssetId.assetIds, assetId, country, city, collateralPercentage);
  } catch(err){
    console.log(err)
  }
}

export const getAssets = () =>
  request(`https://api.airtable.com/v0/${AIRTABLE_BASE_ASSETS}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`).on('response', (response) => console.log(response.statusCode))

export const getCategories = () =>
  request(`https://api.airtable.com/v0/${AIRTABLE_BASE_CATEGORIES}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)
