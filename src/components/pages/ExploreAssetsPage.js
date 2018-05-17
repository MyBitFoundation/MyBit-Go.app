import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Loading } from 'carbon-components-react';
import '../../styles/ExploreAssetsPage.css';
import Asset from '../Asset';
import NotFoundPage from './NotFoundPage';

import { debug } from '../../constants';

const ExploreAssetsPage = ({
  clickHandler,
  loading,
  assetsInfo,
  match,
}) => {
  const { category } = match.params;

  if (!category) {
    return <NotFoundPage />;
  }

  const backButton = (
    <Link to="/explore" href="/explore">
      <Button
        kind="secondary"
        className="ExploreAssetsPage__back-button"
        onClick={debug('Clicked to go back')}
      >
      BACK
      </Button>
    </Link>
  );

  const assets = loading || assetsInfo.length === 0
    ? null
    : [
      backButton,
      assetsInfo.map(asset => (
        <Asset
          key={asset.path}
          clickHandler={clickHandler}
          funded={asset.funded}
          goal={asset.goal}
          image={asset.image}
          path={asset.path}
          city={asset.city}
          country={asset.country}
          name={asset.name}
        />
      )),
    ];

  const loadingElement = loading && (
    <div style={{ width: '100%' }}>
      {backButton}
      <Loading className="ExploreAssetsPage--is-loading" withOverlay={false} />
      <p className="ExploreAssetsPage-loading-message">Loading assets</p>
    </div>
  );

  const noElements =
    !loading && assetsInfo.length === 0 ? (
      <div style={{ width: '100%' }}>
        {backButton}
        <p className="ExploreAssetsPage__message-no-elements">{`No assets found in the ${category} category.`}</p>
      </div>
    ) : null;
  const elementsToDisplay = assetsInfo.length ? assets : noElements;
  const toRender = loading ? loadingElement : elementsToDisplay;

  return (
    <div className="ExploreAssetsPage grid">
      <h1>{category}</h1>
      {toRender}
    </div>
  );
};

ExploreAssetsPage.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  assetsInfo: PropTypes.string,
  match: PropTypes.shape({ params: PropTypes.object }).isRequired,
};

ExploreAssetsPage.defaultProps = {
  assetsInfo: [],
};

export default ExploreAssetsPage;
