import { InternalLinks } from 'constants/links';
import {
  AIRTABLE_ASSETS_RULES,
  AIRTABLE_CATEGORIES_RULES,
  verifyDataAirtable,
  PULL_ASSETS_TIME,
  PULL_CATEGORIES_TIME,
 } from 'constants/airtable';

import {
  fetchWithCache,
} from 'utils/fetchWithCache';

const { Provider, Consumer } = React.createContext({});

// Required so we can trigger getInitialProps in our exported pages
export const withAirtableContext = (Component) => {
  return class Higher extends React.Component{
    static getInitialProps(ctx) {
      if(Component.getInitialProps)
        return Component.getInitialProps(ctx);
      else return {};
    }
    render(){
      return (
        <Consumer>
          {state => <Component {...this.props} airtableContext={state} />}
        </Consumer>
      )
    }
  }
}

class AirtableProvider extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      getCategoriesForAssets: this.getCategoriesForAssets,
      getAssetByName: this.getAssetByName,
      forceRefresh: this.forceRefresh,
    }
    this.categoriesEtag = '';
    this.assetsEtag = '';
  }

  componentDidMount = () => {
    const { network } = this.props;
    if(network){
      this.getAssets(network);
      this.getCategories(network);
    }
    this.setIntervals();
  }

  componentWillUnmount = () => {
    this.resetIntervals();
  }


  componentWillReceiveProps = nextProps => {
    const {
      network: oldNetwork,
    } = this.props;

    const {
      network: newNetwork,
    } = nextProps;

    if(oldNetwork !== newNetwork){
      this.getAssets(newNetwork);
      this.getCategories(newNetwork);
    }
  }

  setIntervals = () => {
    this.intervalPullAssets = setInterval(this.getAssets, 10000)
    this.intervalPullCategories = setInterval(this.getCategories, PULL_CATEGORIES_TIME)
  }

  resetIntervals = () => {
    clearInterval(this.intervalPullAssets);
    clearInterval(this.intervalPullCategories);
  }

  forceRefresh = async () => this.getAssets()

  processAssetsFromAirTable = ({ fields }) => {
    let location = undefined;
    if(fields.Location){
      let countries = fields.Location.split(',');
      location = {};
      countries.forEach(country => {
        country = country.trim();
        let cities = /\(([^)]+)\)/g.exec(country);
        if(cities){
          country = country.substring(0, country.indexOf('(')).trim()
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
      partnerContractAddress: fields['Partner Address'],
      operatorId: fields['Operator ID'],
      imageSrc: `${InternalLinks.S3}assetImages:${fields.Image}`,
      fundingGoal: fields['Funding goal'],
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
    return assetsFromAirTable.filter(asset => asset.name === assetName)[0];
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
    return assetsAirTableById;
  }

  getCategories = async network => {
    network = network || this.props.network;
    if(network){
      const response = await fetchWithCache(InternalLinks.getAirtableCategoriesUrl(network), 'assetsCategories', this);
      // avoid processing and setting state if the data hasn't changed
      if(!response.isCached) {
        const { records } = response.data;

        const filteredCategoriesFromAirtable = verifyDataAirtable(AIRTABLE_CATEGORIES_RULES, records);

        const categoriesAirTable = this.processCategoriesFromAirTable(filteredCategoriesFromAirtable);
        this.setState({
          categoriesAirTable
        });
      }
    }
  }

  getAssets = async network => {
    network = network || this.props.network;
    if(network){
      const response = await fetchWithCache(InternalLinks.getAirtableAssetsUrl(network), 'assetsEtag', this);
      // avoid processing and setting state if the data hasn't changed
      if(!response.isCached) {
        const { records } = response.data;

        const filteredAssetsFromAirtable = verifyDataAirtable(AIRTABLE_ASSETS_RULES, records);

        let assetsAirTable = filteredAssetsFromAirtable.map(this.processAssetsFromAirTable)
        const assetsAirTableById = this.processAssetsByIdFromAirTable(assetsAirTable);

        // remove assetIDs as they are not required in this object
        // they were requred before to facilitate the processing by asset ID
        for(const asset of assetsAirTable){
          delete asset['assetIDs'];
        }

        console.log("assetsAirTableById: ", assetsAirTableById)
        console.log("assetsAirTable: ", assetsAirTable)

        this.setState({
          assetsAirTable,
          assetsAirTableById,
        });
      }
    }
  }

  getCategoriesForAssets = (country, city) => {
    const {
      assetsAirTable,
      categoriesAirTable,
    } = this.state;

    const categories = {};

    if(!assetsAirTable){
      return {};
    }

    for(const asset of assetsAirTable){
      const {
        category,
        location,
      } = asset;

      let shouldAdd = false;
      if(categoriesAirTable[asset.category]){
        /*
        * If the asset does not have a specified location
        * then anyone from anywhere can list it
        */
        if(!asset.location){
          shouldAdd = true;
        }
        /*
        * The user's country needs to an allowed location for the asset
        * and either the city also matches or there are no city specified
        * which means the user is eligible to list this asset
        */
        else if((asset.location[country] && Array.isArray(asset.location[country]) && (asset.location[country].includes(city.toLowerCase())) || (asset.location[country] && Object.keys(asset.location[country]).length === 0))){
          shouldAdd = true;
        }

        if(shouldAdd){
          if(!categories[category]){
            categories[category] = [];
          }
          categories[category].push(asset);
        }
      }
    }
    return categories;
  }

  render(){
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
};

export default AirtableProvider;
