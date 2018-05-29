import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import AssetDetails from '../AssetDetails';
import { debug } from '../../constants';
import '../../styles/AssetDetailsPage.css';
import LoadingPage from './LoadingPage';

const AssetDetailsPage = ({
  state,
  match,
}) => {
  const { assetId, category } = match.params;

  const asset = state.assets.find(element => element.assetID === assetId);

  const loading = !state.misc.currentEthInUsd || !asset;

  const backButton = (
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

  const loadingElement = loading && (
  <LoadingPage
    message="Loading asset information"
    hasBackButton
    path="/explore"
  />
  );

  const assetDetails = !loading && (
    <div>
      {backButton}
      <AssetDetails
        information={asset}
        currentEthInUsd={state.misc.currentEthInUsd}
      />
    </div>
  );

  return (
    <div style={{ position: 'relative' }}>
      {loadingElement}
      {assetDetails}
    </div>
  );
};

AssetDetailsPage.propTypes = {
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default AssetDetailsPage;
