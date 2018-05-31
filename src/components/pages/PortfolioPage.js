import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';
import TotalPortfolioValue from '../TotalPortfolioValue';
import TotalPortfolioRevenue from '../TotalPortfolioRevenue';

const PortfolioPage = ({ state }) => {
  if (state.loading.portfolio) {
    return <LoadingPage message="Loading portfolio" />;
  }

  return (
    <div>
      <div className="Portfolio">
        <div className="Portfolio__wrapper">
          <TotalPortfolioValue totalPortfolioValue="100" assets={state.assets} />
          <TotalPortfolioRevenue totalPortfolioRevenue="100" assets={state.assets} />
        </div>
      </div>
    </div>
  );
};

PortfolioPage.propTypes = {
  state: PropTypes.shape({}).isRequired,
};


export default PortfolioPage;
