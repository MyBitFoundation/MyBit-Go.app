import Pagination from 'antd/lib/pagination';
import {
  Switch,
  Row,
  Icon,
} from 'antd';
import { withAirtableContext } from 'components/Airtable'
import { withBlockchainContext } from 'components/Blockchain'
import { withNotificationsContext } from 'components/Notifications'
import StyledNoResults from 'components/styledNoResults';
import CategoryFilter from 'components/CategoryFilter';
import Loading from 'components/Loading';
import Asset from 'ui/Asset/';

import StyledExplore from './styledExplore';
import StyledFilters from './styledFilters';
import StyledFiltersSwitch from './styledFiltersSwitch';
import StyledPagination from './styledPagination';

import {
  FundingStages,
  Categories,
  BREAKPOINTS,
  SORT_BY_ASSETS,
} from 'constants';

import {
  getPrettyCategoryName,
} from 'utils/helpers';

const assetsPerPage = 12;

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentPage: 0,
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
       isReadOnlyMode,
       handleAssetFavorited,
    } = this.props.blockchainContext;

    const {
      categoriesAirTable,
    } = this.props.airtableContext;

    if (loading.assets) {
      return <Loading message="Loading assets" />;
    }

    const { currentPage, fundingActive } = this.state;
    let assetsFiltered = assets.slice();
    let {
      selectedFilters,
      sortByFilterSelected,
    } = this.state;

    // filter by categories and whether active
    assetsFiltered = assetsFiltered.filter((asset) => {
      const assetCategory = asset.category;
      if (((fundingActive && asset.fundingStage === FundingStages.IN_PROGRESS && !asset.pastDate) || (!fundingActive && (asset.funded || asset.pastDate))) && selectedFilters.includes(assetCategory)) {
        return true;
      }
      return false;
    });

    if(sortByFilterSelected){
      const compareTo = SORT_BY_ASSETS.filter(sort => sort.name === sortByFilterSelected)[0].compare;
      assetsFiltered = assetsFiltered.sort(compareTo);
    }

    const assetsFilteredTotal = assetsFiltered.length;

    // slice results for pagination
    const startIndex = currentPage * assetsPerPage;
    const endIndex = (currentPage + 1) * assetsPerPage;
    assetsFiltered = assetsFiltered.slice(startIndex, endIndex);
    const readOnlyMode = isReadOnlyMode();

    return(
      <StyledExplore>
        <StyledFilters
          breakpoints={BREAKPOINTS}
        >
          <CategoryFilter
            allFilters={Categories}
            selectedFilters={this.state.selectedFilters}
            setFilterState={this.setFilterState}
            breakpoints={BREAKPOINTS}
            subFilters={SORT_BY_ASSETS}
            sortByFilterSelected={sortByFilterSelected}
            handleCheckedSortBy={this.handleCheckedSortBy}
          />
        </StyledFilters>
        <StyledFiltersSwitch
          breakpoints={BREAKPOINTS}
        >
          <span>Funding Active</span>
          <Switch
            onChange={isFundingActive => this.setState({ fundingActive: isFundingActive, currentPage: 0 })}
            checked={fundingActive}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
          />
        </StyledFiltersSwitch>
        <Row>
          {assetsFiltered.map(asset => (
            <Asset
              type="default"
              {...asset}
              key={asset.assetId}
              handleAssetFavorited={handleAssetFavorited}
            />
          ))}
        </Row>
        {assetsFiltered.length > 0 && (
          <StyledPagination>
            <Pagination
              onChange={newPage => this.setState({ currentPage: newPage - 1 })}
              total={assetsFilteredTotal}
              current={currentPage + 1}
              pageSize={assetsPerPage}
              defaultCurrent={1}
            />
          </StyledPagination>
        )}
        {assetsFiltered.length === 0 && (
          <StyledNoResults>
            No Assets to display
          </StyledNoResults>
        )}
      </StyledExplore>
    )
  }
}

export default withAirtableContext(withBlockchainContext(Explore));
