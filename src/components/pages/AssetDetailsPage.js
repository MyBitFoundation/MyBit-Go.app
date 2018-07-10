import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import AssetDetails from '../AssetDetails';
import CategoryBackButton from '../CategoryBackButton';
import '../../styles/AssetDetailsPage.css';
import NotFoundPage from './NotFoundPage';

const AssetDetailsPage = ({
  loading,
  assets,
  match,
  prices,
}) => {
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

  const { assetId, category } = match.params;
  const asset = assets.find(({ assetID }) => assetID === assetId);

  if (!asset) {
    return (
      <NotFoundPage
        message="The desired asset could not be found. Assets previously listed may no longer exist."
      />
    );
  }
  const assetInformation = {
    assetID: asset.assetID,
    dueDate: asset.fundingDeadline,
    goal: asset.amountToBeRaised,
    raised: asset.amountRaisedInUSD,
    assetName: '',
    city: '',
    country: '',
    details: '',
    description: '',
    address: '',
  };

  return (
    <div style={{ position: 'relative' }}>
      <CategoryBackButton category={category} />
      <AssetDetails
        information={assetInformation}
        currentEthInUsd={prices.etherPrice}
      />
    </div>
  );
};

AssetDetailsPage.propTypes = {
  loading: PropTypes.shape({ params: PropTypes.object }).isRequired,
  assets: PropTypes.shape({ params: PropTypes.object }).isRequired,
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default AssetDetailsPage;
