import React from 'react';
import {
  Button,
} from 'antd';
import Link from 'next/link';
import Router from 'next/router'
import Loading from 'components/Loading';
import {
  InternalLinks,
} from 'constants/links';
import ManageAssetNavButtons from './manageAssetNavButtons';
import ManageAssetContentWrapper from './manageAssetContentWrapper';
import ManageAssetSection from './manageAssetSection';
import ManageAssetAssetInfo from './manageAssetAssetInfo';
import ManageAssetGraphs from './manageAssetGraphs';
import ManageAssetDocsButton from './manageAssetDocsButton';
import { withMetamaskErrors } from 'components/MetamaskErrors';
import {
  getErrorMessage,
} from './errorMessages';
import ErrorPage from 'components/ErrorPage';
import DocumentsManager from 'components/DocumentsManager';
import BackButton from 'ui/BackButton';

class ManageAsset extends React.Component {
    constructor(props) {
      super(props);
      this.displayProfit = this.displayProfit.bind(this);
      this.displayCollateral = this.displayCollateral.bind(this);
      this.state = {
        chartBoxView: "profit",
        profitChartView: 'weekly',
        supportingDocuments: false,
      };
    }

    displayProfit(type) {
      this.setState({ chartBoxView: "profit", profitChartView: type });
    }

    displayCollateral() {
      this.setState({ chartBoxView: "collateral" });
    }

    getFilesToRender(files, assetId){
      if(!files || files.length === 0){
        return <span>None</span>;
      }
      const toReturn = files.map(file => (
        <a
          href={`${InternalLinks.S3}${assetId}:${file}`}
        >
          {file}
        </a>
      ))

      return toReturn;
    }

    getNavBarButtons = (assetId, error) => (
      <ManageAssetNavButtons>
        <BackButton />
        {!error && (
          <React.Fragment>
            <Link
              as={`/asset/${assetId}`}
              href={`/asset?id=${assetId}`}
            >
              <Button
                type="secondary"
              >
                View Asset Listing
              </Button>
            </Link>
            <ManageAssetDocsButton
                type="secondary"
                selected={this.state.supportingDocuments}
                onClick={() => this.setState(prevProps => ({supportingDocuments: !prevProps.supportingDocuments}))}
              >
              Supporting Documents
            </ManageAssetDocsButton>
          </React.Fragment>
        )}
      </ManageAssetNavButtons>
    )

    render() {
      const {
        assetInfo = {},
        error,
        prices,
        loading,
        metamaskError,
      } = this.props;


      if(loading) {
        return(
          <Loading
            message="Loading asset information"
            hasBackButton
          />
        )
      } else if(error){
        const description = getErrorMessage(error.type);
        return (
          <ErrorPage
            title="Error"
            description={description}
          />
        )
      }

      const {
        asset = {},
        finantialDetails = {},
        methods = {},
        userAddress,
      } = assetInfo;

      const {
        withdrawCollateral,
        withdrawProfitAssetManager,
      } = methods;

      const {
        assetManagerProfits,
        averageProfitETH,
        averageProfitUSD,
        collateralData,
        percentageMax,
        withdrawMax,
        profitETH,
        profitUSD,
        revenueData,
        toWithdrawETH,
        toWithdrawUSD,
        isWithdrawingCollateral,
        isWithdrawingAssetManager,
      } = finantialDetails;

      const {
        mybit,
        ethereum,
      } = prices;

      const {
        profitChartView,
        toWithdraw,
        chartBoxView,
        supportingDocuments,
      } = this.state;

      const {
        assetId,
        collateral,
        managerPercentage,
        amountToBeRaisedInUSD,
        assetIncome,
        city,
        country,
        name,
        imageSrc,
        partner,
        files,
      } = asset;

      const assetListingUrl = `/explore/${assetId}`;

      return (
        <div>
          {this.getNavBarButtons(assetId, error)}
            {!error && (
              <ManageAssetContentWrapper>
                <ManageAssetSection>
                  <ManageAssetAssetInfo
                    imageSrc={imageSrc}
                    assetId={assetId}
                    name={name}
                    city={city}
                    country={country}
                    amountToBeRaisedInUSD={amountToBeRaisedInUSD}
                    assetIncome={assetIncome}
                    profitUSD={profitUSD}
                    profitETH={profitETH}
                    averageProfitUSD={averageProfitUSD}
                    averageProfitETH={averageProfitETH}
                    toWithdrawUSD={toWithdrawUSD}
                    toWithdrawETH={toWithdrawETH}
                    isWithdrawingAssetManager={isWithdrawingAssetManager}
                    withdrawProfitAssetManager={withdrawProfitAssetManager}
                  />
                </ManageAssetSection>
                {!supportingDocuments && (
                  <ManageAssetSection
                    hasGraphs
                  >
                    <ManageAssetGraphs
                      chartBoxView={chartBoxView}
                      revenueData={revenueData}
                      profitChartView={profitChartView}
                      managerPercentage={managerPercentage}
                      ethereumPrice={ethereum.price}
                      mybitPrice={mybit.price}
                      displayProfit={this.displayProfit}
                      displayCollateral={this.displayCollateral}
                      collateral={collateral}
                      collateralData={collateralData}
                      amountToBeRaisedInUSD={amountToBeRaisedInUSD}
                      isWithdrawingCollateral={isWithdrawingCollateral}
                      withdrawCollateral={withdrawCollateral}
                    />
                  </ManageAssetSection>
                )}
                {supportingDocuments && (
                  <ManageAssetSection
                    hasShadow
                  >
                    <DocumentsManager
                      assetId={assetId}
                      files={files}
                    />
                  </ManageAssetSection>
                )}
              </ManageAssetContentWrapper>
            )}
        </div>
        )
    }
}

export default withMetamaskErrors(ManageAsset, false, true);
