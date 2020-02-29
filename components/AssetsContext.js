import { hot } from 'react-hot-loader/root'
import * as Brain from '../apis/brain';
import {
  SUPPORTED_NETWORKS,
  FALLBACK_NETWORK,
  CONTRACTS_PATH,
} from 'constants/supportedNetworks';
 import { DEFAULT_ASSET_INFO } from 'constants/app';
import { SDK_EVENTS } from 'constants/sdkEvents';
import { withMetamaskContext } from 'components/MetamaskContext';
import IpfsDataManager from 'utils/IpfsDataManager';
import { IPFS_URL } from 'constants/ipfs';
const Contracts = require('@mybit/contracts');
const { Provider, Consumer } = React.createContext({});

class AssetsProvider extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      loadingUserInfo: false,
      loadingSdk: false,
      loadingIpfs: false,
      usingIpfs: false,
      loadingAssets: true,
      assetListings: {},
      operators: {},
      assetModels: {},
      assetManagers: {},
      assetsWithPendingIpfs: {},
      getAssetListingFull: this.getAssetListingFull,
      forceUpdateListingWithOnChainData: this.forceUpdateListingWithOnChainData,
      updateAssetListingWithOffChainData: this.updateAssetListingWithOffChainData,
    }
  }

  // handle case where account, login, enabled or network variable change
  componentDidUpdate = async prevProps => {
    const { metamaskContext: oldProps } = prevProps;
    const { metamaskContext: newProps } = this.props;
    const oldEnabled = oldProps.privacyModeEnabled;
    const oldUsername = oldProps.user.address;
    const oldUserIsLoggedIn = oldProps.userIsLoggedIn;
    const oldNetwork = oldProps.network;
    const newUserAddress = newProps.user.address;
    const newIsUserLoggedIn = newProps.userIsLoggedIn;
    const newEnabled = newProps.privacyModeEnabled;
    const newNetwork = newProps.network;

    if((newUserAddress && (oldUsername !== newUserAddress)) || (oldUserIsLoggedIn !== newIsUserLoggedIn) || (oldEnabled !== newEnabled)){
      this.setState({
        loadingUserInfo: true,
      })
      this.fetchAssetsFromSDK()
    } else if(newNetwork !== oldNetwork){
      this.initialiseSDK();
      this.init();
    }
  }

  componentDidMount = () => {
    const { userHasMetamask } = this.props.metamaskContext;
    if(userHasMetamask){
      this.initialiseSDK();
      this.init();
    } else {
      this.setState({loadingAssets: false})
    }
  }

  /*
  * Initializes SDK
  * Sync is async between onChain and offChain data
  */
  init = () => {
    const { metamaskContext } = this.props;
    const { network } = metamaskContext;
    if(SUPPORTED_NETWORKS.includes(network)){
      this.setState({
        loadingAssets: true,
        loadingUserInfo: true,
        assetListings: {},
        operators: {},
        assetModels: {},
        assetManagers: {},
        assetsWithPendingIpfs: {},
      })
      this.fetchAssetsFromSDK();
    }
  }

  fetchAssetsFromSDK = () => {
    const { metamaskContext } = this.props;
    const { network, user } = metamaskContext;
    this.setState({ loadingSdk: true });
    Brain.fetchAssets(user.address, network, ({ assetListings, operators, assetModels }) => {
      const assetManagers = this.getAssetManagers(assetListings);
      this.setState({ loadingSdk: false , loadingUserInfo: false, assetManagers}, () => {
        this.setData({
          assetListings,
          operators,
          assetModels,
          sdk: true,
          network,
        }, () => this.startIpfs(network, assetListings, assetModels, operators))
      })
    });
  }

  initialiseSDK = async () => {
    const network = this.props.metamaskContext.network;
    const isASupportedNetwork = SUPPORTED_NETWORKS.includes(network);
    let contracts, block;
    if(isASupportedNetwork){
      contracts = CONTRACTS_PATH[network];
      block = Contracts.block[network];
    } else {
      contracts = CONTRACTS_PATH['default'];
      block = Contracts.block[FALLBACK_NETWORK];
    }
    Brain.initialiseSDK(contracts, block);
    const blockNumber = await window.web3js.eth.getBlockNumber();
    Brain.subscribe(() => {}, this.handlePlatformUpdates, blockNumber + 1)
  }

  startIpfs = (network, assetListings, assetModels, operators) => {
    const { usingIpfs, loadingIpfs } = this.state;
    if(usingIpfs){
      this.getAssetsFromIpfs(network, assetListings, assetModels, operators);
    }
  }

  getAssetsFromIpfs = (network, assetListings, assetModels, operators) => {
    this.setState({loadingIpfs: true})
    this.ipfs = new IpfsDataManager(
      network,
      assetListings,
      assetModels,
      operators,
      this.handleListingUpdateIpfs,
      this.handleModelUpdateIpfs,
    );
  }

  handleListingUpdateIpfs = (assetId, asset) => {
    if(!Array.isArray(asset.files)){
      asset.files = [];
    }
    asset['offChainData'] = true;
    this.updateListingProps(assetId, asset);
  }

  handleModelUpdateIpfs = (modelId, model) => {
    model['fundingGoal'] = model.goal;
    model['offChainData'] = true;
    delete model.goal;
    this.updateModelProps(modelId, model);
  }

  /*
  * Returns an array of assets, containing all the
  * information about said asset
  */
  getAssets = (assetListings, assetModels, operators, ) => {
    operators = operators !== undefined ? operators : this.state.operators;
    assetListings = assetListings !== undefined ? assetListings : this.state.assetListings;
    assetModels = assetModels !== undefined ? assetModels : this.state.assetModels;
    const assets = [];
    Object.entries(assetListings).forEach(([assetId, asset]) => {
      assets.push({
        ...this.getAssetListingFull(assetId, assetListings, assetModels, operators),
      })
    })
    assets.reverse();
    return assets;
  }

  getOperator = address => this.state.operators[address]

  getAssetModel = modelId => this.state.assetModels[modelId]

  getAssetListing = assetId => this.state.assetListings[assetId]

  getAssetListingFull = (assetId, assetListings, assetModels, operators) => {
    operators = operators !== undefined ? operators : this.state.operators;
    assetListings = assetListings !== undefined ? assetListings : this.state.assetListings;
    assetModels = assetModels !== undefined ? assetModels : this.state.assetModels;

    const { assetManagers } = this.state;
    const modelId = assetListings[assetId] ? assetListings[assetId].modelId : undefined;
    const operatorAddress = (modelId && assetModels[modelId]) ? assetModels[modelId].operator : undefined;
    return {
      operator: {...operators[operatorAddress]},
      model: {...assetModels[modelId]},
      ...assetListings[assetId],
      assetManagerData: assetManagers[assetListings[assetId].assetManager],
    }
  }

  getAssetManagers = assetListings => {
    const assetManagers = {};
    Object.values(assetListings).forEach(asset => {
      const {
        assetManager,
        listingDate,
        assetIncome,
        remainingEscrow,
        funded,
      } = asset;

      if(!assetManagers[assetManager]){
        assetManagers[assetManager] = {
          startDate: listingDate,
          totalAssets: 1,
          totalRevenue: assetIncome,
          collateralLocked: remainingEscrow,
          totalFundedAssets: funded ? 1 : 0,
        }
      } else {
        assetManagers[assetManager].totalAssets += 1;
        assetManagers[assetManager].totalRevenue += assetIncome;
        assetManagers[assetManager].collateralLocked += remainingEscrow;
        assetManagers[assetManager].totalFundedAssets += funded ? 1 : 0;
      }
    })

    return assetManagers;
  }

  forceUpdateListingWithOnChainData = async assetId => {
    const { assetListings } = this.state;
    const { user } = this.props.metamaskContext;
    const assetListing = assetListings[assetId];
    if(assetListing){
      const newAssetListing = await Brain.fetchAsset(assetListing, user.address);
      this.updateListingProps(assetId, newAssetListing);
    }
  }

  handlePlatformUpdates = event => {
    const onContribution = async data => {
      const { assetListings, } = this.state;
      const { user } = this.props.metamaskContext;
      const { token: assetId } = event.returnValues;
      this.forceUpdateListingWithOnChainData(assetId);
    }

    const onAssetListing = async data => {
      const { assetListings, usingIpfs, assetModels, assetManagers} = this.state;
      const { fetchNewAssetListing } = this.props;
      const { user, network } = this.props.metamaskContext;
      const { asset: assetId, manager: assetManager } = event.returnValues;
      const { blockNumber } = event;
      let asset = await Brain.fetchAsset({
        assetId,
        assetManager,
        blockNumber,
      }, user.address);
      const { assetsWithPendingIpfs } = this.state;
      if(assetsWithPendingIpfs[assetId]){
        asset.ipfs = assetsWithPendingIpfs[assetId];
        delete assetsWithPendingIpfs[assetId];
        this.setState({
          assetsWithPendingIpfs,
        })
        if(usingIpfs){
          this.ipfs.fetchNewResource(assetId, asset, this.handleListingUpdateIpfs);
        }
      }
      asset['model'] = assetModels[asset.modelId];
      asset['assetManagerData'] = assetManagers[assetManager];
      this.updateListingProps(assetId, asset);
    }

    const onAssetListingIPFS = async data => {
      this.setState(prevState => {
        const { assetListings, assetsWithPendingIpfs } = prevState;
        const { user } = this.props.metamaskContext;
        const { asset: assetId, uri: ipfs } = event.returnValues;
        const { blockNumber } = event;
        assetsWithPendingIpfs[assetId] = ipfs;
        this.setState({
          assetsWithPendingIpfs,
        })
      })
    }

    const handlers = {
      [SDK_EVENTS.CONTRIBUTION]: onContribution,
      [SDK_EVENTS.ASSET_LISTING]: onAssetListing,
      [SDK_EVENTS.ASSET_LISTING_IPFS]: onAssetListingIPFS,
    };
    const eventType = event.returnValues ? event.returnValues.message : '';
    const handler = handlers[eventType];
    if(handler){
      handler(event);
    }
  }

  updateAssetListingWithOffChainData = async (assetId, files, risks, financials, about, fees) => {
    const { assetListings } = this.state;
    const { metamaskContext } = this.props;
    const { network } = metamaskContext;
    const asset = assetListings[assetId];
    this.updateListingProps(assetId, {...asset, files: files.array, risks, financials, about, fees})
  }

  updateModelProps = (modelId, props) => {
    this.setState(prevState => {
      let { assetModels, assets, } = prevState;
      const imageIpfs = props.images && props.images.length > 0 && props.images[0];
      const imageSrc = imageIpfs ? `${IPFS_URL}${imageIpfs}` : '';
      const assetModelsNew = {
        ...assetModels,
        [modelId]: {
          ...assetModels[modelId],
          ...props,
          imageSrc,
        }
      }
      const assetsArray = assets.slice();
      for(let i=0;i<assetsArray.length;i++){
        let asset = assetsArray[i];
        if(asset.modelId === modelId){
          const { assetId } = asset;
          assetsArray[i] = {
            ...asset,
            model: assetModelsNew[modelId],
          };
        }
      }
      return {
        assetModels: assetModelsNew,
        assets: assetsArray,
      }
    })
  }

  updateListingProps = (assetId, props) => {
    this.setState(prevState => {
      let { assetListings, assets, } = prevState;
      const defaultAssetInfo = {
        financials: props.financials || DEFAULT_ASSET_INFO.Financials,
        about: props.about || DEFAULT_ASSET_INFO.About,
        risks: props.risks || DEFAULT_ASSET_INFO.Risks,
      }
      const assetListingsNew = {
        ...assetListings,
        [assetId]: {
          ...assetListings[assetId],
          ...props,
          ...defaultAssetInfo,
        }
      }
      const assetManagers = this.getAssetManagers(assetListingsNew);
      const assetsArray = assets.slice();
      const assetIndex = assetsArray.findIndex(asset => asset.assetId === assetId)
      if(assetIndex === -1){
        assetsArray.splice(assetIndex, 0, props)
      } else {
        assetsArray[assetIndex] = {
          ...assetsArray[assetIndex],
          ...props,
          ...defaultAssetInfo,
        }
      }
      return {
        assetListings: assetListingsNew,
        assets: assetsArray,
        assetManagers,
      }
    })
  }

  handleAssetFavorited = assetId => {
    const searchQuery = `mybit_watchlist_${assetId}`;
    const alreadyFavorite = window.localStorage.getItem(searchQuery) === 'true';
    if (alreadyFavorite) {
      localStorage.removeItem(searchQuery);
    } else {
      localStorage.setItem(searchQuery, true);
    }
    this.updateListingProps(assetId, {
      watchListed: !alreadyFavorite,
    })
  }

  getLoadingState = (loadingIpfs, loadingSdk) => {
    if(!loadingSdk && !loadingIpfs){
      console.log("Done loading assets")
      return false;
    } else {
      console.log("Not done loading assets")
      return true;
    }
  }

  mergeObjects = (a, b, propertyToAdd, injectProperty) => {
    const entriesA = Object.entries(a);
    if(entriesA.length === 0){
      return b;
    }
    entriesA.map(([id, value]) => {
      const entry = b[id];
      a[id][propertyToAdd] = true;
      if(entry){
        a[id] = {
          ...entry,
          ...a[id],
        }
      }
      if(injectProperty){
        a[id]['handleAssetFavorited'] = this.handleAssetFavorited.bind(this, id);
      }
    })
    return a;
  }

  setData = ({
    assetModels={},
    assetModelsLoading={},
    assetListingsLoading={},
    assetListings,
    operatorsLoading={},
    operators={},
    network,
    ipfs,
    sdk,
  }, cb) => {
    const {
      usingIpfs,
    } = this.state;
    const { metamaskContext } = this.props;
    const { network: currentNetwork } = metamaskContext;
    if(((usingIpfs && ipfs) || sdk) && (network === currentNetwork)){
      this.setState(prevState => {
        const {
          assetListings: currentAssetListings,
          operators: currentOperators,
          assetModels: currentAssetModels,
          loadingIpfs,
          loadingSdk,
        } = prevState;
        const assetListingsMerged = this.mergeObjects(assetListings, currentAssetListings, getNameOfPropertyFromData(sdk), true);
        const operatorsMerged = this.mergeObjects(operators, currentOperators, getNameOfPropertyFromData(sdk), true);
        const assetModelsMerged = this.mergeObjects(assetModels, currentAssetModels, getNameOfPropertyFromData(sdk), true);
        const assetsArray = this.getAssets(assetListingsMerged, assetModelsMerged, operatorsMerged);
        return {
          assetModelsLoading,
          assetListingsLoading,
          operatorsLoading,
          assetListings: assetListingsMerged,
          operators: operatorsMerged,
          assetModels: assetModelsMerged,
          assets: assetsArray, // for backwards compatability
          loadingAssets: this.getLoadingState(loadingIpfs, loadingSdk),
        }
      }, () => {
        console.log("New Assets State: ", this.state)
        cb && cb()
      })
    }
  }

  render(){
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
};

// Required so we can trigger getInitialProps in our exported pages
export const withAssetsContextPageWrapper = (Component) => {
  return class AssetContextPageWrapper extends React.Component{
    static getInitialProps(ctx) {
      if(Component.getInitialProps)
        return Component.getInitialProps(ctx);
      else return {};
    }
    render(){
      return (
        <Consumer>
          {state => <Component {...this.props} assetsContext={state} />}
        </Consumer>
      )
    }
  }
}

export const withAssetsContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
          {state => <Component {...props} assetsContext={state} />}
      </Consumer>
    );
  };
}

const getNameOfPropertyFromData = sdk => {
  return sdk ? 'chainData' : 'offChainData';
}

export default hot(withMetamaskContext(AssetsProvider));
