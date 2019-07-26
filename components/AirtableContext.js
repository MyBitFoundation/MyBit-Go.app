import { InternalLinks } from 'constants/links';
import {
  AIRTABLE_ASSET_MODELS,
  AIRTABLE_ASSET_LISTINGS,
  AIRTABLE_CATEGORIES_RULES,
  AIRTABLE_ASSET_OPERATORS,
  verifyDataAirtable,
  PULL_ASSETS_TIME,
  PULL_CATEGORIES_TIME,
  DEFAULT_ASSET_INFO,
 } from 'constants/airtable';
import {
  FALLBACK_NETWORK,
} from 'constants/supportedNetworks';

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
      updateAssetModels: this.updateAssetModels,
    }
  }

  componentDidMount = () => {
    const { network } = this.props;
    if(network){
      this.getAssets(network);
    }
    this.setIntervals();
  }

  componentWillReceiveProps = newProps => {
    const { 
      network,
      userHasMetamask,
    } = this.props;
    const { 
      network: newNetwork,
      userHasMetamask: newUserHasMetamask,
    } = newProps;
    if(!network && newNetwork){
      this.getAssets(newNetwork);
    } else if(!network && newUserHasMetamask === false){
      this.getAssets();
    }
  }

  componentWillUnmount = () => {
    this.resetIntervals();
  }

  setIntervals = () => {
    this.intervalPullAssets = setInterval(this.getAssets, 10000)
    this.intervalPullCategories = setInterval(this.getCategories, PULL_CATEGORIES_TIME)
  }

  resetIntervals = () => {
    clearInterval(this.intervalPullAssets);
    clearInterval(this.intervalPullCategories);
  }

  forceRefresh = async (network) => {
    await this.getAssets(network);
  }

  getFiles = filesString => {
    const ipfsFiles = [];
    try{
      if(filesString){
        const filesArr = filesString.split('|');
        for(let i=0;i<filesArr.length;i+=2){
          if(i+1 < filesArr.length){
            const fileName = filesArr[i];
            const ipfs = filesArr[i+1];
            ipfsFiles.push({
              fileName,
              ipfs,
            })
          }
        }
      }
    }
    catch(err){
      console.log("Error getting asset with filesString: ", filesString)
    }
    return ipfsFiles;
  }

  getLocationFromString = locations => {
    let location = undefined;
    if(locations){
      let countries = locations.split(',');
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
    return location;
  }

  processOperators = data => {
    const operators = {};
    data.forEach(({fields}) => {
      assetModels[fields['Operator ID']] = {
        name: fields['Name'],
        imageSrc: `https://s3.eu-central-1.amazonaws.com/mybit-go/assetImages:${fields['Image']}`,
        files: this.getFiles(fields['Files']),
      }
    })

    return assetModels;
  }

  processAssetModels = data => {
    const assetModels = {};
    data.forEach(({fields}) => {
      assetModels[fields['Model ID']] = {
        category: fields['Category'],
        name: fields['Asset'],
        imageSrc: `https://s3.eu-central-1.amazonaws.com/mybit-go/assetImages:${fields['Image']}`,
        partnerAddress: fields['Partner Address'],
        cryptoPayout: fields['Crypto Purchase'],
        cryptoPurchase: fields['Crypto Payout'],
        location: this.getLocationFromString(fields['Location']),
        files: this.getFiles(fields['Files']),
        fundingGoal: fields['Funding Goal'],
        modelId: fields['Model ID'],
      }
    })

    return assetModels;
  }

  processAssetListings = (data, models) => {
    const assetListings = {};
    data.forEach(({fields}) => {
      assetListings[fields['Asset ID']] = {
        financials: fields['Financials'] || DEFAULT_ASSET_INFO.Financials,
        about: fields['About'] || DEFAULT_ASSET_INFO.About,
        risks: fields['Risks'] || DEFAULT_ASSET_INFO.Risks,
        fees: fields['Fees'] || DEFAULT_ASSET_INFO.Fees,
        model: models[fields['Model ID']],
        modelId: fields['Model ID'],
        city: fields['City'],
        country: fields['Country'],
        collateralPercentage: fields['Collateral Percentage'],
        assetAddress1: fields['Route'],
        assetAddress2: fields['Street Number'],
        assetProvince: fields['Province'],
        assetPostalCode: fields['Postal Code'],
        ipfsFiles: this.getFiles(fields['Files']),
      }
    })
    return assetListings;
  }

  updateAssetModels = newAssetModelsWithOperatorInfo => {
    this.setState({assetModels: newAssetModelsWithOperatorInfo})
  }


  getAssets = network => {
    return new Promise(async (res) => {
      try{
        const { userHasMetamask } = this.props;
        network = userHasMetamask ? network || this.props.network : FALLBACK_NETWORK;

        if(network){
          let [assetModels, assetListings] = await Promise.all([
            fetch(InternalLinks.getAirtableAssetModels(network)),
            fetch(InternalLinks.getAirtableAssetListings(network)),
            fetch(InternalLinks.getAirtableOperators(network)),
          ]);
          [assetModels, assetListings] = await Promise.all([
            assetModels.json(),
            assetListings.json(),
          ]);
          const { records: modelsRecords  } = assetModels;
          const { records: listingsRecords  } = assetListings;
          const { records: operatorsRecords  } = assetListings;

          const assetModelsFiltered = verifyDataAirtable(AIRTABLE_ASSET_MODELS, modelsRecords);
          const assetListingsFiltered = verifyDataAirtable(AIRTABLE_ASSET_LISTINGS, listingsRecords);
          const operatorsFiltered = verifyDataAirtable(AIRTABLE_ASSET_OPERATORS, operatorsRecords);
          const assetModelsProcessed = this.processAssetModels(assetModelsFiltered);
          const operatorsProcessed = this.processOperators(operatorsFiltered)
          const assetListingsProcessed = this.processAssetListings(assetListingsFiltered);
          /*
          * we save the network in the state to make sure fetchAssets() in brain.js
          * uses the correct airtable data when pulling the assets, from the correct network
          */
          this.setState({
            assetModels: assetModelsProcessed,
            assetListings: assetListingsProcessed,
            operators: operatorsProcessed,
            network,
          }, () => res());
        }
      }catch(err){
        res({err: err})
      }
    });
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
