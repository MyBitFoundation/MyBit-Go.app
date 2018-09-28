import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import AssetDetails from '../AssetDetails';
import { Button } from 'antd';
import '../../styles/AssetDetailsPage.css';
import NotFoundPage from './NotFoundPage';

const AssetDetailsPage = ({ loading, assets, match, prices, user }) => {
  if (loading.assets) {
    return (
      <div style={{ width: '100%', position: 'relative', top: '50px' }}>
        <Loading className="AssetDetailsPage--is-loading" withOverlay={false} />
        <p className="AssetDetailsPage-loading-message">
          Loading asset information
        </p>
      </div>
    );
  }

  const { assetId } = match.params;
  const asset = assets.find(({ assetID }) => assetID === assetId);

  if (!asset) {
    return (
      <NotFoundPage message="The desired asset could not be found. Assets previously listed may no longer exist." />
    );
  }
  const assetInformation = {
    assetID: asset.assetID,
    dueDate: asset.fundingDeadline,
    goal: asset.amountToBeRaisedInUSD,
    raised: asset.amountRaisedInUSD,
    assetName: asset.name,
    city: asset.city,
    country: asset.country,
    details: asset.details,
    description: asset.description,
    address: asset.assetManager,
    numberOfInvestors: asset.numberOfInvestors,
    imageSrc: asset.imageSrc,
    fundingStage: asset.fundingStage,
    pastDate: asset.pastDate
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button>Back</Button>
      <AssetDetails
        information={assetInformation}
        currentEthInUsd={prices.etherPrice}
        user={user}
      />
    </div>
  );
};

AssetDetailsPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired
};

export default AssetDetailsPage;
