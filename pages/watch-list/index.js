/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Icon,
} from 'antd';
import { withBlockchainContext } from 'components/Blockchain'
import Loading from 'components/Loading';
import { getPrettyCategoryName } from 'utils/helpers';
import {
  FundingStages,
} from 'constants/fundingStages';
import StyledWatchListFilters from './styledWatchListFilters';
import StyledWatchListSwitch from './styledWatchListSwitch';
import NoResults from 'components/NoResults';
import AssetDisplayer from 'components/AssetDisplayer';

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

    return (
      <React.Fragment>
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
        <AssetDisplayer
          assets={assetsFiltered}
          type="default"
          handleAssetFavorited={handleAssetFavorited}
        />
      </React.Fragment>
    );
  }
}

WatchListPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickedAssetFavorite: PropTypes.func.isRequired,
};

export default withBlockchainContext(WatchListPage);
