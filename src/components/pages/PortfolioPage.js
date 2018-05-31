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

const PortfolioPage = ({ state }) => {
  if (state.loading.portfolio) {
    return <LoadingPage message="Loading portfolio" />;
  }

  const ownedAssets = getOwnedAssets(state.assets);
  const totalPortfolioValue = getPortfolioValue(ownedAssets, state.misc.currentEthInUsd);
  const totalPortfolioRevenue = getPortfolioRevenue(ownedAssets, state.misc.currentEthInUsd);
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
  state: PropTypes.shape({}).isRequired,
};


export default PortfolioPage;
