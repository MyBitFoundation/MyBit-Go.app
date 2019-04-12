import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
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
import {
  PortfolioTypes,
} from 'constants/portfolioTypes';

import PortfolioPageValueDisplays from './portfolioPageValueDisplays';
import PortfolioPageNavButtons from './portfolioPageNavButtons';
import PortfolioPageExplore from './portfolioPageExplore';
import Loading from 'components/Loading';
import ErrorPage from 'components/ErrorPage';

const ButtonGroup = Button.Group;
const assetsPerPage = 6;
import Pagination from 'components/AssetDisplayer/pagination';

class PortfolioPage extends React.Component{
  state = {
    currentPage: 0,
  }

  componentWillReceiveProps = nextProps => {
    if(nextProps.type !== this.props.type){
      this.setState({currentPage: 0})
    }
  }

  render = () => {
    const {
      loading,
      assets,
      withdrawInvestorProfit,
      withdrawingAssetIds,
      payoutAsset,
      callingPayout,
      type,
    } = this.props;

    const {
      currentPage,
    } = this.state;

    if(loading){
      return <Loading message="Loading Portfolio" />;
    }

    const currentView = type;

    const assetsToRender = currentView === PortfolioTypes.INVESTMENTS ?
      assets.filter(assetFinantialDetails =>
        assetFinantialDetails.investmentDetails || false
      ) : assets.filter(assetFinantialDetails =>
        assetFinantialDetails.managerDetails || false
      )

    // slice results for pagination
    const startIndex = currentPage * assetsPerPage;
    const endIndex = (currentPage + 1) * assetsPerPage;
    const assetsToDisplay = assetsToRender.slice(startIndex, endIndex);

    const error = assetsToRender.length === 0 && (
       <ErrorPage
          title="Empty Portfolio"
          description={currentView === PortfolioTypes.MANAGED_ASSETS
              ? <span>You don't manage any assets yet. Click{' '}
                  <Link href="/list-asset">
                    here
                  </Link>{' '}to list an asset.
                </span>
              : `You haven't invested in any assets yet.`}
        />
    )

    return (
      <div>
        <PortfolioPageValueDisplays
          isManagedPage={currentView === 'managed-assets'}
        >
          <PortfolioPageNavButtons>
            <ButtonGroup size="large">
              <Button onClick={() => Router.push(`/portfolio?type=${PortfolioTypes.INVESTMENTS}`, `/portfolio/${PortfolioTypes.INVESTMENTS}`)}
                type={currentView === PortfolioTypes.INVESTMENTS ? 'primary' : 'secondary'}>Investments</Button>
              <Button onClick={() => Router.push(`/portfolio?type=${PortfolioTypes.MANAGED_ASSETS}`, `/portfolio/${PortfolioTypes.MANAGED_ASSETS}`)}
                type={currentView === PortfolioTypes.MANAGED_ASSETS ? "primary" : "secondary"}>Managed assets</Button>
            </ButtonGroup>
          </PortfolioPageNavButtons>
          <ValueDisplay
            text="Total Portfolio Value"
            value={formatMonetaryValue(assets.length > 0 ? assets[assets.length - 1].totalAssetValue : 0)}
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
          {currentView === PortfolioTypes.MANAGED_ASSETS && (
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
        </PortfolioPageValueDisplays>
        {assetsToDisplay.length > 0 && (
          <React.Fragment>
          <PortfolioPageExplore>
            {assetsToDisplay.map(asset =>
              <Asset
                type={currentView}
                {...asset.managerDetails}
                {...asset.investmentDetails}
                key={asset.assetId}
                withdrawInvestorProfit={withdrawInvestorProfit}
                withdrawing={withdrawingAssetIds.includes(asset.assetId)}
                callingPayout={callingPayout.includes(asset.assetId)}
                payoutAsset={payoutAsset}
              />
            )}
          </PortfolioPageExplore>
          <Pagination
            onChange={newPage => this.setState({ currentPage: newPage - 1 })}
            total={assetsToRender.length}
            current={currentPage + 1}
            pageSize={assetsPerPage}
            defaultCurrent={1}
          />
         </React.Fragment>
        )}
        {error && error}
      </div>
    );
  }
}

export default PortfolioPage;
