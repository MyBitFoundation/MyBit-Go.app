import React from 'react';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import Tooltip from 'antd/lib/tooltip';
import {
    ManagedAssetWrapper,
    FlexRowTwoItems,
    AssetValueRow,
    EqualBoxes,
    EqualBoxesWithShadow,
    CollateralBar
} from '../UI/ManagedAssetPage/styledManagedAssetPage'
import LocationIcon from '../../images/Location-blue.svg';
import PieChart from '../../images/chart-pie.png';
import LineChart from '../../images/chart-line.png';
import Fee from '../../images/Fee.png';
import LoadingPage from './LoadingPage';
import {Chart, Axis, Legend, Geom} from "bizcharts";
import { formatMonetaryValue } from '../../util/helpers';
import * as Brain from '../../apis/brain';

const ButtonGroup = Button.Group;

const fromWeiToEth = weiValue => window.web3js.utils.fromWei(weiValue, 'ether');

class PortfolioManagedAssetPage extends React.Component {
    constructor(props) {
        super(props);
        this.displayProfit = this.displayProfit.bind(this);
        this.displayCollateral = this.displayCollateral.bind(this);
        this.state = {
          chartBoxView: "profit",
          revenueData: [],
          loading: true,
        };
        this.asset = undefined;
        this.getDataForAsset = this.getDataForAsset.bind(this);
    }

    componentWillReceiveProps(nextProps){
      // once the assets are loaded up we can start crunching the data
      if(this.props.loading.assets && !nextProps.loading.assets){
        const { assetId } = this.props.match.params;
        const asset = nextProps.assets.find(({ assetID }) => assetID === assetId);
        if(asset){
          this.asset = asset;
          this.getDataForAsset(asset);
        } else {
          this.setState({
            loading: false,
          })
        }
      }
    }

    async getDataForAsset(asset){
      const {
        collateral,
        amountToBeRaisedInUSD,
      } = asset;

      const mybitPrice = this.props.prices.mybit.price;
      const collateralUSD = collateral * mybitPrice;

      // calculate collateral data to be displayed
      const collateralUSDPart = collateralUSD / 4;
      const collateralPart = collateral / 4;

      const unlockedEscrow = await Brain.unlockedEscrow(asset.assetID);
      const percentageWithdrawableCollateral = unlockedEscrow === 0 ? 0 : (unlockedEscrow * 100) / collateral;
      console.log(percentageWithdrawableCollateral)

      const collateralData = [];
      for(let i = 1; i < 5; i++){
        const required = (25 * i)/100 * amountToBeRaisedInUSD;
        if(percentageWithdrawableCollateral >= 25 * i){
          collateralData.push({
            withdrawable: true,
            current: required,
            required,
          })
        } else {
          const x = (25 * i) + (percentageWithdrawableCollateral - (25 * i));
          console.log(x)
          collateralData.push({
            withdrawable: false,
            current: (x / 100) * amountToBeRaisedInUSD,
            required,
          })
        }
      }

      console.log(collateralData)

      // calculate asset manager profits
      const assetManagerProfits = [];
      const revenueRawData = await Brain.fetchRevenueLogsByAssetId(asset.assetID);
      
      const revenueData = revenueRawData.map( revenue => {
          return {
              amount: fromWeiToEth(revenue.amount),
              date: new Date(revenue.timestamp).toLocaleTimeString()
          }
      })
      console.log(revenueData)

      //set the state with the calculated data
      this.setState({
        loading: false,
        assetManagerProfits,
        collateralData,
        revenueData
      })
    }

    displayProfit() {
      this.setState({ chartBoxView: "profit" });
    }

    displayCollateral() {
      this.setState({ chartBoxView: "collateral" });
    }

    render() {
        const {
          match,
          loading,
          user,
          assets,
          prices,
        } = this.props;

        const componentLoading = this.state.loading;
        const { revenueData } = this.state;

        if(loading.assets || componentLoading){
          return(
            <LoadingPage
              message="Loading asset information"
            />
          )
        }

        const { assetId } = match.params;
        const asset = assets.find(({ assetID }) => assetID === assetId);
        const userAddress = user.userName;
        if(!asset){
          return(
            <p>This asset does not exist</p>
          )
        }

        if(!userAddress || (userAddress && (userAddress !== asset.assetManager))){
          return(
            <p>you don't have permissions to view this page.</p>
          )
        }

        const {
          collateral,
          managerPercentage,
          amountToBeRaisedInUSD,
          assetIncome,
          city,
          country,
          name,
          imageSrc,
        } = asset;

        const mybitPrice = prices.mybit.price;
        const etherPrice = prices.ether.price;

        const profitUSD = assetIncome * (managerPercentage / 100);
        const profitETH = (profitUSD / etherPrice).toFixed(4);
        const assetListingUrl = `/explore/${asset.assetID}`;
        console.log(asset)

        return (
            <ManagedAssetWrapper>
                <div className="ManagedAsset__alert-row">
                    <div className="ManagedAsset__back-column">
                       <Link
                          to='/portfolio'
                          href='/portfolio'
                        >
                          <Button>Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="ManagedAsset__content-wrapper">
                    <div className="ManagedAsset__content-column">
                        <FlexRowTwoItems>
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
                        </FlexRowTwoItems>
                        <FlexRowTwoItems>
                            <div><h2 className="ManagedAsset__asset-meta">
                                <LocationIcon className="ManagedAsset__location-icon" />
                                {city}, {country}
                            </h2></div>
                            <div><h2 className="ManagedAsset__asset-meta">Manufacturer company (Partner Name)</h2></div>
                        </FlexRowTwoItems>
                        <div
                            className="ManagedAsset__asset-image"
                            alt="Asset Preview"
                            style={{ backgroundImage: `url(${imageSrc})` }}
                        />
                        <AssetValueRow>
                            <div className="AssetValueRow__Card">
                                <img className="AssetValueRow__Card-img-pie-chart" src={PieChart} alt="Line chart" />
                                Asset Value
                                <div className="AssetValueRow__Card-box-separator" />
                                <b className="AssetValueRow__Card-value--is-blue">${amountToBeRaisedInUSD}</b>
                            </div>
                            <div className="AssetValueRow__Card">
                                <img className="AssetValueRow__Card-img-line-chart" src={LineChart} alt="Line chart" />
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
                        </AssetValueRow>
                        <EqualBoxes>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Total profit</div>
                                <div className="AssetBoxedRow__Card-text--is-green">{formatMonetaryValue(profitUSD)}</div>
                                <div className="AssetBoxedRow__Card-text">{profitETH }ETH</div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Average profit</div>
                                <div className="AssetBoxedRow__Card-text--is-blue">23.77$</div>
                                <div className="AssetBoxedRow__Card-text">0.3 ETH</div>
                                <div className="AssetBoxedRow__Card-text-bottom">Daily</div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title-rows">Available to <br />withdraw</div>
                                <div className="AssetBoxedRow__Card-text--is-green">150.77$</div>
                                <div className="AssetBoxedRow__Card-text">1.3 ETH</div>
                                <div className="AssetBoxedRow__Card-button">
                                    <Button type="primary">Withdraw</Button>
                                </div>
                            </div>
                        </EqualBoxes>
                    </div>
                    <div className="ManagedAsset__content-column">
                        <EqualBoxesWithShadow>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Total profit</div>
                                <div className="AssetBoxedRow__Card-text--is-green">1200.67$</div>
                                <div className="AssetBoxedRow__Card-text">12 ETH</div>
                                <div className="AssetBoxedRow__Card-button-group">
                                    <ButtonGroup size="small">
                                        <Button onClick={this.displayProfit}>1W</Button>
                                        <Button onClick={this.displayProfit}>1M</Button>
                                        <Button onClick={this.displayProfit}>1Y</Button>
                                        <Button onClick={this.displayProfit}>MAX</Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title">Collateral</div>
                                <div className="AssetBoxedRow__Card-text--is-blue">{formatMonetaryValue(collateral * mybitPrice)}</div>
                                <div className="AssetBoxedRow__Card-text">{collateral.toLocaleString('en-US')} MYB</div>
                                <div className="AssetBoxedRow__Card-button">
                                    <Button type="secondary" onClick={this.displayCollateral}>View</Button>
                                </div>
                            </div>
                            <div className="AssetBoxedRow__Card">
                                <div className="AssetBoxedRow__Card-title-rows">Supporting documents</div>
                                <div className="AssetBoxedRow__Card-documents">
                                    <p>property.docx</p>
                                    <p>more_documents.pdf</p>
                                </div>
                            </div>
                        </EqualBoxesWithShadow>
                        <div className="ManagedAsset__graphics">
                            {this.state.chartBoxView === "profit" && (
                                <div className="ManagedAsset__chart-container">
                                    <Chart 
                                        width={550} 
                                        height={420} 
                                        data={revenueData}
                                        >
                                      <Axis name="date" />
                                      <Axis name="amount" />
                                      <Legend position="top" dy={-20} />
                                     <Tooltip crosshairs={{type : "y"}}/>
                                      <Geom type="line" position="date*amount" size={1} />
                                      <Geom type='point' position="date*amount" size={3} shape={'circle'} />
                                    </Chart>
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
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">25%</div>
                                            <CollateralBar percentage="172px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">Ready to withdraw</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Button type="primary">Withdraw</Button>
                                            </div>
                                        </div>
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">50%</div>
                                            <CollateralBar percentage="42px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">$1,859/2,800</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Tooltip
                                                    title="Once asset revenue reaches $4,200 you can withdraw (25% of collateral) MYB."
                                                >
                                                    <Button type="secondary" disabled>Withdraw</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">75%</div>
                                            <CollateralBar percentage="0px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">$0/4,200</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Tooltip
                                                    title="Once asset revenue reaches $4,200 you can withdraw (25% of collateral) MYB."
                                                >
                                                    <Button type="secondary" disabled>Withdraw</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className="ManagedAsset__collateral-bars-column">
                                            <div className="ManagedAsset__collateral-bars-column-percentage">100%</div>
                                            <CollateralBar percentage="0px">
                                                <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">$0/5,600</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                                <Tooltip
                                                    title="Once asset revenue reaches $4,200 you can withdraw (25% of collateral) MYB."
                                                >
                                                    <Button type="secondary" disabled>Withdraw</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ManagedAssetWrapper>
        )
    }
}

export default PortfolioManagedAssetPage;
