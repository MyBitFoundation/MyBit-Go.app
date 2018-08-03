import React from 'react';
import PropTypes from 'prop-types';

import PieChart from '../images/chart-pie.png';

const PortfolioValueItem = ({ assetID, name, ownership, value }) => (
  <div key={assetID} className="Portfolio__tile">
    <img className="Portfolio__tile-img" src={PieChart} alt="Pie chart" />
    <div>
      <p>{name}</p>
      <p>
        Ownership: <b>{ownership}%</b>
      </p>
      <p>
        Value: <b>${value}</b>
      </p>
    </div>
  </div>
);

PortfolioValueItem.propTypes = {
  assetID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ownership: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default PortfolioValueItem;
