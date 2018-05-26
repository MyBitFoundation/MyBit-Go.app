import React from 'react';
import PropTypes from 'prop-types';
import { Button, Loading } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import AssetDetails from '../AssetDetails';
import { debug } from '../../constants';
import '../../styles/AssetDetailsPage.css';

const AssetDetailsPage = ({
  state,
  match,
}) => {
  const { assetId, category } = match.params;

  const asset = state.assets[category][assetId];

  const loading = !state.misc.currentEthInUsd || !asset;
  const backButton = (
    <Link
      to={`/explore/${category}`}
      href={`/explore/${category}`}
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
    <div style={{ width: '100%', position: 'relative', top: '50px' }}>
      <Loading className="AssetDetailsPage--is-loading" withOverlay={false} />
      <p className="AssetDetailsPage-loading-message">
        Loading asset information
      </p>
    </div>
  );

  const assetDetails = !loading && (
    <AssetDetails
      information={asset}
      currentEthInUsd={state.misc.currentEthInUsd}
    />
  );

  return (
    <div style={{ position: 'relative' }}>
      {backButton}
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
