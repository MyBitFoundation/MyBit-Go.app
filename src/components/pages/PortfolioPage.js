import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';
import TotalPortfolioValue from '../TotalPortfolioValue';
import TotalPortfolioRevenue from '../TotalPortfolioRevenue';
import getWeb3Async from '../../util/web3';
import { getAssetRevenueTmp } from '../../constants';

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
      ((fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice) /
        currentValue.amountToBeRaisedInUSD) *
        getAssetRevenueTmp(currentValue.assetID),
    0
  );

const getPortfolioValueAssets = (assets, currentEthPrice) =>
  assets.map(asset => ({
    assetID: asset.assetID,
    name: asset.name,
    ownership: (
      ((fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice) /
        asset.amountToBeRaisedInUSD) *
      100
    ).toFixed(2),
    value: (
      fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice
    ).toFixed(2)
  }));

const getPortfolioRevenueAssets = (assets, currentEthPrice) =>
  assets.map(asset => {
    const totalRevenue =
      ((fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice) /
        asset.amountToBeRaisedInUSD) *
      getAssetRevenueTmp(asset.assetID);
    return {
      assetID: asset.assetID,
      name: asset.name,
      monthlyRevenue: (totalRevenue / 12).toFixed(2),
      totalRevenue: totalRevenue.toFixed(2)
    };
  });

const PortfolioPage = ({ loading, assets, prices }) => {
  if (loading.transactionHistory || !prices.etherPrice) {
    return <LoadingPage message="Loading portfolio" />;
  }
  const { etherPrice } = prices;
  const ownedAssets = getOwnedAssets(assets);
  const totalPortfolioValue = getPortfolioValue(
    ownedAssets,
    etherPrice
  ).toFixed(2);
  const totalPortfolioRevenue = getPortfolioRevenue(
    ownedAssets,
    etherPrice
  ).toFixed(2);
  const portfolioValueAssets = getPortfolioValueAssets(ownedAssets, etherPrice);
  const portfolioRevenueAssets = getPortfolioRevenueAssets(
    ownedAssets,
    etherPrice
  );

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
