import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'carbon-components-react';
import { Link } from 'react-router-dom';

import { Progress, Col } from 'antd';

import '../styles/Asset.css';
import locationIcon from '../images/Location-icon.svg';
import { debug, isAssetIdEnabled } from '../constants';

const Asset = ({
  clickHandler,
  funded,
  goal,
  city,
  country,
  name,
  category,
  id,
  backgroundImage,
  fundingStage,
  pastDate,
}) => {
  const assetFunded = fundingStage === '3' || fundingStage === '4';
  const barWidth = assetFunded ? 100 : Math.ceil((funded / goal) * 100);
  const goalFormatted = Number(goal)
    .toLocaleString(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      },
    );
  return (
      <Col span={6} className="Asset">
        <div className="gutter-box Asset__image-holder" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
            Funded: <b>{assetFunded ? goalFormatted : `$${Math.round(funded)}`}</b>
          </p>
          <p className="Asset__details-goal">
            Goal:
            <b>
              {goalFormatted}
            </b>
          </p>
          <div className="Asset__details-progress-bar">
            <Progress
              percent={barWidth}
            />
          </div>

          <Link
            to={`/explore/${category}/${id}`}
            href={`/explore/${category}/${id}`}
          >
            <Button
              onClick={
                clickHandler ||
                (() => debug(`Clicked to contribute, asset id: ${id}`))
              }
              className="Asset__details-contribute"
              disabled={isAssetIdEnabled(id) === undefined}
            >
              {assetFunded || pastDate ? 'View Asset' : 'Contribute'}
            </Button>
          </Link>
        </div>
      </Col>
  );
};

Asset.defaultProps = {
  clickHandler: undefined,
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
  backgroundImage: PropTypes.string.isRequired,
  fundingStage: PropTypes.string.isRequired,
  pastDate: PropTypes.bool.isRequired,
};

Asset.defaultProps = {
  city: '',
  country: '',
  name: '',
  clickHandler: () => {},
};

export default Asset;
