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

import { formatMonetaryValue } from '../util/helpers';

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
  numberOfInvestors,
  owedToInvestor,
  withdrawInvestorProfit,
  withdrawingAssetIds,
}) => {
  const url = `/explore/${assetID}`;

  let type = 'primary';
  let text = 'Contribute more';

  if (fundingStage !== '1') {
    type = 'secondary';
    text = 'View asset listing';
  }

  const withdrawing = withdrawingAssetIds.includes(assetID);

  const button = (
    <Link to={url} href={url}>
      <Button
        type={type}
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
          <b className="AssetPortfolio__name">{name}</b>
        </div>
        <div className="AssetPortfolio__details">
          <div className="AssetPortfolio__details-section">
            <span>Unrealised profit:</span>
            <span
              className={unrealizedProfit && 'AssetPortfolio__details--value-green'}
            >
              {fundingStage === '1' ? <span>Funding in progress</span> : `${formatMonetaryValue(unrealizedProfit)}`}
            </span>
          </div>
          <div className="AssetPortfolio__details-section">
            <span>Your ownership:</span>
            <div>
              <span>{formatMonetaryValue(numberOfInvestors === 1 && (fundingStage === 3 || fundingStage === 4) ? fundingTotal : ownershipUsd > fundingTotal ? fundingTotal : ownershipUsd)}</span>
              <Divider
                type="vertical"
              />
              <span>{numberOfInvestors === 1 && (fundingStage === 3 || fundingStage === 4) ? '100' : ownershipPercentage}%</span>
            </div>
          </div>
          <div className="AssetPortfolio__details-section">
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
      </div>
    </Col>
  );
};

export default AssetPortfolio;

AssetPortfolio.defaultProps = {
  backgroundImage: '',
};

AssetPortfolio.propTypes = {
  name: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  unrealizedProfit: PropTypes.string.isRequired,
  ownershipUsd: PropTypes.string.isRequired,
  ownershipPercentage: PropTypes.string.isRequired,
  funding: PropTypes.number.isRequired,
  fundingTotal: PropTypes.number.isRequired,
  fundingStage: PropTypes.string.isRequired,
  assetID: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  numberOfInvestors: PropTypes.number.isRequired,
};
