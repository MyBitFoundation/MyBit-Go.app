import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import '../styles/Asset.css';
import locationIcon from '../images/Location-icon.svg';
import { debug } from '../constants';
import bitcoinAtm from '../images/bitcoin-atm.png';

const Asset = ({
  clickHandler,
  funded,
  goal,
  city,
  country,
  name,
  category,
  id,
}) => {
  const barWidth = `${Math.ceil((funded / goal) * 100)}%`;
  return (
    <div className="col-3_md-4_sm-6_xs-12 Asset">
      <div className="Asset__container">
        <div
          className="Asset__image-holder"
          style={{ backgroundImage: `url(${bitcoinAtm})` }}
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
            Funded: <b>${Math.round(funded)}</b>
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
          <Link
            to={`/explore/${category}/${id}`}
            href={`/explore/${category}/${id}`}
          >
            <Button
              onClick={clickHandler || (() => debug(`Clicked to contribute, asset id: ${id}`))}
              className="Asset__details-contribute"
            >
              CONTRIBUTE
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

Asset.defaultProps = {
  clickHandler: undefined,
};

Asset.propTypes = {
  funded: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default Asset;
