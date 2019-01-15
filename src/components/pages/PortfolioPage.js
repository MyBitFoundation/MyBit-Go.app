import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Row from 'antd/lib/col';
import Button from 'antd/lib/button';
import 'antd/lib/row/style';
import '../../styles/PortfolioPage.css';
import LoadingPage from './LoadingPage';
import PieChart from '../../images/chart-pie.svg';
import LineChart from '../../images/chart-line.svg';
import Sliders from '../../images/sliders.svg';
import AssetPortfolio from '../AssetPortfolio';
import { formatMonetaryValue } from '../../util/helpers';
import ValueDisplay from '../ValueDisplay';

const ButtonGroup = Button.Group;

const fromWeiToEth = weiValue => window.web3js.utils.fromWei(weiValue, 'ether');

const getOwnedAssets = (assets, address) =>
  assets
    .filter(asset => (asset.ownershipUnits > 0
      && !(asset.pastDate && asset.amountToBeRaisedInUSD !== asset.amountRaisedInUSD)) || (asset.assetManager === address));

const getPortfolioValue = (assets, currentEthPrice) =>
  assets.reduce(
    (accumulator, currentValue) => {
      let value = 0;

      if(currentValue.ownershipUnits !== '0'){
       value = currentValue.amountToBeRaisedInUSD === currentValue.amountRaisedInUSD
        ?  currentValue.amountRaisedInUSD :
          (fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice)
      }

      return accumulator + value;
      },
    0,
  );

const getPortfolioRevenue = (assets, currentEthPrice, address) =>
  assets.reduce(
    (accumulator, currentValue) =>
      (accumulator) +
      (((fromWeiToEth(currentValue.ownershipUnits, 'ether') * currentEthPrice) /
        (currentValue.amountToBeRaisedInUSD)) *
        currentValue.assetIncome) + (address === currentValue.assetManager ? (currentValue.managerPercentage / 100) * currentValue.assetIncome : 0),
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
    };
  });

const getPortfolioRevenueAssets = (assets, currentEthPrice) =>
  assets.map((asset) => {
    const totalRevenue =
      ((fromWeiToEth(asset.ownershipUnits, 'ether') * currentEthPrice) /
        asset.amountToBeRaisedInUSD) *
      asset.assetIncome;
    const unrealizedProfit = fromWeiToEth(asset.owedToInvestor, 'ether') * currentEthPrice;
    const totalProfitAssetManager = asset.assetIncome * (asset.managerPercentage / 100);
    return {
      assetID: asset.assetID,
      name: asset.name,
      monthlyRevenue: (totalRevenue / 12).toFixed(2),
      totalRevenue: totalRevenue.toFixed(2),
      unrealizedProfit,
      totalProfitAssetManager,
    };
  });

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.displayOwned = this.displayOwned.bind(this);
    this.displayManaged = this.displayManaged.bind(this);
    this.state = {
      currentView: "managed",
    };
  }

  displayOwned() {
    this.setState({ currentView: "owned" });
  }

  displayManaged() {
    this.setState({ currentView: "managed" });
  }

  render() {
    const { loading, assets, prices, withdrawInvestorProfit, withdrawingAssetIds, user } = this.props;
    const { currentView } = this.state;

    if (loading.assets || !prices.ether) {
      return <LoadingPage message="Loading portfolio" />;
    }

    const { ether } = prices;
    const ownedAssets = getOwnedAssets(assets, user.userName);
    const totalPortfolioValue = getPortfolioValue(
      ownedAssets,
      ether.price,
    );

    const totalPortfolioRevenue = getPortfolioRevenue(
      ownedAssets,
      ether.price,
      user.userName,
    );

    console.log(totalPortfolioRevenue)

    const portfolioValueAssets = getPortfolioValueAssets(ownedAssets, ether.price);
    const portfolioRevenueAssets = getPortfolioRevenueAssets(
      ownedAssets,
      ether.price,
    );

    let assetsToRender;
    if(currentView === 'owned'){
      assetsToRender = ownedAssets.map((asset, index) => {
        if(user.userName === asset.assetManager) return null;
        return{
          ...asset,
          totalProfit: portfolioRevenueAssets[index].totalRevenue,
          unrealizedProfit: portfolioRevenueAssets[index].unrealizedProfit,
          ownershipPercentage: portfolioValueAssets[index].ownership,
        }
      })
    } else {
      assetsToRender = ownedAssets.map((asset, index) => {
        if(asset.ownershipUnits !== '0') return null;
        return{
          ...asset,
          totalProfitAssetManager: portfolioRevenueAssets[index].totalProfitAssetManager,
        }
      })
    }

    assetsToRender = assetsToRender.filter(asset => asset !== null);

    const totalManagementProfit = currentView === 'managed' ?
      assetsToRender.reduce(
        (accumulator, currentValue) =>
          (accumulator) + currentValue.totalProfitAssetManager
        , 0) : undefined;

    return (
      <div>
        <div className="Portfolio">
          <div className={classnames({
            'Portfolio__cards': true,
            'Portfolio__cards--has-three': currentView === 'managed',
          })}>
            <ValueDisplay
              text="Total Portfolio Value"
              value={formatMonetaryValue(totalPortfolioValue)}
              icon={<PieChart />}
              hasSeparator
              hasIcon
              hasShadow
              isBlue
            />
            <ValueDisplay
              text="Total Revenue"
              value={`${formatMonetaryValue(totalPortfolioRevenue)}`}
              icon={<LineChart />}
              hasSeparator
              hasIcon
              hasShadow
              isGreen
            />
            {currentView === 'managed' && (
              <ValueDisplay
                text="Total Management Profit"
                value={formatMonetaryValue(totalManagementProfit)}
                icon={<Sliders />}
                hasSeparator
                hasIcon
                hasShadow
                isBlue
              />
            )}
            <div className="Portfolio__card-buttons">
              <ButtonGroup size="large">
                <Button onClick={this.displayOwned}
                  type={currentView === "owned" ? "primary" : "secondary"}>Investments</Button>
                <Button onClick={this.displayManaged}
                  type={currentView === "managed" ? "primary" : "secondary"}>Managed assets</Button>
              </ButtonGroup>
            </div>
          </div>
          <Row className="Portfolio__assets">
            {assetsToRender.map((asset, index) => (
              <AssetPortfolio
                type={currentView}
                key={asset.assetID}
                withdrawInvestorProfit={withdrawInvestorProfit}
                withdrawingAssetIds={withdrawingAssetIds}
                asset={asset}
              />
            ))}
          </Row>
          {assetsToRender.length === 0 && (
            <p className="ManagedAsset__error">{currentView === 'owned' ? 'You have not yet invested in any assets.' : 'You have not yet created any assets.'}</p>
          )}
        </div>
      </div>
    );
  }
};

PortfolioPage.propTypes = {
  loading: PropTypes.shape({}).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  prices: PropTypes.shape({}).isRequired,
};

export default PortfolioPage;
