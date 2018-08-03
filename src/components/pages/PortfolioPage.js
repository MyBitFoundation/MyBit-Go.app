import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';
import TotalPortfolioValue from '../TotalPortfolioValue';
import TotalPortfolioRevenue from '../TotalPortfolioRevenue';
import getWeb3Async from '../../util/web3';

const web3 = getWeb3Async();

const fromWeiToEth = weiValue => web3.utils.fromWei(weiValue, 'ether');

const getOwnedAssets = assets =>
  assets.filter(asset => asset.ownershipUnits > 0);

const getPortfolioValue = (assets, currentEthPrice) =>
  assets.reduce(
    (accumulator, currentValue) =>
      accumulator +
      fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice,
    0
  );

const getPortfolioRevenue = (assets, currentEthPrice) =>
  assets.reduce(
    (accumulator, currentValue) =>
      accumulator +
      fromWeiToEth(currentValue.assetIncome, 'ether') * currentEthPrice,
    0
  );

const getPortfolioValueAssets = assets =>
  assets.map(asset => ({
    assetID: asset.assetID,
    name: asset.name,
    ownership: 100,
    value: 100
  }));

const getPortfolioRevenueAssets = assets =>
  assets.map(asset => ({
    assetID: asset.assetID,
    name: asset.name,
    monthlyRevenue: 100, // TODO: This isn't the real calculation
    totalRevenue: 100
  }));

const PortfolioPage = ({ loading, assets, prices }) => {
  if (loading.transactionHistory || !prices.etherPrice) {
    return <LoadingPage message="Loading portfolio" />;
  }
  const { etherPrice } = prices;
  const ownedAssets = getOwnedAssets(assets);
  const totalPortfolioValue = getPortfolioValue(ownedAssets, etherPrice);
  const totalPortfolioRevenue = getPortfolioRevenue(ownedAssets, etherPrice);
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
  prices: PropTypes.shape({}).isRequired
};

export default PortfolioPage;
