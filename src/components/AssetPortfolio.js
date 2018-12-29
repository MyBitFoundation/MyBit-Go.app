import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Divider from 'antd/lib/divider';
import 'antd/lib/divider/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Col from 'antd/lib/col';
import 'antd/lib/col/style';

import '../styles/Asset.css';
import '../styles/AssetPortfolio.css';
import locationIcon from '../images/Location-icon.png';

import { formatMonetaryValue } from '../util/helpers';

const AssetPortfolio = ({
  type,
  name,
  backgroundImage,
  totalProfit,
  unrealizedProfit,
  ownershipUsd,
  ownershipPercentage,
  funding,
  fundingTotal,
  fundingStage,
  assetID,
  category,
  numberOfInvestors,
  owedToInvestor,
  withdrawInvestorProfit,
  withdrawingAssetIds,
  value,
  fee,
  totalProfitAssetManager,
  city,
  country,
}) => {
  let url = `/explore/${assetID}`;

  let buttonType = 'primary';
  let text = 'Contribute more';

  if (type === 'owned' && fundingStage !== 1) {
    buttonType = 'secondary';
    text = 'View asset listing';
  } else if(type === 'managed' && (fundingStage === 3 || fundingStage === 4)){
    buttonType = 'secondary';
    text = 'Manage asset';
    url = `/manage/${assetID}`;
  } else if(type === 'managed' && fundingStage === 1){
    text = 'View asset listing';
  }

  const withdrawing = withdrawingAssetIds.includes(assetID);

  const button = (
    <Link to={url} href={url} className="AssetPortfolio__details-buttons--is-view">
      <Button
        type={buttonType}
      >
        {text}
      </Button>
    </Link>
  );

  const withdrawButton = owedToInvestor > 0 ? (
    <Button
      onClick={() => withdrawInvestorProfit(assetID, formatMonetaryValue(unrealizedProfit))}
      type="primary"
      loading={withdrawing}
      className="AssetPortfolio__details-buttons--is-withdrawl"
    >
      {withdrawing ? 'Withdrawing' : 'Withdraw'}
    </Button>

  ) : null;

  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={8} style={{ padding: '20px 40px 10px 0px' }}>
      <div className="AssetPortfolio">
        <div
          className="AssetPortfolio__image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="AssetPortfolio__image-holder-gradient" />
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
        {type === 'owned' && (
          <div className={`AssetPortfolio__details ${(fundingStage === 0 || fundingStage === 1) ? 'AssetPortfolio__details--is-three-sections' : undefined}`}>
            <div className="AssetPortfolio__details-section AssetPortfolio__details-section--is-unrealised">
              <span>Unrealised profit:</span>
              <span>{fundingStage === 1 ? <span>Funding in progress</span> : `${formatMonetaryValue(unrealizedProfit)}`}</span>
            </div>
            {(fundingStage === 3 || fundingStage === 4) && (
              <div className="AssetPortfolio__details-section AssetPortfolio__details-section--is-totalProfit">
                <span>Total profit:</span>
                <div>
                  <span>{formatMonetaryValue(totalProfit)}</span>
                </div>
              </div>
            )}
            <div className="AssetPortfolio__details-section AssetPortfolio__details-section--is-ownership">
              <span>Your ownership:</span>
              <div>
                <span>{numberOfInvestors === 1 && (fundingStage === 3 || fundingStage === 4) ? '100' : ownershipPercentage}%</span>
              </div>
            </div>
            <div className="AssetPortfolio__details-section AssetPortfolio__details-section--is-funding">
              <div>
                <p>Funding:</p>
                <span>
                  {formatMonetaryValue(funding)}/{formatMonetaryValue(fundingTotal)}
                </span>
              </div>
              <div className="AssetPortfolio__details-buttons">
                {withdrawButton}
                {button}
              </div>
            </div>
          </div>
        )}
        {type === 'managed' && (
          <div className={'AssetPortfolio__details AssetPortfolio__details--is-managed'}>
            <div className="AssetPortfolio__details-section AssetPortfolio__details-section">
              <span>Your management fee:</span>
              <span className="AssetPortfolio__details--is-bold">{fee}%</span>
            </div>
            <div className="AssetPortfolio__details-section AssetPortfolio__details-section">
              <span>Total profit:</span>
              <div>
                <span className="AssetPortfolio__details--is-bold">{formatMonetaryValue(totalProfitAssetManager)}</span>
              </div>
            </div>
            <div className="AssetPortfolio__details-section AssetPortfolio__details-section--is-ownership">
              <span>Available for withdrawal:</span>
              <div>
                <span className="AssetPortfolio__details--is-bold">$0</span>
              </div>
            </div>
            <div className="AssetPortfolio__details-section AssetPortfolio__details-section--is-funding">
              <div>
                {(fundingStage === 3 || fundingStage === 4) && (
                  <span>Fully funded</span>
                )}
                {fundingStage === 1 && (
                  <span>Funded: <span className="AssetPortfolio__details--is-bold">{formatMonetaryValue(funding)}</span>/{formatMonetaryValue(fundingTotal)}</span>
                )}
              </div>
              <div className="AssetPortfolio__details-buttons">
                {withdrawButton}
                {button}
              </div>
            </div>
          </div>
        )}
      </div>
    </Col>
  );
};

export default AssetPortfolio;

AssetPortfolio.defaultProps = {
  backgroundImage: '',
};

AssetPortfolio.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  totalProfit: PropTypes.string.isRequired,
  ownershipUsd: PropTypes.string.isRequired,
  ownershipPercentage: PropTypes.string.isRequired,
  funding: PropTypes.number.isRequired,
  fundingTotal: PropTypes.number.isRequired,
  fundingStage: PropTypes.string.isRequired,
  assetID: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  numberOfInvestors: PropTypes.number.isRequired,
};
