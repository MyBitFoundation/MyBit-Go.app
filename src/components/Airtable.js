import React from 'react';
import {
  InternalLinks,
  AIRTABLE_ASSETS_RULES,
  AIRTABLE_CATEGORIES_RULES,
  PULL_ASSETS_TIME,
  PULL_CATEGORIES_TIME,
  verifyDataAirtable,
} from '../constants';

export const AirtableContext = React.createContext(null);

class AirtableProvider extends React.Component {
  constructor(props){
    super(props);
    this.getCategoriesForAssets = this.getCategoriesForAssets;
    this.state = {
      getCategoriesForAssets: this.getCategoriesForAssets,
    }
  }

  componentDidMount = () => {
    this.getAssets();
    this.getCategories();
    this.setIntervals();
  }

  componentWillUnmount = () => {
    this.resetIntervals();
  }

  setIntervals = () => {
    this.intervalPullAssets = setInterval(this.getAssets, PULL_ASSETS_TIME)
    this.intervalPullCategories = setInterval(this.getCategories, PULL_CATEGORIES_TIME)
  }

  resetIntervals = () => {
    clearInterval(this.intervalPullAssets);
    clearInterval(this.intervalPullCategories);
  }

  processAssetsFromAirTable = ({ fields }) => {
    let location = undefined;
    if(fields.Location){
      let countries = fields.Location.split(',');
      location = {};
      countries.forEach(country => {
        country = country.trim();
        let cities = /\(([^)]+)\)/g.exec(country);

        if(cities){
          country = country.substring(0, country.indexOf('('))
          cities = cities[1].split(';');
          location[country] = cities;
        } else {
           location[country] = {};
        }
      })
    }

    return {
      name: fields.Asset,
      category: fields.Category,
      description: fields.Description,
      details: fields.Details,
      partner: fields.Partner,
      imageSrc: `${InternalLinks.S3}assetImages:${fields.Image}`,
      amountToBeRaisedInUSDAirtable: fields['Funding goal'],
      assetIDs: fields['Asset IDs'],
      location,
    };
  }

  processCategoriesFromAirTable = (data) => {
    const categories = {};
    data.forEach(({ fields }) => {
      categories[fields.Category] = {
        contractName: fields['Category Contract'],
        encoded: fields['byte32'],
      }
    })
    return categories;
  }

  getAssetByName = (assetName, assetsFromAirTable) => {
    const tmpAsset = Object.assign({}, assetsFromAirTable.filter(asset => asset.name === assetName)[0]);
    tmpAsset.location = undefined;
    return tmpAsset;
  }

  processAssetsByIdFromAirTable = (assetsFromAirTable) => {
    const assetsAirTableById = {};
    const tmpCache = {};
    assetsFromAirTable.forEach(asset => {
      let assetIds = asset.assetIDs;
      if(assetIds){
        const assetName = asset.name;
        const airtableAsset = tmpCache[assetName] || this.getAssetByName(assetName, assetsFromAirTable);
        // add to temporary cache (will help when we have a lot of assets)
        if(airtableAsset && !tmpCache[assetName]){
          tmpCache[assetName] = airtableAsset;
        }
        assetIds = assetIds.split(',');
        assetIds.forEach(assetIdInfo => {
          const [assetId, city, country, collateral, collateralPercentage] = assetIdInfo.split('|');
          airtableAsset.city = city;
          airtableAsset.country = country;
          airtableAsset.collateral = Number(collateral);
          airtableAsset.collateralPercentage = collateralPercentage;
          assetsAirTableById[assetId] = airtableAsset;
        })
      }
    })
    return assetsAirTableById;
  }

  getCategories = async () => {
    const request = await fetch(InternalLinks.AIRTABLE_CATEGORIES);
    const json = await request.json();
    const { records } = json;

    const filteredCategoriesFromAirtable = verifyDataAirtable(AIRTABLE_CATEGORIES_RULES, records);

    const categoriesAirTable = this.processCategoriesFromAirTable(filteredCategoriesFromAirtable);
    this.setState({
      categoriesAirTable
    });
  }

  getAssets = async () => {
    const request = await fetch(InternalLinks.AIRTABLE_ASSETS);
    const json = await request.json();
    const { records } = json;

    const filteredAssetsFromAirtable = verifyDataAirtable(AIRTABLE_ASSETS_RULES, records);

    let assetsAirTable = filteredAssetsFromAirtable.map(this.processAssetsFromAirTable)
    const assetsAirTableById = this.processAssetsByIdFromAirTable(assetsAirTable);

    // remove assetIDs as they are not required in this object
    // they were requred before to facilitate the processing by asset ID
    assetsAirTable = assetsAirTable.map(asset => {
      delete asset.AssetIDs;
      return {
        ...asset,
      };
    })

    this.setState({
      assetsAirTable,
      assetsAirTableById
    });
  }

  getCategoriesForAssets = (country, city) => {
    const {
      assetsAirTable,
      categoriesAirTable,
    } = this.state;

    let categories = [];
    for(const asset of assetsAirTable){
      if(categories.includes(asset.category)){
        continue;
      }
      if(!asset.location){
        categories.push(categoriesAirTable[asset.category] ? asset.category : undefined);
      } else if (asset.location && asset.location.country === country && (!asset.location.cities || asset.location.cities.includes(city.toLowerCase()))){
        categories.push(categoriesAirTable[asset.category] ? asset.category : undefined);
      }
    }
    return categories;
  }

  render(){
    return (
      <AirtableContext.Provider value={this.state}>
        {this.props.children}
      </AirtableContext.Provider>
    )
  }
};

export default AirtableProvider;
