import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent
} from 'carbon-components-react';
import PieChart from '../images/chart-pie.png';
import PortfolioValueItem from './PortfolioValueItem';

const TotalPortfolioValue = ({ totalPortfolioValue, portfolioValueAssets }) => (
  <div>
    <ExpandableTile className="Portfolio__tile-expandable Portfolio__total">
      <TileAboveTheFoldContent>
        <div className="Portfolio__tile">
          <img className="Portfolio__tile-img" src={PieChart} alt="Pie chart" />
          <div>
            <p>Total Portfolio Value:</p>
            <b>${totalPortfolioValue}</b>
          </div>
        </div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent className="Portfolio__folded-content">
        {portfolioValueAssets.map(asset => (
          <PortfolioValueItem
            key={asset.assetID}
            assetID={asset.assetID}
            name={asset.name}
            ownership={asset.ownership}
            value={asset.value}
          />
        ))}
        <div className="Portfolio__tile" />
      </TileBelowTheFoldContent>
    </ExpandableTile>
  </div>
);

TotalPortfolioValue.propTypes = {
  totalPortfolioValue: PropTypes.string.isRequired,
  portfolioValueAssets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      ownership: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TotalPortfolioValue;
