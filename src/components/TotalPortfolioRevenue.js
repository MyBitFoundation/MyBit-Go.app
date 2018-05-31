import React from 'react';
import PropTypes from 'prop-types';
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react';
import BarChart from '../images/chart-bar.png';
import PortfolioRevenueItem from './PortfolioRevenueItem';

const getPortfolioRevenueAssets = assets => assets.map(asset => asset);

const TotalPortfolioRevenue = ({ totalPortfolioRevenue, assets }) => (
  <div>
    <ExpandableTile className="Portfolio__tile-expandable Portfolio__revenue">
      <TileAboveTheFoldContent>
        <div className="Portfolio__tile">
          <img className="Portfolio__tile-img" src={BarChart} alt="Bar chart" />
          <div>
            <p>Total Asset Revenue:</p>
            <b>${totalPortfolioRevenue}</b>
          </div>
        </div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent className="Portfolio__folded-content">
        {getPortfolioRevenueAssets(assets).map(asset => (
          <PortfolioRevenueItem
            assetID={asset.assetID}
            name={asset.name}
            monthlyRevenue={asset.monthlyRevenue}
            totalRevenue={asset.totalRevenue}
          />))}
        <div className="Portfolio__tile" />
      </TileBelowTheFoldContent>
    </ExpandableTile>
  </div>
);

TotalPortfolioRevenue.propTypes = {
  totalPortfolioRevenue: PropTypes.string.isRequired,
  assets: PropTypes.arrayOf({}).isRequired,
};

export default TotalPortfolioRevenue;
