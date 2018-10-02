import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/col';
import 'antd/lib/row/style';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';
import getWeb3Async from '../../util/web3';
import { isAssetIdEnabled } from '../../constants';
import PieChart from '../../images/chart-pie.png';
import LineChart from '../../images/chart-line.png';
import AssetPortfolio from '../AssetPortfolio';

const web3 = getWeb3Async();

const fromWeiToEth = weiValue => web3.utils.fromWei(weiValue, 'ether');

const getOwnedAssets = assets =>
  assets
    .filter(asset => asset.ownershipUnits > 0
      && isAssetIdEnabled(asset.assetID)
      && !(asset.pastDate && asset.amountToBeRaisedInUSD !== asset.amountRaisedInUSD));

const getPortfolioValue = (assets, currentEthPrice) =>
  assets.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice),
    0,
  );

const getPortfolioRevenue = (assets, currentEthPrice) =>
  assets.reduce(
    (accumulator, currentValue) =>
      (accumulator) +
      (((fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice) /
        (currentValue.amountToBeRaisedInUSD)) *
        currentValue.assetIncome),
    0,
  );

const getPortfolioValueAssets = (assets, currentEthPrice) =>
  assets.map((asset) => {
    let ownership = (
      ((fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice) /
        asset.amountToBeRaisedInUSD) *
      100
    ).toFixed(2);
    if (Number(ownership) > 100) {
      ownership = 100;
    }
    return {
      assetID: asset.assetID,
      name: asset.name,
      ownership,
      value: (
        fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice
      ).toFixed(2),
    };
  });

const getPortfolioRevenueAssets = (assets, currentEthPrice) =>
  assets.map((asset) => {
    const totalRevenue =
      ((fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice) /
        asset.amountToBeRaisedInUSD) *
      asset.assetIncome;
    return {
      assetID: asset.assetID,
      name: asset.name,
      monthlyRevenue: (totalRevenue / 12).toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
    };
  });

const PortfolioPage = ({ loading, assets, prices }) => {
  if (loading.assets || !prices.ether) {
    return <LoadingPage message="Loading portfolio" />;
  }

  const { ether } = prices;
  const ownedAssets = getOwnedAssets(assets);
  const totalPortfolioValue = getPortfolioValue(
    ownedAssets,
    ether.price,
  ).toFixed(2);
  const totalPortfolioRevenue = getPortfolioRevenue(
    ownedAssets,
    ether.price,
  ).toFixed(2);

  const portfolioValueAssets = getPortfolioValueAssets(ownedAssets, ether.price);
  const portfolioRevenueAssets = getPortfolioRevenueAssets(
    ownedAssets,
    ether.price,
  );

  const totalValueEth =
    parseFloat((totalPortfolioValue / ether.price)
      .toFixed(4));

  const totalRevenuePercentage =
    (totalPortfolioValue > 0 && totalPortfolioRevenue > 0)
      ? ((totalPortfolioRevenue * 100) / totalPortfolioValue).toFixed(2)
      : 0;

  return (
    <div>
      <div className="Portfolio">
        <div className="Portfolio__cards">
          <div className="Portfolio__card">
            <img className="Portfolio__card-img" src={PieChart} alt="Pie chart" />
            <span>Total Portfolio Value: {' '}
              <b>
                ${Number(totalPortfolioValue).toLocaleString()}
              </b>
            </span>
            <div className="Portfolio__card-separator" />
            <b>ETH {totalValueEth}</b>
          </div>
          <div className="Portfolio__card">
            <img className="Portfolio__card-img" src={LineChart} alt="Line chart" />
            <span>Total Revenue: <b>${Number(totalPortfolioRevenue).toLocaleString()}</b></span>
            <div className="Portfolio__card-separator" />
            <b className="Portfolio__card-value--is-green">%{totalRevenuePercentage}</b>
          </div>
        </div>
        <Row className="Portfolio__assets">
          {ownedAssets.map((asset, index) => (
            <AssetPortfolio
              key={asset.assetID}
              name={asset.name}
              backgroundImage={asset.imageSrc}
              unrealizedProfit={portfolioRevenueAssets[index].totalRevenue}
              ownershipUsd={portfolioValueAssets[index].value}
              ownershipPercentage={portfolioValueAssets[index].ownership}
              funding={asset.amountRaisedInUSD}
              fundingTotal={asset.amountToBeRaisedInUSD}
              fundingStage={asset.fundingStage}
              assetID={asset.assetID}
              category={asset.category}
            />
          ))}
        </Row>
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
