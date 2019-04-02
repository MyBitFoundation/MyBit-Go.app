import { compose } from 'recompose'
import {
  Switch,
  Icon,
} from 'antd';
import { withAirtableContext } from 'components/AirtableContext'
import { withBlockchainContext } from 'components/BlockchainContext'
import CategoryFilter from 'components/CategoryFilter';
import Loading from 'components/Loading';
import AssetDisplayer from 'components/AssetDisplayer';
import ExploreFilters from './exploreFilters';
import ExploreFiltersSwitch from './exploreFiltersSwitch';
import { LocalStorageKeys } from 'constants/localStorageKeys';
import {
  FundingStages,
} from 'constants/fundingStages';
import { Categories } from 'constants/categories';
import { SORT_BY_ASSETS } from 'constants/sortByAssets';
import {
  getPrettyCategoryName,
  getValueFromLocalStorage,
  setValueLocalStorage,
} from 'utils/helpers';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      fundingActive: getValueFromLocalStorage(LocalStorageKeys.EXPLORE_PAGE_FUNDING_ACTIVE, true) === 'true',
      sortByFilterSelected: getValueFromLocalStorage(LocalStorageKeys.EXPLORE_PAGE_SORT_BY),
      ...this.buildState(),
    };
  }

  buildState = () => {
    const selectedFilters = getValueFromLocalStorage(LocalStorageKeys.EXPLORE_PAGE_SELECTED_FILTERS, Categories, true);
    return {
      selectedFilters,
    }
  }

  handleCheckedSortBy = (sortByValue, isChecked) => {
    const value = isChecked && sortByValue;
    this.setState({
      sortByFilterSelected: value,
    });
    if(isChecked) {
      setValueLocalStorage(LocalStorageKeys.EXPLORE_PAGE_SORT_BY, value)
    } else {
      localStorage.removeItem(LocalStorageKeys.EXPLORE_PAGE_SORT_BY);
    }
  }

  setFilterState = (filterName, newState) => {
    let { selectedFilters } = this.state;
    if (!newState) {
      selectedFilters = selectedFilters.filter(flter => flter !== filterName);
    } else {
      selectedFilters = [...selectedFilters, filterName];
    }
    this.setState({
      selectedFilters: selectedFilters,
    });
    setValueLocalStorage(LocalStorageKeys.EXPLORE_PAGE_SELECTED_FILTERS, selectedFilters, true)
  }

  render = () => {
    const {
       loading,
       assets,
       handleAssetFavorited,
    } = this.props.blockchainContext;

    const {
      categoriesAirTable,
    } = this.props.airtableContext;

    if (loading.assets) {
      return <Loading message="Loading assets" />;
    }

    const { fundingActive } = this.state;
    let assetsFiltered = assets.slice();
    let {
      selectedFilters,
      sortByFilterSelected,
    } = this.state;

    // filter by categories and whether active
    assetsFiltered = assetsFiltered.filter((asset) => {
      const assetCategory = asset.defaultData.category;
      if (((fundingActive && asset.fundingStage === FundingStages.IN_PROGRESS && !asset.pastDate) || (!fundingActive && (asset.funded || asset.pastDate))) && selectedFilters.includes(assetCategory)) {
        return true;
      }
      return false;
    });

    //handle sorting
    if(sortByFilterSelected){
      const compareTo = SORT_BY_ASSETS.filter(sort => sort.name === sortByFilterSelected)[0].compare;
      assetsFiltered = assetsFiltered.sort(compareTo);
    }

    return(
      <React.Fragment>
        <ExploreFilters>
          <CategoryFilter
            allFilters={Categories}
            selectedFilters={this.state.selectedFilters}
            setFilterState={this.setFilterState}
            subFilters={SORT_BY_ASSETS}
            sortByFilterSelected={sortByFilterSelected}
            handleCheckedSortBy={this.handleCheckedSortBy}
          />
        </ExploreFilters>
        <ExploreFiltersSwitch>
          <span>Funding Active</span>
          <Switch
            onChange={isFundingActive => {
              this.setState({ fundingActive: isFundingActive})
              setValueLocalStorage(LocalStorageKeys.EXPLORE_PAGE_FUNDING_ACTIVE, isFundingActive)
            }}
            checked={fundingActive}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
          />
        </ExploreFiltersSwitch>
        <AssetDisplayer
          assets={assetsFiltered}
          type="default"
          handleAssetFavorited={handleAssetFavorited}
        />
      </React.Fragment>
    )
  }
}

const enhance = compose(
  withAirtableContext,
  withBlockchainContext,
);

export default enhance(Explore);

