import axios from 'axios';
import { InternalLinks } from 'constants/links';
import {
  AIRTABLE_ASSET_LISTINGS,
  AIRTABLE_CATEGORIES_RULES,
  AIRTABLE_OPERATORS,
  verifyDataAirtable,
  PULL_ASSETS_TIME,
  PULL_CATEGORIES_TIME,
} from 'constants/airtable';
import {
  DEFAULT_ASSET_INFO,
} from 'constants/app';
import {
  FALLBACK_NETWORK,
} from 'constants/supportedNetworks';

const { Provider, Consumer } = React.createContext({});

// Required so we can trigger getInitialProps in our exported pages
export const withAirtableContext = Component => class Higher extends React.Component {
  render() {
    return (
      <Consumer>
        {state => <Component {...this.props} {...state} />}
      </Consumer>
    );
  }
};

export const getStaticProps = () => ({
  props: {},
});

class AirtableProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      getAssetsFromAirtable: this.getAssets,
      fetchNewAssetListing: this.fetchNewAssetListing,
    };
  }

  getFiles = (filesString) => {
    const ipfsFiles = [];
    try {
      if (filesString) {
        const filesArr = filesString.split('|');
        for (let i = 0; i < filesArr.length; i += 2) {
          if (i + 1 < filesArr.length) {
            const name = filesArr[i];
            const hash = filesArr[i + 1];
            ipfsFiles.push({
              name,
              hash,
            });
          }
        }
      }
    } catch (err) {
      console.error('Error getting asset with filesString: ', filesString);
    }
    return ipfsFiles;
  }

  getLocationFromString = (locations) => {
    let location;
    if (locations) {
      const countries = locations.split(',');
      location = {};
      countries.forEach((country) => {
        country = country.trim();
        let cities = /\(([^)]+)\)/g.exec(country);
        if (cities) {
          country = country.substring(0, country.indexOf('(')).trim();
          cities = cities[1].split(';');
          location[country] = cities;
        } else {
          location[country] = {};
        }
      });
    }
    return location;
  }

  processOperators = (data) => {
    const operators = {};
    data.forEach(({ fields }) => {
      operators[fields.Address] = {
        name: fields.Name,
        files: this.getFiles(fields['IPFS Files']),
      };
    });
    return operators;
  }

  processAssetListings = (data) => {
    const assetListings = {};
    data.forEach(({ fields }) => {
      assetListings[fields['Asset ID']] = {
        assetName: fields['Asset Name'],
        financials: fields.Financials || DEFAULT_ASSET_INFO.Financials,
        about: fields.About || DEFAULT_ASSET_INFO.About,
        risks: fields.Risks || DEFAULT_ASSET_INFO.Risks,
        city: fields.City,
        country: fields.Country,
        collateralPercentage: fields['Collateral Percentage'],
        assetAddress1: fields.Route,
        assetAddress2: fields['Street Number'],
        assetProvince: fields.Province,
        assetPostalCode: fields['Postal Code'],
        files: fields['Files'],
        coverPicture: fields['Cover Picture']?.[0],
      };
    });
    return assetListings;
  }

  fetchNewAssetListing = async (network, updateFunction, assetId) => {
    let assetListings = await fetch(InternalLinks.getAirtableAssetListings(network));
    assetListings = await assetListings.json();
    const { records: listingsRecords } = assetListings;
    const assetListingsFiltered = verifyDataAirtable(AIRTABLE_ASSET_LISTINGS, listingsRecords);
    const assetListingsProcessed = this.processAssetListings(assetListingsFiltered);
    if (assetListingsProcessed[assetId]) {
      updateFunction({ assetListings: assetListingsProcessed, network, airtable: true });
    } else {
      setTimeout(() => this.fetchNewAssetListing(network, updateFunction, assetId), 200);
    }
  }

  getAssets = async (network, updateFunction) => {
    try {
      this.updateFunction = updateFunction;

      let assetListings = await fetch(InternalLinks.getAirtableAssetListings(network));
      assetListings = await assetListings.json();
      const { records: listingsRecords } = assetListings;

      const assetListingsFiltered = verifyDataAirtable(AIRTABLE_ASSET_LISTINGS, listingsRecords);
      const assetListingsProcessed = this.processAssetListings(assetListingsFiltered);
      /*
      * we save the network in the state to make sure fetchAssets() in brain.js
      * uses the correct airtable data when pulling the assets, from the correct network
      */
      updateFunction({
        assetListings: assetListingsProcessed,
        network,
        airtable: true,
      });
    } catch (err) {
      console.error(err);
      setTimeout(() => this.getAssets(network, updateFunction), 1000);
    }
  }

  render() {
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    );
  }
}

export default AirtableProvider;
