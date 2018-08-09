import React from 'react';
import PropTypes from 'prop-types';

import LineChart from '../images/chart-line.png';

const PortfolioRevenueItem = ({
  assetID,
  name,
  totalRevenue,
  monthlyRevenue
}) => (
  <div key={assetID} className="Portfolio__tile">
    <img className="Portfolio__tile-img" src={LineChart} alt="Line chart" />
    <div>
      <p>{name}</p>
      <p>
        Total Revenue: <b>${totalRevenue}</b>
      </p>
      <p>
        Monthly Revenue: <b>${monthlyRevenue}</b>
      </p>
    </div>
  </div>
);

PortfolioRevenueItem.propTypes = {
  assetID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  monthlyRevenue: PropTypes.number.isRequired,
  totalRevenue: PropTypes.number.isRequired
};

export default PortfolioRevenueItem;
