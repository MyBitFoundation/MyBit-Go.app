import { InternalLinks } from 'constants/links';
import {
  FALLBACK_NETWORK,
} from 'constants/supportedNetworks';
import * as Brain from '../apis/brain';
import {
  SUPPORTED_NETWORKS,
  FALLBACK_NETWORK,
  CONTRACTS_PATH,
} from 'constants/supportedNetworks';
import { withMetamaskContext } from 'components/MetamaskContext';

const { Provider, Consumer } = React.createContext({});

export const withAssetsContext = (Component) => {
  return function WrapperComponent(props) {
    return (
      <Consumer>
          {state => <Component {...props} assetsContext={state} />}
      </Consumer>
    );
  };
}

class AssetsProvider extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      loadingAssesFromContracts: false,
      assetsFromContracts: {},
      loadingIpfs: false,
      loadingAirtable: true,
    }
  }

  componentDidMount = () => {
    const { metamaskContext } = this.props;
    const { network } = metamaskContext;
    this.init();
  }

  init () => {
    const {
      loadingIpfs,
      loadingAirtable,
    } = this.state;
    const { metamaskContext } = this.props;
    const { network, user } = metamaskContext;

    Brain.fetchAssets(user.address, (assetListings, operators, assetManagers) => {
      const assetManagers = this.getAssetManagers(assetListings);
      console.log(assetListings, operators, assetManagers)
      this.setState({
        loadingAssesFromContracts: false,
        assetsFromContracts,
      }, () => this.setData({
        assetManagers
        assetListings,
        operators,
      }))
    });

    if(SUPPORTED_NETWORKS.includes(network)){
      this.setState({
        loading: true,
      })

      loadingIpfs && this.getAssetsFromIpfs(network, this.setData)
      loadingAirtable && this.getAssetsFromAirtable(network, this.setData)
    }
    this.setState({
      loading: false,
    })
  }

  getAssetManagers = assetListings => {
    const assetManagers = {};
    assetListings.forEach(asset => {
      const {
        assetManager,
        listingDate,
        assetIncome,
        remainingEscrow,
      } = asset;

      if(!assetManagers[assetManager]){
        const startDate = dayjs(listingDate);
        assetManagers[assetManager] = {
          startDate,
          totalAssets: 1,
          totalRevenue: assetIncome,
          collateralLocked: remainingEscrow,
        }
      } else {
        assetManagers[assetManager].totalAssets += 1;
        assetManagers[assetManager].totalRevenue += assetIncome;
        assetManagers[assetManager].collateralLocked += remainingEscrow;
      }
    })
  }

  setData = ({
    assetManagersLoading,
    assetManagers,
    assetListingsLoading,
    assetListings,
    operatorsLoading,
    operators,
    network,
    ipfs,
    airtable,
  }) => {
    const { loadingIpfs, loadingAirtable, loadedAssesFromContracts, assetsFromContracts, network: stateNetwork} = this.state;

    if(((loadingIpfs && ipfs) || (loadingAirtable && airtable)) && (network === stateNetwork)){
      this.setState({
        assetManagersLoading,
        assetListingsLoading,
        operatorsLoading,
        assetManagers,
        assetListings: {...assetsFromContracts, ...assetListings)},
        operators,
        loading: false,
      })
    }
  }

  getAssetsFromIpfs = () => {
    this.setState({loadingIpfs: true, loadingAirtable: false})
    this.getAssetsFromIpfs()
  }

  getAssetsFromAirtable = () => {
    this.setState({loadingAirtable: true, loadingIpfs: false})
    this.getAssetsFromAirtable()
  }

  render(){
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
};

export default withMetamaskContext(AssetsProvider);
