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
import '../../styles/WatchListPage.css';
import { getPrettyCategoryName } from '../../util/helpers';
import LoadingPage from './LoadingPage';
import Asset from '../Asset';
import {
  FundingStages,
} from '../../constants/fundingStages';

const assetsPerPage = 12;

class WatchListPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentPage: 0,
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
      return <LoadingPage message="Loading WatchList" />;
    }

    const { currentPage, fundingActive } = this.state;
    let assetsFiltered = assets.slice();

    // filter by categories and whether active
    assetsFiltered = assetsFiltered.filter((asset) => {
      if ((fundingActive && (asset.fundingStage !== FundingStages.IN_PROGRESS || asset.pastDate)) || (!fundingActive && !asset.pastDate) || !asset.watchListed) {
        return false;
      }
      return true;
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
            assetID={asset.assetID}
            amountRaisedInUSD={asset.amountRaisedInUSD}
            amountToBeRaisedInUSD={asset.amountToBeRaisedInUSD}
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
      <Row className="WatchListPage">
        <div className="WatchListPage__filters">
          <div className="WatchListPage__filters--is-switch">
            <span>Funding Active</span>
            <Switch
              onChange={isFundingActive => this.setState({ fundingActive: isFundingActive })}
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
            className="WatchListPage__pagination"
          />
        )}
        {assetsFiltered.length === 0 && (
          <p className="WatchListPage__no-results">
            No Assets to display
          </p>
        )}
      </Row>
    );
  }
}

WatchListPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickedAssetFavorite: PropTypes.func.isRequired,
};

export default WatchListPage;
