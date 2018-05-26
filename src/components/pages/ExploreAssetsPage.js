import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'carbon-components-react';
import '../../styles/ExploreAssetsPage.css';
import Asset from '../Asset';
import NotFoundPage from './NotFoundPage';
import LoadingPage from './LoadingPage';

const ExploreAssetsPage = ({
  state,
  match,
}) => {
  const { category } = match.params;

  if (!category) {
    return <NotFoundPage />;
  }

  const loading = state.assets.loaded;
  const assetsInfo = state.assets[category];
  const assetsInfoArray = assetsInfo ? Object.entries(assetsInfo) : null;

  const backButton = (
    <Link key="/explore" to="/explore" href="/explore">
      <Button
        kind="secondary"
        className="ExploreAssetsPage__back-button"
      >
      BACK
      </Button>
    </Link>
  );

  const assets = loading || !assetsInfoArray || assetsInfoArray.length === 0
    ? null
    : [
      backButton,
      assetsInfoArray.map((asset) => {
        const key = asset[0];
        const value = asset[1];
        return (
          <Asset
            id={key}
            key={key}
            funded={value.raised}
            goal={value.goal}
            city={value.city}
            country={value.country}
            name={value.assetName}
            category={category}
          />
        );
      }),
    ];

  const loadingElement = loading && (
    <LoadingPage
      message="Loading assets"
      hasBackButton
      path="/explore"
    />
  );

  const noElements =
    !loading && (!assetsInfoArray || assetsInfoArray.length === 0) ? (
      <div style={{ width: '100%' }}>
        {backButton}
        <p className="ExploreAssetsPage__message-no-elements">{`No assets found in the ${category} category.`}</p>
      </div>
    ) : null;


  return (
    <div className="ExploreAssetsPage grid">
      {noElements}
      {loadingElement}
      {assets}
    </div>
  );
};

ExploreAssetsPage.propTypes = {
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

export default ExploreAssetsPage;
