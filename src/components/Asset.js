import React from 'react';
import '../styles/Asset.css';
import { Button } from 'carbon-components-react';
import locationIcon from '../images/Location-icon.svg';
import { debug } from '../constants';

export const Asset = ({
  clickHandler,
  funded,
  goal,
  image,
  path,
  city,
  country,
  name
}) => {
  let barWidth = Math.ceil(100 * funded / goal) + '%';
  return (
    <div className="col-3_md-4_sm-6_xs-12 asset">
      <div className="asset__container">
        <div
          className="asset__image-holder"
          style={{ backgroundImage: 'url(' + image + ')' }}
        >
          <div className="asset__image-holder-gradient" />
          <img
            className="asset__image-holder-location-icon"
            src={locationIcon}
          />
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
              style={{ width: barWidth }}
            />
          </div>
          <Button
            onClick={
              clickHandler
                ? clickHandler
                : () => debug(`Clicked to contribute, path: ${path}`)
            }
            className="asset__details-contribute"
          >
            CONTRIBUTE
          </Button>
        </div>
      </div>
    </div>
  );
};
