import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'carbon-components-react';
import AssetDetails from '../AssetDetails';
import CategoryBackButton from '../CategoryBackButton';
import '../../styles/AssetDetailsPage.css';
import NotFoundPage from './NotFoundPage';

const AssetDetailsPage = ({
  state,
  match,
}) => {
  if (state.loading.assets) {
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
  const asset = state.assets.find(({ assetID }) => assetID === assetId);

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
        currentEthInUsd={state.misc.currentEthInUsd}
      />
    </div>
  );
};

AssetDetailsPage.propTypes = {
  state: PropTypes.shape().isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default AssetDetailsPage;
