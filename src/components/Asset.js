import React from 'react';
import '../styles/Asset.css';
import { Button } from 'carbon-components-react';
import locationIcon from '../images/Location-icon.svg';

export const Asset = ({
  clickHandler,
  funded,
  goal,
  image,
  path,
  includeBackButton,
  city,
  country,
  name
}) => {
  let barWidth = Math.ceil(294 * (funded * 100 / goal / 100));
  return (
    <div className="col-center asset">
      {includeBackButton && (
        <Button
          kind="secondary"
          className="exploreAssetsPage__back-button"
          onClick={() => {
            console.log('Clicked to go back');
          }}
        >
          BACK
        </Button>
      )}
      <div className="asset__image-holder">
        <img className="asset__image-holder-image" src={image} />
        <div className="asset__image-holder-gradient" />
        <img className="asset__image-holder-location-icon" src={locationIcon} />
        <b className="asset__image-holder-name">{name}</b>
        <p className="asset__image-holder-location">
          {city}, <span>{country}</span>
        </p>
      </div>
      <div className="asset__details">
        <p className="asset__details-funded">
          Funded: <b>${funded}</b>
        </p>
        <p className="asset__details-goal">
          Goal: <b>${goal}</b>
        </p>
        <div className="asset__details-progress-bar">
          <div
            className="asset__details-progress-bar-fill"
            style={{ width: barWidth + 'px' }}
          />
        </div>
        <Button
          onClick={
            clickHandler
              ? clickHandler
              : () => console.log('Clicked to contribute, path: ', path)
          }
          className="asset__details-contribute"
        >
          CONTRIBUTE
        </Button>
      </div>
    </div>
  );
};
