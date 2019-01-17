import regeneratorRuntime from "regenerator-runtime";
import request from 'request';
require('dotenv').config();
const Airtable = require('airtable');
const airtableBaseAssets = 'appnvQb0LqM1nKTTQ';
const base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base(airtableBaseAssets);

const getIdAndAssetIdsOfAssetName = async (assetName) => {
  let records = await base('Imported table').select();
  records = await records.firstPage();
  for(let i = 0; i < records.length; i++){
    if(records[i].get('Asset') === assetName){
      return {
        id: records[i].id,
        assetIds: records[i].get('Asset IDs')
      }
    }
  };
}

const updateAirTableEntry = async (id, currentAssetIds, newAssetId, country, city, collateral, collateralPercentage) => {
  const formatedString = `${newAssetId}|${country}|${city}|${collateral}|${collateralPercentage}`
  const newAssetIds = currentAssetIds ? currentAssetIds +  `,${formatedString}`: formatedString;
  return await base('Imported table').update(id, {
    "Asset IDs": newAssetIds
  });
}

export const addNewAsset = async (data) => {
  const {
    assetId,
    country,
    city,
    collateral,
    collateralPercentage,
    assetName,
  } = data;
  const rowIdAndAssetId = await getIdAndAssetIdsOfAssetName(assetName);
  return await updateAirTableEntry(rowIdAndAssetId.id, rowIdAndAssetId.assetIds, assetId, country, city, collateral, collateralPercentage);
}

export const getAssets = () =>
  request(`https://api.airtable.com/v0/${airtableBaseAssets}/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)

export const getCategories = () =>
  request(`https://api.airtable.com/v0/applQoSDpfQMllZc6/Imported%20table?api_key=${process.env.AIRTABLE_KEY}`)
