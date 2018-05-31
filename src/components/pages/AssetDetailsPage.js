import React from 'react';
import PropTypes from 'prop-types';
import { Button, Loading } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import AssetDetails from '../AssetDetails';
import { debug } from '../../constants';
import '../../styles/AssetDetailsPage.css';
import NotFoundPage from './NotFoundPage';

// TODO: Generalize and extract this component
const BackButton = ({ category }) => (
  <Link
    to={`/explore/${category.toLowerCase()}`}
    href={`/explore/${category.toLowerCase()}`}
  >
    <Button
      kind="secondary"
      className="AssetDetailsPage__back-button"
      onClick={debug('Clicked to go back')}
    >
      BACK
    </Button>
  </Link>
);

BackButton.propTypes = {
  category: PropTypes.string.isRequired,
};

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
  console.log(asset);

  if (!asset) {
    return (
      <NotFoundPage
        message="The desired asset could not be found. Assets previously listed may no longer exist."
      />
    );
  }
  const assetInformation = {
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
      <BackButton category={category} />
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
