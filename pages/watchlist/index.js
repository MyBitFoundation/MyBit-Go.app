/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'antd/lib/switch';
import 'antd/lib/switch/style/index.css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/index.css';
import { getPrettyCategoryName } from '../../utils/helpers';
import Loading from '../../components/Loading';
import Asset from '../../components/UI/Asset';
import {
  FundingStages,
} from '../../constants/fundingStages';
import { withBlockchainContext } from '../../components/Blockchain'
import StyledWatchList from './styledWatchList';
import StyledWatchListPagination from './styledWatchListPagination';
import StyledWatchListFilters from './styledWatchListFilters';
import StyledWatchListSwitch from './styledWatchListSwitch';
import StyledNoResults from '../../components/styledNoResults';

const assetsPerPage = 12;

class WatchListPage extends React.Component {
  state = {
    currentPage: 0,
    fundingActive: true,
  };

  render = () => {
    const {
      blockchainContext,
     } = this.props;

     const {
      loading,
      assets,
      handleAssetFavorited,
     } = blockchainContext;

    if (loading.assets) {
      return <Loading message="Loading Watch List" />;
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
            {...asset}
            key={asset.assetId}
            backgroundImage={asset.imageSrc}
            watchListed={asset.watchListed}
            handleAssetFavorited={handleAssetFavorited}
          />
        ))}
      </div>
    );

    return (
      <StyledWatchList>
        <StyledWatchListFilters>
          <StyledWatchListSwitch>
            <span>Funding Active</span>
            <Switch
              onChange={isFundingActive => this.setState({ fundingActive: isFundingActive })}
              checked={fundingActive}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
            />
          </StyledWatchListSwitch>
        </StyledWatchListFilters>
        {assetsToRender}
        {assetsFiltered.length > 0 && (
          <StyledWatchListPagination
            onChange={newPage => this.setState({ currentPage: newPage - 1 })}
            total={assetsFilteredTotal}
            current={currentPage + 1}
            pageSize={assetsPerPage}
            defaultCurrent={1}
          />
        )}
        {assetsFiltered.length === 0 && (
          <StyledNoResults>
            No Assets to display
          </StyledNoResults>
        )}
      </StyledWatchList>
    );
  }
}

WatchListPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickedAssetFavorite: PropTypes.func.isRequired,
};

export default withBlockchainContext(WatchListPage);
