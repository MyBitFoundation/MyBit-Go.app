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
import '../../styles/ExplorePage.css';
import { getPrettyCategoryName } from '../../util/helpers';
import LoadingPage from './LoadingPage';
import CategoryFilter from '../CategoryFilter';
import Asset from '../Asset';

const assetsPerPage = 12;

class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentPage: 0,
      filters: {
        Crypto: true,
        'Real Estate': true,
        Energy: true,
        Machinery: true,
        Transportation: true,
        Other: true,
      },
      selectedFilters: [
        'Crypto',
        'Real Estate',
        'Energy',
        'Machinery',
        'Transportation',
        'Other',
      ],
      fundingActive: true,
    };
  }

  render() {
    const {
      loading,
       assets,
       categoriesAirTable
      } = this.props;
    if (loading.assets) {
      return <LoadingPage message="Loading assets" />;
    }

    const { currentPage, fundingActive } = this.state;
    let assetsFiltered = assets.slice();
    let { selectedFilters } = this.state;

    // filter by categories and whether active
    assetsFiltered = assetsFiltered.filter((asset) => {
      const assetCategory = asset.category;
      if (((fundingActive && asset.fundingStage === 1 && !asset.pastDate) || (!fundingActive && (asset.fundingStage === 4 || asset.fundingStage === 3 || asset.pastDate))) && selectedFilters.includes(assetCategory)) {
        return true;
      }
      return false;
    });

    const assetsFilteredTotal = assetsFiltered.length;

    // slice results for pagination
    const startIndex = currentPage * assetsPerPage;
    const endIndex = (currentPage + 1) * assetsPerPage;
    assetsFiltered = assetsFiltered.slice(startIndex, endIndex);

    const assetsToRender = (
      <div>
        {assetsFiltered.map(asset => (
          <Asset
            key={asset.assetID}
            id={asset.assetID}
            funded={asset.amountRaisedInUSD}
            goal={asset.amountToBeRaisedInUSD}
            city={asset.city}
            country={asset.country}
            name={asset.name}
            category={getPrettyCategoryName(asset.category, categoriesAirTable)}
            backgroundImage={asset.imageSrc}
            fundingStage={asset.fundingStage}
            pastDate={asset.pastDate}
            handleClickedAssetFavorite={this.props.handleClickedAssetFavorite}
            watchListed={asset.watchListed}
          />
        ))}
      </div>
    );

    return (
      <Row className="ExplorePage">
        <div className="ExplorePage__filters">
          <div className="ExplorePage__filters--is-categories">
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
          </div>
          <div className="ExplorePage__filters--is-switch">
            <span>Funding Active</span>
            <Switch
              onChange={isFundingActive => this.setState({ fundingActive: isFundingActive, currentPage: 0 })}
              checked={fundingActive}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
            />
          </div>
        </div>
        {assetsToRender}
        {assetsFiltered.length > 0 && (
          <Pagination
            onChange={newPage => this.setState({ currentPage: newPage - 1 })}
            total={assetsFilteredTotal}
            current={currentPage + 1}
            pageSize={assetsPerPage}
            defaultCurrent={1}
            className="ExplorePage__pagination"
          />
        )}
        {assetsFiltered.length === 0 && (
          <p className="ExplorePage__no-results">
            No Assets to display
          </p>
        )}
      </Row>
    );
  }
}

ExplorePage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickedAssetFavorite: PropTypes.func.isRequired,
};

export default ExplorePage;
