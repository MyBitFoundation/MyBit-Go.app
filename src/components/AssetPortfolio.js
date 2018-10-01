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

const AssetPortfolio = ({
  name,
  backgroundImage,
  unrealizedProfit,
  ownershipUsd,
  ownershipPercentage,
  funding,
  fundingTotal,
  fundingStage,
  assetID,
  category,
}) => {
  const url = `/explore/${category}/${assetID}`;

  let type = 'primary';
  let text = 'Contribute more';

  if (fundingStage !== '1') {
    type = 'secondary';
    text = 'View asset';
  }

  const button = (
    <Link to={url} href={url}>
      <Button
        type={type}
      >
        {text}
      </Button>
    </Link>
  );

  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={8} style={{ padding: '20px 15px' }}>
      <div className="AssetPortfolio">
        <div
          className="AssetPortfolio__image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="AssetPortfolio__image-holder-gradient" />
          <b className="AssetPortfolio__name">{name}</b>
        </div>
        <div className="AssetPortfolio__details">
          <div className="AssetPortfolio__details-section">
            <span>Unrealised profit:</span>
            <span
              className={unrealizedProfit && 'AssetPortfolio__details--value-green'}
            >
              {fundingStage === '1' ? <span>Funding in progress</span> : `$${Number(unrealizedProfit).toLocaleString()}`}
            </span>
          </div>
          <div className="AssetPortfolio__details-section">
            <span>Your ownership:</span>
            <div>
              <span>${Number(ownershipUsd).toLocaleString()}</span>
              <Divider
                type="vertical"
              />
              <span>%{ownershipPercentage}</span>
            </div>
          </div>
          <div className="AssetPortfolio__details-section">
            <span>Funding:
              <span>
                ${Number(funding).toLocaleString()}/${Number(fundingTotal).toLocaleString()}
              </span>
            </span>
            {button}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default AssetPortfolio;

AssetPortfolio.propTypes = {
  name: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  unrealizedProfit: PropTypes.string.isRequired,
  ownershipUsd: PropTypes.string.isRequired,
  ownershipPercentage: PropTypes.string.isRequired,
  funding: PropTypes.string.isRequired,
  fundingTotal: PropTypes.string.isRequired,
  fundingStage: PropTypes.string.isRequired,
  assetID: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
