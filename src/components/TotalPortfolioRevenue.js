import React from 'react';
import PropTypes from 'prop-types';
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react';
import BarChart from '../images/chart-bar.png';
import PortfolioRevenueItem from './PortfolioRevenueItem';

const TotalPortfolioRevenue = ({ totalPortfolioRevenue, portfolioRevenueAssets }) => (
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
        {portfolioRevenueAssets.map(asset => (
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
  portfolioRevenueAssets: PropTypes.arrayOf(PropTypes.shape({
    assetID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    monthlyRevenue: PropTypes.string.isRequired,
    totalRevenue: PropTypes.string.isRequired,
  })).isRequired,
};

export default TotalPortfolioRevenue;
