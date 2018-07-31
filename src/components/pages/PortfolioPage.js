import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';
import TotalPortfolioValue from '../TotalPortfolioValue';
import TotalPortfolioRevenue from '../TotalPortfolioRevenue';

const fromWeiToEth = weiValue => window.web3.utils.fromWei(weiValue, 'ether');

const getOwnedAssets = assets => assets.filter(asset => asset.ownershipUnits > 0);

const getPortfolioValue =
  (assets, currentEthPrice) =>
    assets.reduce((accumulator, currentValue) =>
      accumulator + (fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice), 0);

const getPortfolioRevenue =
  (assets, currentEthPrice) =>
    assets.reduce((accumulator, currentValue) =>
      accumulator + (Number(currentValue.assetIncome) * currentEthPrice), 0);

const getPortfolioValueAssets = (assets, currentEthPrice) => assets.map(asset => ({
  assetID: asset.assetID,
  name: asset.assetID,
  ownership: asset.ownershipUnits,
  value: String(fromWeiToEth(asset.ownershipUnits) * currentEthPrice),
}));

const getPortfolioRevenueAssets = assets => assets.map(asset => ({
  assetID: asset.assetID,
  name: asset.assetID,
  monthlyRevenue: String(Number(asset.assetIncome) / 12), // TODO: This isn't the real calculation
  totalRevenue: asset.assetIncome,
}));

const PortfolioPage = ({ loading, assets, prices }) => {
  if (loading.transactionHistory || !prices.etherPrice) {
    return <LoadingPage message="Loading portfolio" />;
  }
  const { currentEthInUsd } = prices;
  const ownedAssets = getOwnedAssets(assets);
  const totalPortfolioValue = getPortfolioValue(ownedAssets, currentEthInUsd);
  const totalPortfolioRevenue = getPortfolioRevenue(ownedAssets, currentEthInUsd);
  const portfolioValueAssets = getPortfolioValueAssets(ownedAssets);
  const portfolioRevenueAssets = getPortfolioRevenueAssets(ownedAssets);

  return (
    <div>
      <div className="Portfolio">
        <div className="Portfolio__wrapper">
          <TotalPortfolioValue
            totalPortfolioValue={String(totalPortfolioValue)}
            portfolioValueAssets={portfolioValueAssets}
          />
          <TotalPortfolioRevenue
            totalPortfolioRevenue={String(totalPortfolioRevenue)}
            portfolioRevenueAssets={portfolioRevenueAssets}
          />
        </div>
      </div>
    </div>
  );
};

PortfolioPage.propTypes = {
  loading: PropTypes.shape({}).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.shape({}).isRequired,
};


export default PortfolioPage;
