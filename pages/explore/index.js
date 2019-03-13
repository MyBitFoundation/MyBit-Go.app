import { compose } from 'recompose'
import {
  Switch,
  Icon,
} from 'antd';
import { withAirtableContext } from 'components/Airtable'
import { withBlockchainContext } from 'components/Blockchain'
import CategoryFilter from 'components/CategoryFilter';
import Loading from 'components/Loading';
import AssetDisplayer from 'components/AssetDisplayer';
import StyledFilters from './styledFilters';
import StyledFiltersSwitch from './styledFiltersSwitch';

import {
  FundingStages,
  Categories,
  SORT_BY_ASSETS,
} from 'constants';

import {
  getPrettyCategoryName,
} from 'utils/helpers';

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      fundingActive: true,
      ...this.buildState(),
    };
  }

  buildState = () => {
    const selectedFilters = [];
    Categories.map(category => {
      selectedFilters.push(category);
    });

    return {
      selectedFilters,
    }
  }

  handleCheckedSortBy = (sortByValue, isChecked) => {
    this.setState({
      sortByFilterSelected: isChecked && sortByValue,
    });
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
        <StyledFilters>
          <CategoryFilter
            allFilters={Categories}
            selectedFilters={this.state.selectedFilters}
            setFilterState={this.setFilterState}
            subFilters={SORT_BY_ASSETS}
            sortByFilterSelected={sortByFilterSelected}
            handleCheckedSortBy={this.handleCheckedSortBy}
          />
        </StyledFilters>
        <StyledFiltersSwitch>
          <span>Funding Active</span>
          <Switch
            onChange={isFundingActive => this.setState({ fundingActive: isFundingActive})}
            checked={fundingActive}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
          />
        </StyledFiltersSwitch>
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

