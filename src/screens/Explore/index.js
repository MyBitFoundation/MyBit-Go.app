/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import 'antd/lib/row/style';
import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style';
import Pagination from 'antd/lib/pagination';
import 'antd/lib/pagination/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import StyledExplore from './styledExplore';
import StyledFilters from './styledFilters';
import StyledFiltersCategories from './styledFiltersCategories';
import StyledFiltersSwitch from './styledFiltersSwitch';
import StyledPagination from './styledPagination';
import StyledNoResults from './styledNoResults';
import { getPrettyCategoryName } from '../../util/helpers';
import LoadingPage from '../../components/LoadingPage';
import CategoryFilter from '../../components/CategoryFilter';
import Asset from '../../components/Asset';
import {
  FundingStages,
  Categories,
} from '../../constants';
import { WithAirtableContext } from '../../components/Airtable';
import { WithBlockchainContext } from '../../components/Blockchain';

const assetsPerPage = 12;

class Explore extends Component {
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
    const filters = {};
    const selectedFilters = [];
    Categories.map(category => {
      filters[category] = true;
      selectedFilters.push(category);
    });

    return {
      filters,
      selectedFilters,
    }
  }

  render() {
    const {
       loading,
       assets,
       isReadOnlyMode,
    } = this.props.blockchainContext;

    const {
      categoriesAirTable,
    } = this.props.airtableContext;

    if (loading.assets) {
      return <LoadingPage message="Loading assets" />;
    }

    const { currentPage, fundingActive } = this.state;
    let assetsFiltered = assets.slice();
    let { selectedFilters } = this.state;

    // filter by categories and whether active
    assetsFiltered = assetsFiltered.filter((asset) => {
      const assetCategory = asset.category;
      if (((fundingActive && asset.fundingStage === FundingStages.IN_PROGRESS && !asset.pastDate) || (!fundingActive && (asset.funded || asset.pastDate))) && selectedFilters.includes(assetCategory)) {
        return true;
      }
      return false;
    });

    const assetsFilteredTotal = assetsFiltered.length;

    // slice results for pagination
    const startIndex = currentPage * assetsPerPage;
    const endIndex = (currentPage + 1) * assetsPerPage;
    assetsFiltered = assetsFiltered.slice(startIndex, endIndex);
    const readOnlyMode = isReadOnlyMode();

    return (
      <StyledExplore>
        <StyledFilters>
          <StyledFiltersCategories>
            <CategoryFilter
              filters={this.state.filters}
              setFilterState={(filterName, newState) => {
                if (!newState) {
                  selectedFilters = selectedFilters.filter(flter => flter !== filterName);
                } else {
                  selectedFilters.push(filterName);
                }
                this.setState({
                  filters: {
                    ...this.state.filters,
                    [filterName]: newState,
                  },
                  selectedFilters,
                });
              }}
            />
          </StyledFiltersCategories>
          <StyledFiltersSwitch>
            <span>Funding Active</span>
            <Switch
              onChange={isFundingActive => this.setState({ fundingActive: isFundingActive, currentPage: 0 })}
              checked={fundingActive}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
            />
          </StyledFiltersSwitch>
        </StyledFilters>
          <Row>
          {assetsFiltered.map(asset => (
            <Asset
              {...asset}
              key={asset.assetID}
              category={getPrettyCategoryName(asset.category, categoriesAirTable)}
              backgroundImage={asset.imageSrc}
              handleClickedAssetFavorite={this.props.handleClickedAssetFavorite}
              shouldShowWatchIcon={!readOnlyMode}
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
    );
  }
}

Explore.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickedAssetFavorite: PropTypes.func.isRequired,
};

export default WithAirtableContext(WithBlockchainContext(Explore));
