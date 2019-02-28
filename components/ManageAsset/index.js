import React from 'react';
import {
  Button,
} from 'antd';
import Link from 'next/link';
import Loading from 'components/Loading';
import {
  InternalLinks,
} from 'constants';
import ManageAssetNavButtons from './manageAssetNavButtons';
import ManageAssetContentWrapper from './manageAssetContentWrapper';
import ManageAssetSection from './manageAssetSection';
import ManageAssetAssetInfo from './manageAssetAssetInfo';
import ManageAssetGraphs from './manageAssetGraphs';

class ManageAsset extends React.Component {
    constructor(props) {
      super(props);
      this.displayProfit = this.displayProfit.bind(this);
      this.displayCollateral = this.displayCollateral.bind(this);
      this.state = {
        chartBoxView: "profit",
        profitChartView: 'weekly',
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

    getNavBarButtons = (assetId) => (
      <ManageAssetNavButtons>
        <Button
          type="secondary"
        >
          Back
        </Button>
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
        <Button
          type="secondary"
        >
          Supporting Documents
        </Button>
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

      if(loading){
        return(
          <Loading
            message="Loading asset information"
            hasBackButton
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
        type,
      } = error;

      const {
        error: metamaskErrorType,
      } = metamaskError;

      if(metamaskErrorType){
        return <p onClick={window.ethereum.enable}>{metamaskErrorType}</p>
      }

      const {
        profitChartView,
        toWithdraw,
        chartBoxView,
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

      const filesToRender = this.getFilesToRender(files, assetId);

      return (
          <div>
            {this.getNavBarButtons(assetId)}
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
              </ManageAssetContentWrapper>
              {/*<div className="ManagedAsset__content-wrapper">
                  <div className="ManagedAsset__content-column">
                      <div>
                          <div><h1 className="ManagedAsset__asset-title">{name}</h1></div>
                          <div>
                            <Button disabled className="ManagedAsset__button--margin-right">Sell on MYDAX</Button>
                            <Link
                              to={assetListingUrl}
                              href={assetListingUrl}
                            >
                              <Button className="ManagedAsset__button">View asset listing</Button>
                            </Link>
                          </div>
                      </div>
                      <div>
                          <div><h2 className="ManagedAsset__asset-meta">
                              <LocationIcon className="ManagedAsset__location-icon" />
                              {city}, {country}
                          </h2></div>
                          <div><h2 className="ManagedAsset__asset-meta">{partner}</h2></div>
                      </div>
                      <div
                          className="ManagedAsset__asset-image"
                          alt="Asset Preview"
                          style={{ backgroundImage: `url(${imageSrc})` }}
                      />
                      <div>
                          <div className="AssetValueRow__Card">
                              <PieChart />
                              Asset Value
                              <div className="AssetValueRow__Card-box-separator" />
                              <b className="AssetValueRow__Card-value--is-blue">${amountToBeRaisedInUSD}</b>
                          </div>
                          <div className="AssetValueRow__Card">
                              <LineChart />
                              Asset Revenue
                              <div className="AssetValueRow__Card-box-separator" />
                              <b className="AssetValueRow__Card-value--is-green">{formatMonetaryValue(assetIncome)}</b>
                          </div>
                          <div className="AssetValueRow__Card">
                              <img className="AssetValueRow__Card-img-pie-chart" src={Fee} alt="Line chart" />
                              Fee
                              <div className="AssetValueRow__Card-box-separator" />
                              <b className="AssetValueRow__Card-value--is-blue">{managerPercentage}%</b>
                          </div>
                      </div>
                      <div>
                          <div className="AssetBoxedRow__Card">
                              <div className="AssetBoxedRow__Card-title">Total profit</div>
                              <div className="AssetBoxedRow__Card-text--is-green">{formatMonetaryValue(profitUSD)}</div>
                              <div className="AssetBoxedRow__Card-text">{profitETH }ETH</div>
                          </div>
                          <div className="AssetBoxedRow__Card">
                              <div className="AssetBoxedRow__Card-title">Average profit</div>
                              <div className="AssetBoxedRow__Card-text--is-blue">{formatMonetaryValue(averageProfitUSD)}</div>
                              <div className="AssetBoxedRow__Card-text">{averageProfitETH} ETH</div>
                              <div className="AssetBoxedRow__Card-text-bottom">Daily</div>
                          </div>
                          <div className="AssetBoxedRow__Card">
                              <div className="AssetBoxedRow__Card-title-rows">Available to <br />withdraw</div>
                              <div className="AssetBoxedRow__Card-text--is-green">{toWithdrawUSD}</div>
                              <div className="AssetBoxedRow__Card-text">{Number(toWithdrawETH).toLocaleString('en-US', {maximumFractionDigits: 4})} ETH</div>
                              <div className="AssetBoxedRow__Card-button">
                                  <Button
                                    type="primary"
                                    disabled={Number(toWithdrawETH) === 0}
                                    loading={isWithdrawingAssetManager}
                                    onClick={withdrawProfitAssetManager}
                                  >
                                    {isWithdrawingAssetManager ? 'Withdrawing' : 'Withdraw'}
                                  </Button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="ManagedAsset__content-column">
                      <div>
                          <div className="AssetBoxedRow__Card">
                              <div className="AssetBoxedRow__Card-title">Total profit</div>
                              <div className="AssetBoxedRow__Card-text--is-green">{formatMonetaryValue(graphData.totalProfitUSD)}</div>
                              <div className="AssetBoxedRow__Card-text">{graphData.totalProfitETH} ETH</div>
                              <div className="AssetBoxedRow__Card-button-group">
                                  <ButtonGroup size="small">
                                      <Button
                                        type={profitChartView === 'weekly' && this.state.chartBoxView === "profit" ? 'primary' : undefined}
                                        onClick={() => this.displayProfit('weekly')}
                                      >
                                        1W
                                      </Button>
                                      <Button
                                        type={profitChartView === 'monthly' && this.state.chartBoxView === "profit" ? 'primary' : undefined}
                                        onClick={() => this.displayProfit('monthly')}
                                      >
                                        1M
                                      </Button>
                                      <Button
                                        type={profitChartView === 'yearly' && this.state.chartBoxView === "profit" ? 'primary' : undefined}
                                        onClick={() => this.displayProfit('yearly')}
                                      >
                                        1Y
                                      </Button>
                                  </ButtonGroup>
                              </div>
                          </div>
                          <div className="AssetBoxedRow__Card">
                              <div className="AssetBoxedRow__Card-title">Collateral</div>
                              <div className="AssetBoxedRow__Card-text--is-blue">{formatMonetaryValue(collateral * mybit.price)}</div>
                              <div className="AssetBoxedRow__Card-text">{Number(collateral).toLocaleString('en-US', {maximumFractionDigits: 4})} MYB</div>
                              <div className="AssetBoxedRow__Card-button">
                                  <Button type="secondary" onClick={this.displayCollateral}>View</Button>
                              </div>
                          </div>
                          <div className="AssetBoxedRow__Card">
                              <div className="AssetBoxedRow__Card-title-rows">Supporting documents</div>
                              <div className="AssetBoxedRow__Card-documents">
                                {filesToRender}
                              </div>
                          </div>
                      </div>
                      <div className="ManagedAsset__graphics">
                          {this.state.chartBoxView === "profit" && (
                            <div className="ManagedAsset__chart-container">
                              <Bizcharts.Chart height={400} data={dv} scale={cols}>
                                <Bizcharts.Legend />
                                <Bizcharts.Axis name="month" />
                                <Bizcharts.Axis name="currency" label={{formatter: val => `${formatMonetaryValue(val)}`}}/>
                                <Bizcharts.Tooltip crosshairs={{type : "y"}}/>
                                <Bizcharts.Geom type="line" position="month*currency" size={2} color={'profit'} />
                                <Bizcharts.Geom type='point' position="month*currency" size={4} shape={'circle'} color={'profit'} style={{ stroke: '#fff', lineWidth: 1}} />
                              </Bizcharts.Chart>
                            </div>
                          )}
                          {this.state.chartBoxView === "collateral" && (
                              <div className="ManagedAsset__collateral-container">
                                  <div className="ManagedAsset__collateral-title">
                                      Asset collateral
                                  </div>
                                  <div className="ManagedAsset__collateral-description">
                                      Once asset revenue supasses the asset value you can withdraw your asset collateral.
                                  </div>
                                  <div className="ManagedAsset__collateral-bars">
                                    {this.state.collateralData.map((info, index) => {
                                      const {
                                        withdrawable,
                                        current,
                                        required,
                                        paidOut
                                      } = info;

                                      const percentage = 25 * (index + 1);
                                      const minValBar = (amountToBeRaisedInUSD / 4) * index;
                                      const barPercentage = ((current-minValBar) * 172) / (required - minValBar);
                                      let text = 'Ready to withdraw';
                                      if(paidOut){
                                        text = 'Paid out';
                                      }
                                      else if(current !== required){
                                        text = `${formatMonetaryValue(current)}/${formatMonetaryValue(required)}`;
                                      }
                                      return(
                                       <div className="ManagedAsset__collateral-bars-column" key={minValBar}>
                                          <div className="ManagedAsset__collateral-bars-column-percentage">{percentage}%</div>
                                          <div percentage={`${barPercentage}px`}>
                                            <div className="CollateralBar_percentage" />
                                          </div>
                                          <div className="ManagedAsset__collateral-bars-column-status">{text}</div>
                                          <div className="ManagedAsset__collateral-bars-column-button">
                                            <TooltipAnt
                                                title={`Once asset revenue reaches $${required} you can withdraw (${percentage}% of collateral) MYB.`}
                                            >
                                              <Button
                                                loading={isLoading && withdrawable ? true : false}
                                                type="primary"
                                                disabled={isWithdrawingCollateral}
                                                onClick={withdrawCollateral}
                                              >
                                                {(isWithdrawingCollateral && withdrawable) ? 'Withdrawing' : 'Withdraw'}
                                              </Button>
                                            </TooltipAnt>
                                          </div>
                                        </div>
                                      )})}
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              </div>*/}
          </div>
        )
    }
}

export default ManageAsset;
