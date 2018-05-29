import React from 'react';
import PropTypes from 'prop-types';
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from 'carbon-components-react';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';

import PieChart from '../../images/chart-pie.png';
import BarChart from '../../images/chart-bar.png';
import LineChart from '../../images/chart-line.png';

const PortfolioPage = ({ state }) => {
  const loadedPortfolio = state.portfolio.loaded;
  const { portfolioRevenue } = state.portfolio;
  const { portfolioValue } = state.portfolio;

  return (
    <div>
      {!loadedPortfolio &&
        <LoadingPage
          message="Loading portfolio"
          hasBackButton={false}
        />
      }
      {loadedPortfolio && (
        <div className="Portfolio">
          <div className="Portfolio__wrapper">
            <div>
              <ExpandableTile className="Portfolio__tile-expandable Portfolio__total">
                <TileAboveTheFoldContent>
                  <div className="Portfolio__tile">
                    <img className="Portfolio__tile-img" src={PieChart} alt="Pie chart" />
                    <div>
                      <p>Total Portfolio Value:</p>
                      <b>${portfolioValue.value}</b>
                    </div>
                  </div>
                </TileAboveTheFoldContent>
                <TileBelowTheFoldContent className="Portfolio__folded-content">
                  {portfolioValue.assets.map(asset => (
                    <div key={asset.name + asset.ownership + asset.value} className="Portfolio__tile">
                      <img className="Portfolio__tile-img" src={PieChart} alt="Pie chart" />
                      <div>
                        <p>{asset.name}</p>
                        <p>Ownership: <b>{asset.ownership}%</b></p>
                        <p>Value: <b>${asset.value}</b></p>
                      </div>
                    </div>
                  ))}
                  <div className="Portfolio__tile" />
                </TileBelowTheFoldContent>
              </ExpandableTile>
            </div>
            <div>
              <ExpandableTile className="Portfolio__tile-expandable Portfolio__revenue">
                <TileAboveTheFoldContent>
                  <div className="Portfolio__tile">
                    <img className="Portfolio__tile-img" src={BarChart} alt="Bar chart" />
                    <div>
                      <p>Total Asset Revenue:</p>
                      <b>${portfolioRevenue.value}</b>
                    </div>
                  </div>
                </TileAboveTheFoldContent>
                <TileBelowTheFoldContent className="Portfolio__folded-content">
                  {portfolioRevenue.assets.map(asset => (
                    <div key={asset.name + asset.totalRevenue + asset.value} className="Portfolio__tile">
                      <img className="Portfolio__tile-img" src={LineChart} alt="Line chart" />
                      <div>
                        <p>{asset.name}</p>
                        <p>Ownership: <b>${asset.totalRevenue}</b></p>
                        <p>Value: <b>${asset.monthlyRevenue}</b></p>
                      </div>
                    </div>
                  ))}
                  <div className="Portfolio__tile" />
                </TileBelowTheFoldContent>
              </ExpandableTile>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PortfolioPage.propTypes = {
  state: PropTypes.shape({ params: PropTypes.object }).isRequired,
};


export default PortfolioPage;
