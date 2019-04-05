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

const PortfolioPage = ({
  loading,
  assets,
  withdrawInvestorProfit,
  withdrawingAssetIds,
  payoutAsset,
  callingPayout,
  type,
}) => {

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
      {assetsToRender.length > 0 && (
        <PortfolioPageExplore>
          {assetsToRender.map(asset =>
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
      )}
      {error && error}
    </div>
  );
}

export default PortfolioPage;
