import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import '../styles/Asset.css';
import locationIcon from '../images/Location-icon.svg';
import { debug } from '../constants';

const Asset = ({
  clickHandler,
  funded,
  goal,
  city,
  country,
  name,
  category,
  id,
  backgroundImage
}) => {
  const barWidth = `${Math.ceil((funded / goal) * 100)}%`;
  return (
    <Link
            to={`/explore/${category}/${id}`}
            href={`/explore/${category}/${id}`}
          >
    <div className="Asset">
      <div className="Asset__container">
        <div
          className="Asset__image-holder"
          style={{ backgroundImage: `url(${backgroundImage})` }}
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
            Goal:
            <b>
              {Number(goal).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </b>
          </p>
          <div className="Asset__details-progress-bar">
            <div
              className="Asset__details-progress-bar-fill"
              style={{ width: barWidth }}
            />
          </div>
          
            <Button
              onClick={
                clickHandler ||
                (() => debug(`Clicked to contribute, asset id: ${id}`))
              }
              className="Asset__details-contribute"
            >
              CONTRIBUTE
            </Button>

        </div>
      </div>
    </div>
    </Link>
  );
};

Asset.defaultProps = {
  clickHandler: undefined
};

Asset.propTypes = {
  funded: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  city: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired
};

Asset.defaultProps = {
  city: '',
  country: '',
  name: '',
  clickHandler: () => {}
};

export default Asset;
