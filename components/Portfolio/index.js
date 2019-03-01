import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Button,
} from 'antd';
import ValueDisplay from 'ui/ValueDisplay';
import Asset from 'ui/Asset/';
import PieChart from 'static/chart-pie.svg';
import LineChart from 'static/chart-line.svg';
import Sliders from 'static/sliders.svg';
import {
  formatMonetaryValue,
  fromWeiToEth,
} from 'utils/helpers';
import StyledPortfolioPageValueDisplays from './styledPortfolioPageValueDisplays';
import StyledPortfolioPageNavButtons from './styledPortfolioPageNavButtons';
import StyledPortfolioPageExplore from './styledPortfolioPageExplore';
import Loading from 'components/Loading';
import ErrorPage from 'components/ErrorPage';

const ButtonGroup = Button.Group;

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
    this.displayOwned = this.displayOwned.bind(this);
    this.displayManaged = this.displayManaged.bind(this);
    this.state = {
      currentView: "portfolioManaged",
    };
  }

  displayOwned() {
    this.setState({ currentView: "portfolioInvestment" });
  }

  displayManaged() {
    this.setState({ currentView: "portfolioManaged" });
  }

  render() {
    const {
      loading,
      assets,
      withdrawInvestorProfit,
      withdrawingAssetIds,
    } = this.props;

    if(loading){
      return <Loading message="Loading Portfolio" />;
    }

    const {
      currentView,
    } = this.state;

    const assetsToRender = currentView === 'portfolioInvestment' ?
      assets.filter(assetFinantialDetails =>
        assetFinantialDetails.investmentDetails || false
      ) : assets.filter(assetFinantialDetails =>
        assetFinantialDetails.managerDetails || false
      )
    const error = assetsToRender.length === 0 && (
       <ErrorPage
          title="Empty Portfolio"
          description={currentView === 'portfolioManaged'
              ? <span>You don't own any assets. Click{' '}
                  <Link href="/list-asset">
                    here
                  </Link>{' '}to list an asset.
                </span>
              : `You haven't invested in any assets yet.`}
        />
    )

    return (
      <div>
        <StyledPortfolioPageValueDisplays
          isManagedPage={currentView === 'portfolioManaged'}
        >
          <StyledPortfolioPageNavButtons>
            <ButtonGroup size="large">
              <Button onClick={this.displayOwned}
                type={currentView === "portfolioInvestment" ? "primary" : "secondary"}>Investments</Button>
              <Button onClick={this.displayManaged}
                type={currentView === "portfolioManaged" ? "primary" : "secondary"}>Managed assets</Button>
            </ButtonGroup>
          </StyledPortfolioPageNavButtons>
          <ValueDisplay
            text="Total Portfolio Value"
            value={formatMonetaryValue(assetsToRender.length > 0 ? assetsToRender[assetsToRender.length - 1].totalAssetValue : 0)}
            icon={<PieChart />}
            hasSeparator
            hasIcon
            hasShadow
            isBlue
            coloredBackground
            customClassName="PortfolioPage__ValueDisplay--is-portfolioRevenue"
          />
          <ValueDisplay
            text="Total Revenue"
            value={formatMonetaryValue(assetsToRender.length > 0 ? assetsToRender[assetsToRender.length - 1].totalAssetRevenue : 0)}
            icon={<LineChart />}
            hasSeparator
            hasIcon
            hasShadow
            isGreen
            coloredBackground
            customClassName="PortfolioPage__ValueDisplay--is-totalRevenue"
          />
          {currentView === 'portfolioManaged' && (
            <ValueDisplay
              text="Total Management Profit"
              value={formatMonetaryValue(assetsToRender.length > 0 ? assetsToRender[assetsToRender.length - 1].totalManagementProfit : 0)}
              icon={<Sliders />}
              hasSeparator
              hasIcon
              hasShadow
              isBlue
              coloredBackground
              customClassName="PortfolioPage__ValueDisplay--is-managementProfit"
            />
          )}
        </StyledPortfolioPageValueDisplays>
        {assetsToRender.length > 0 && (
          <StyledPortfolioPageExplore>
            {assetsToRender.map(asset =>
              <Asset
                type={currentView}
                {...asset.managerDetails}
                {...asset.investmentDetails}
                key={asset.assetId}
                withdrawInvestorProfit={withdrawInvestorProfit}
                withdrawing={withdrawingAssetIds.includes(asset.assetId)}
              />
            )}
          </StyledPortfolioPageExplore>
        )}
        {error && error}
      </div>
    );
  }
};

PortfolioPage.propTypes = {
  loading: PropTypes.shape({}).isRequired,
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PortfolioPage;
