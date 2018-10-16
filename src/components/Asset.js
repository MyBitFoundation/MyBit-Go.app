import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import Progress from 'antd/lib/progress';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';
import 'antd/lib/progress/style';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style';
import '../styles/Asset.css';
import locationIcon from '../images/Location-icon.png';
import Watch from './Watch';
import { debug, isAssetIdEnabled } from '../constants';
import { formatMonetaryValue } from '../util/helpers';

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
  watchListed,
  handleClickedAssetFavorite,
}) => {
  const assetFunded = fundingStage === '3' || fundingStage === '4';
  const barWidth = assetFunded ? 100 : Math.ceil((funded / goal) * 100);
  const goalFormatted = formatMonetaryValue(goal);
  let buttonText = 'Contribute';
  let buttonType = 'primary';
  if (assetFunded || pastDate) {
    buttonText = 'View Asset';
    buttonType = 'default';
  }
  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={6} className="Asset">
      <div className="Asset__wrapper">
        <div
          className="gutter-box Asset__image-holder"
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
          <Watch
            active={watchListed}
            handleClick={handleClickedAssetFavorite}
            assetId={id}
          />
        </div>
        <div className={`Asset__details ${barWidth === 100 && 'Asset__details--is-funded'}`}>
          <p className="Asset__details-funded">
            Funded:{' '}
            <b>{assetFunded ? goalFormatted : `${formatMonetaryValue(funded)}`}</b>
          </p>
          <p className="Asset__details-goal">
            Goal:{' '}
            <b>{goalFormatted}</b>
          </p>
          <div className="Asset__details-progress-bar">
            <Progress percent={barWidth} />
            {barWidth === 100 && (
              <Icon
                type="check-circle"
                theme="filled"
              />
            )}
          </div>

          <Link
            to={`/explore/${category}/${id}`}
            href={`/explore/${category}/${id}`}
          >
            <Button
              type={buttonType}
              onClick={
                clickHandler ||
                (() => debug(`Clicked to contribute, asset id: ${id}`))
              }
              className="Asset__details-contribute"
              disabled={isAssetIdEnabled(id) === undefined}
            >
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

Asset.propTypes = {
  funded: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  city: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  fundingStage: PropTypes.string.isRequired,
  pastDate: PropTypes.bool.isRequired,
  watchListed: PropTypes.bool.isRequired,
  handleClickedAssetFavorite: PropTypes.func.isRequired,
};

Asset.defaultProps = {
  city: '',
  country: '',
  name: '',
  clickHandler: () => {},
  backgroundImage: '',
};

export default Asset;
