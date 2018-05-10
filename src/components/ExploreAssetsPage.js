import React from 'react';
import '../styles/ExploreAssetsPage.css';
import { Asset } from './Asset';
import { Button, Loading } from 'carbon-components-react';
import { debug } from '../constants';

export const ExploreAssetsPage = ({
  clickHandler,
  loading,
  assetsInfo,
  category,
}) => {
  const backButton = (
    <Button
      kind="secondary"
      className="ExploreAssetsPage__back-button"
      onClick={debug('Clicked to go back')}
    >
      BACK
    </Button>
  );

  const assets = loading
    ? null
    : assetsInfo.length === 0
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

  const toRender = loading
    ? loadingElement
    : assetsInfo.length === 0 ? noElements : assets;

  return <div className="ExploreAssetsPage grid">{toRender}</div>;
};
