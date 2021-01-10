import { hot } from "react-hot-loader/root";
import { InternalLinks } from "constants/links";
import * as Brain from "../apis/brain";
import {
  SUPPORTED_NETWORKS,
  FALLBACK_NETWORK,
  CONTRACTS_PATH,
} from "constants/supportedNetworks";
import { DEFAULT_ASSET_INFO } from "constants/app";
import { SDK_EVENTS } from "constants/sdkEvents";
import { withMetamaskContext } from "components/MetamaskContext";
import { withAirtableContext } from "components/AirtableContext";
import IpfsDataManager from "utils/IpfsDataManager";
import { IPFS_URL } from "constants/ipfs";

const Contracts = require("@mybit-v2/contracts");

const { Provider, Consumer } = React.createContext({});

class AssetsProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadingUserInfo: false,
      loadingSdk: false,
      loadingIpfs: false,
      loadingAirtable: false,
      usingAirtable: true,
      usingIpfs: false,
      loadingAssets: true,
      assetListings: {},
      assetManagers: {},
      assetsWithPendingIpfs: {},
      getAssetListingFull: this.getAssetListingFull,
      forceUpdateListingWithOnChainData: this.forceUpdateListingWithOnChainData,
      updateAssetListingWithOffChainData: this
        .updateAssetListingWithOffChainData,
    };
  }

  // handle case where account, login, enabled or network variable change
  componentDidUpdate = async (prevProps) => {
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

    if (
      (newUserAddress && oldUsername !== newUserAddress) ||
      oldUserIsLoggedIn !== newIsUserLoggedIn ||
      oldEnabled !== newEnabled
    ) {
      this.setState({
        loadingUserInfo: true,
      });
      this.fetchAssetsFromSDK();
    } else if (newNetwork !== oldNetwork) {
      this.initialiseSDK();
      this.init();
    }
  };

  componentDidMount = () => {
    const { userHasMetamask } = this.props.metamaskContext;
    if (userHasMetamask) {
      this.initialiseSDK();
      this.init();
    } else {
      // just fetch from mainet even if there's no metamask
      this.state.usingAirtable &&
        this.getAssetsFromAirtable(SUPPORTED_NETWORKS[1]);
    }
  };

  /*
   * Initializes SDK calls and Airtable (if active)
   * Sync is async between onChain and offChain data
   */
  init = () => {
    const { usingAirtable } = this.state;
    const { metamaskContext } = this.props;
    const { network } = metamaskContext;
    if (SUPPORTED_NETWORKS.includes(network)) {
      this.setState({
        loadingAssets: true,
        loadingUserInfo: true,
        assetListings: {},
        assetManagers: {},
        assetsWithPendingIpfs: {},
      });
      this.fetchAssetsFromSDK();
      usingAirtable && this.getAssetsFromAirtable(network);
    }
  };

  fetchAssetsFromSDK = () => {
    const { metamaskContext } = this.props;
    const { network, user } = metamaskContext;
    this.setState({ loadingSdk: true });
    Brain.fetchAssets(user.address, network, ({ assetListings }) => {
      const assetManagers = this.getAssetManagers(assetListings);
      this.setState(
        { loadingSdk: false, loadingUserInfo: false, assetManagers },
        () => {
          this.setData(
            {
              assetListings,
              sdk: true,
              network,
            },
            () => this.startIpfs(network, assetListings)
          );
        }
      );
    });
  };

  initialiseSDK = async () => {
    const network = this.props.metamaskContext.network;
    const isASupportedNetwork = SUPPORTED_NETWORKS.includes(network);
    let contracts;
    let block;
    if (isASupportedNetwork) {
      contracts = CONTRACTS_PATH[network];
      block = Contracts.block[network];
    } else {
      contracts = CONTRACTS_PATH["default"];
      block = Contracts.block[FALLBACK_NETWORK];
    }
    Brain.initialiseSDK(contracts, block);
    const blockNumber = await window.web3js.eth.getBlockNumber();
    Brain.subscribe(() => {}, this.handlePlatformUpdates, blockNumber + 1);
  };

  startIpfs = (network, assetListings) => {
    const { usingIpfs, loadingIpfs } = this.state;
    if (usingIpfs) {
      this.getAssetsFromIpfs(network, assetListings);
    }
  };

  getAssetsFromIpfs = (network, assetListings) => {
    this.setState({ loadingIpfs: true, loadingAirtable: false });
    this.ipfs = new IpfsDataManager(
      network,
      assetListings,
      this.handleListingUpdateIpfs
    );
  };

  getAssetsFromAirtable = (network) => {
    const { getAssetsFromAirtable } = this.props;
    console.log("Fetching assets from airtable");
    this.setState({
      loadingAirtable: true,
      loadingIpfs: false,
    });
    getAssetsFromAirtable(network, this.handleLoadedAirtable);
  };

  handleListingUpdateIpfs = (assetId, asset) => {
    if (!Array.isArray(asset.files)) {
      asset.files = [];
    }
    asset["offChainData"] = true;
    this.updateListingProps(assetId, asset);
  };

  /*
   * Returns an array of assets, containing all the
   * information about said asset
   */
  getAssets = (assetListings) => {
    assetListings =
      assetListings !== undefined ? assetListings : this.state.assetListings;
    const assets = [];
    Object.entries(assetListings).forEach(([assetId, asset]) => {
      assets.push({
        ...this.getAssetListingFull(assetId, assetListings),
      });
    });
    assets.reverse();
    return assets;
  };

  getAssetListing = (assetId) => this.state.assetListings[assetId];

  getAssetListingFull = (assetId, assetListings) => {
    assetListings =
      assetListings !== undefined ? assetListings : this.state.assetListings;

    const { assetManagers } = this.state;
    return {
      ...assetListings[assetId],
      assetManagerData: assetManagers[assetListings[assetId].assetManager],
    };
  };

  getAssetManagers = (assetListings) => {
    const assetManagers = {};
    Object.values(assetListings).forEach((asset) => {
      const {
        assetManager,
        listingDate,
        assetIncome,
        remainingEscrow,
        funded,
      } = asset;

      if (!assetManagers[assetManager]) {
        assetManagers[assetManager] = {
          startDate: listingDate,
          totalAssets: 1,
          totalRevenue: assetIncome,
          collateralLocked: remainingEscrow,
          totalFundedAssets: funded ? 1 : 0,
        };
      } else {
        assetManagers[assetManager].totalAssets += 1;
        assetManagers[assetManager].totalRevenue += assetIncome;
        assetManagers[assetManager].collateralLocked += remainingEscrow;
        assetManagers[assetManager].totalFundedAssets += funded ? 1 : 0;
      }
    });

    return assetManagers;
  };

  forceUpdateListingWithOnChainData = async (assetId) => {
    const { assetListings } = this.state;
    const { user } = this.props.metamaskContext;
    const assetListing = assetListings[assetId];
    if (assetListing) {
      const newAssetListing = await Brain.fetchAsset(
        assetListing,
        user.address
      );
      this.updateListingProps(assetId, newAssetListing);
    }
  };

  handlePlatformUpdates = (event) => {
    const onContribution = async (data) => {
      const { assetListings } = this.state;
      const { user } = this.props.metamaskContext;
      const { token: assetId } = event.returnValues;
      this.forceUpdateListingWithOnChainData(assetId);
    };

    const onAssetListing = async (data) => {
      const {
        assetListings,
        usingAirtable,
        usingIpfs,
        assetManagers,
      } = this.state;
      const { fetchNewAssetListing } = this.props;
      const { user, network } = this.props.metamaskContext;
      const { asset: assetId, manager: assetManager } = event.returnValues;
      if (usingAirtable) {
        fetchNewAssetListing(network, this.setData, assetId);
      }
      const { blockNumber } = event;
      const asset = await Brain.fetchAsset(
        {
          assetId,
          assetManager,
          blockNumber,
        },
        user.address
      );
      const { assetsWithPendingIpfs } = this.state;
      if (assetsWithPendingIpfs[assetId]) {
        asset.ipfs = assetsWithPendingIpfs[assetId];
        delete assetsWithPendingIpfs[assetId];
        this.setState({
          assetsWithPendingIpfs,
        });
        if (usingIpfs) {
          this.ipfs.fetchNewResource(
            assetId,
            asset,
            this.handleListingUpdateIpfs
          );
        }
      }
      asset["assetManagerData"] = assetManagers[assetManager];
      this.updateListingProps(assetId, asset);
    };

    const onAssetListingIPFS = async (data) => {
      this.setState((prevState) => {
        const { assetListings, assetsWithPendingIpfs } = prevState;
        const { user } = this.props.metamaskContext;
        const { asset: assetId, uri: ipfs } = event.returnValues;
        const { blockNumber } = event;
        assetsWithPendingIpfs[assetId] = ipfs;
        this.setState({
          assetsWithPendingIpfs,
        });
      });
    };

    const handlers = {
      [SDK_EVENTS.CONTRIBUTION]: onContribution,
      [SDK_EVENTS.ASSET_LISTING]: onAssetListing,
      [SDK_EVENTS.ASSET_LISTING_IPFS]: onAssetListingIPFS,
    };
    const eventType = event.returnValues ? event.returnValues.message : "";
    const handler = handlers[eventType];
    if (handler) {
      handler(event);
    }
  };

  updateAssetListingWithOffChainData = async (
    assetId,
    files,
    risks,
    financials,
    about,
    fees
  ) => {
    const { assetListings } = this.state;
    const { metamaskContext } = this.props;
    const { network } = metamaskContext;
    const asset = assetListings[assetId];
    await Brain.updateAirTableWithNewOffChainData(
      {
        assetId,
        files: files.string,
        risks,
        financials,
        about,
        fees,
      },
      network
    );
    this.updateListingProps(assetId, {
      ...asset,
      files: files.array,
      risks,
      financials,
      about,
      fees,
    });
  };

  updateListingProps = (assetId, props) => {
    this.setState((prevState) => {
      const { assetListings, assets } = prevState;
      const defaultAssetInfo = {
        financials: props.financials || DEFAULT_ASSET_INFO.Financials,
        about: props.about || DEFAULT_ASSET_INFO.About,
        risks: props.risks || DEFAULT_ASSET_INFO.Risks,
      };
      const assetListingsNew = {
        ...assetListings,
        [assetId]: {
          ...assetListings[assetId],
          ...props,
          ...defaultAssetInfo,
        },
      };
      const assetManagers = this.getAssetManagers(assetListingsNew);
      const assetsArray = assets.slice();
      const assetIndex = assetsArray.findIndex(
        (asset) => asset.assetId === assetId
      );
      if (assetIndex === -1) {
        assetsArray.splice(assetIndex, 0, props);
      } else {
        assetsArray[assetIndex] = {
          ...assetsArray[assetIndex],
          ...props,
          ...defaultAssetInfo,
        };
      }
      return {
        assetListings: assetListingsNew,
        assets: assetsArray,
        assetManagers,
      };
    });
  };

  handleAssetFavorited = (assetId, asset) => {
    const searchQuery = `mybit_watchlist_${assetId}`;
    const alreadyFavorite = window.localStorage.getItem(searchQuery) === "true";
    if (alreadyFavorite) {
      localStorage.removeItem(searchQuery);
    } else {
      localStorage.setItem(searchQuery, true);
    }
    this.updateListingProps(assetId, {
      ...asset,
      watchListed: !alreadyFavorite,
    });
  };

  getLoadingState = (loadingAirtable, loadingIpfs, loadingSdk) => {
    if (!loadingSdk && !loadingAirtable && !loadingIpfs) {
      console.info("Done loading assets");
      return false;
    }
    console.info("Not done loading assets");
    return true;
  };

  handleLoadedAirtable = (data) => {
    const { usingAirtable, loadingAirtable } = this.state;
    if (usingAirtable && loadingAirtable) {
      this.setState({ loadingAirtable: false }, () => this.setData(data));
    }
  };

  mergeObjects = (a, b, propertyToAdd, injectProperty) => {
    const entriesA = Object.entries(a);
    if (entriesA.length === 0) {
      return b;
    }
    entriesA.map(([id, value]) => {
      const entry = b[id];
      a[id][propertyToAdd] = true;
      if (entry) {
        a[id] = {
          ...entry,
          ...a[id],
        };
      }
      if (injectProperty) {
        a[id]["handleAssetFavorited"] = this.handleAssetFavorited.bind(
          this,
          id,
          a[id]
        );
      }
    });
    return a;
  };

  /*
   * Only setup this way right now because we first load data from Airtable,
   * which essentially means two total calls, one from the SDK and one from Airtable,
   * both resolve the whole data up until then, so we can merge the data like so.
   */
  setData = (
    { assetListingsLoading = {}, assetListings, network, ipfs, airtable, sdk },
    cb
  ) => {
    const { usingIpfs, usingAirtable } = this.state;
    const { metamaskContext } = this.props;
    const { network: currentNetwork } = metamaskContext;
    if (
      ((usingIpfs && ipfs) || (usingAirtable && airtable) || sdk) &&
      (network === "mainnet" || network === "ropsten")
    ) {
      this.setState(
        (prevState) => {
          const {
            assetListings: currentAssetListings,
            loadingAirtable,
            loadingIpfs,
            loadingSdk,
          } = prevState;
          const assetListingsMerged = this.mergeObjects(
            assetListings,
            currentAssetListings,
            getNameOfPropertyFromData(sdk),
            true
          );
          const assetsArray = this.getAssets(assetListingsMerged);

          return {
            assetListingsLoading,
            assetListings: assetListingsMerged,
            assets: assetsArray, // for backwards compatability
            loadingAssets: this.getLoadingState(
              loadingAirtable,
              loadingIpfs,
              loadingSdk
            ),
          };
        },
        () => {
          console.info("New Assets State: ", this.state);
          cb && cb();
        }
      );
    }
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

// Required so we can trigger getServerSideProps in our exported pages
export const withAssetsContextPageWrapper = (Component) =>
  class AssetContextPageWrapper extends React.Component {
    render() {
      return (
        <Consumer>
          {(state) => <Component {...this.props} assetsContext={state} />}
        </Consumer>
      );
    }
  };

export const getStaticProps = () => ({
  props: {},
});

export const withAssetsContext = (Component) =>
  function WrapperComponent(props) {
    return (
      <Consumer>
        {(state) => <Component {...props} assetsContext={state} />}
      </Consumer>
    );
  };

const getNameOfPropertyFromData = (sdk) => (sdk ? "chainData" : "offChainData");

export default hot(withAirtableContext(withMetamaskContext(AssetsProvider)));
