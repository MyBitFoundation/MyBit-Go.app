import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'carbon-components-react';
import '../styles/Asset.css';
import locationIcon from '../images/Location-icon.svg';
import { debug } from '../constants';

const Asset = ({
  clickHandler,
  funded,
  goal,
  image,
  path,
  city,
  country,
  name,
}) => {
  const barWidth = `${Math.ceil((funded / goal) * 100)}%`;
  return (
    <div className="col-3_md-4_sm-6_xs-12 Asset">
      <div className="Asset__container">
        <div
          className="Asset__image-holder"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="Asset__image-holder-gradient" />
          <img
            alt="Location icon"
            className="Asset__image-holder-location-icon"
            src={locationIcon}
          />
          <b className="Asset__image-holder-name">{name}</b>
          <p className="Asset__image-holder-location">
            {city}, <span>{country}</span>
          </p>
        </div>
        <div className="Asset__details">
          <p className="Asset__details-funded">
            Funded: <b>${funded}</b>
          </p>
          <p className="Asset__details-goal">
            Goal: <b>${goal}</b>
          </p>
          <div className="Asset__details-progress-bar">
            <div
              className="Asset__details-progress-bar-fill"
              style={{ width: barWidth }}
            />
          </div>
          <Button
            onClick={clickHandler || (() => debug(`Clicked to contribute, path: ${path}`))}
            className="Asset__details-contribute"
          >
            CONTRIBUTE
          </Button>
        </div>
      </div>
    </div>
  );
};

Asset.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  funded: PropTypes.bool.isRequired,
  goal: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Asset;
