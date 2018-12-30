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
import { formatMonetaryValue } from '../../util/helpers';
import * as Brain from '../../apis/brain';

const ButtonGroup = Button.Group;

class PortfolioManagedAssetPage extends React.Component {
    constructor(props) {
        super(props);
        this.displayProfit = this.displayProfit.bind(this);
        this.displayCollateral = this.displayCollateral.bind(this);
        this.getDataForAsset = this.getDataForAsset.bind(this);
        this.startProcessingAsset = this.startProcessingAsset.bind(this);
        this.state = {
          chartBoxView: "profit",
          loading: true,
        };
        this.asset = undefined;
    }

    componentDidMount(){
      if(!this.props.loading.assets){
        this.startProcessingAsset(this.props);
      }
    }

    componentWillReceiveProps(nextProps){
      // once the assets are loaded up we can start crunching the data
      if(this.props.loading.assets && !nextProps.loading.assets){
        this.startProcessingAsset(nextProps);
      }
    }

    startProcessingAsset(props){
      const { assetId } = this.props.match.params;
      const asset = props.assets.find(({ assetID }) => assetID === assetId);
      if(asset){
        this.asset = asset;
        this.getDataForAsset(asset);
      } else {
        this.setState({
          loading: false,
        })
      }
    }

    async getDataForAsset(asset, cb){
      try{
        const {
          collateral,
          amountToBeRaisedInUSD,
          assetIncome,
        } = asset;
        console.log(asset)

        const mybitPrice = this.props.prices.mybit.price;
        const collateralUSD = collateral * mybitPrice;

        // calculate collateral data to be displayed
        const collateralUSDPart = collateralUSD / 4;
        const collateralPart = collateral / 4;

        const unlockedEscrow = window.web3js.utils.fromWei(await Brain.unlockedEscrow(asset.assetID), 'ether');
        const remainingEscrow = window.web3js.utils.fromWei(await Brain.remainingEscrow(asset.assetID), 'ether');
        const percentageWithdrawn = remainingEscrow !== collateral ? 100 - ((remainingEscrow * 100) / collateral) : 0;
        console.log("collateral", collateral)
        console.log("percentageWithdrawn: ", percentageWithdrawn)
        console.log("remainingEscrow: ", remainingEscrow)
        console.log("unlockedEscrow: ", unlockedEscrow)
        console.log("assetIncome: ", assetIncome)
        const percentageWithdrawableCollateralUsd = ((assetIncome * 100) / amountToBeRaisedInUSD) / 100;
        console.log(percentageWithdrawableCollateralUsd)
        let counter = 4;
        const collateralData = [];
        for(let i = 1; i < 5; i++){
          const required = (25 * i)/100 * amountToBeRaisedInUSD;

          if(percentageWithdrawableCollateralUsd >= (25 * i) / 100){
            const withdrawable = ((25 * i) > percentageWithdrawn);
            collateralData.push({
              withdrawable,
              current: required,
              required,
              paidOut: !withdrawable,
            })
          } else {
            let current = 0;
            const minValue = i - 1 === 0 ? 0 : (25 * (i -1))/100;
            const maxValue = (25 * i)/100;
            console.log("min: ", minValue)
            console.log("max: ", maxValue)
            if(percentageWithdrawableCollateralUsd < maxValue && percentageWithdrawableCollateralUsd > minValue){
              current = percentageWithdrawableCollateralUsd * amountToBeRaisedInUSD;
            }
            collateralData.push({
              withdrawable: false,
              current,
              required,
            })
          }
          counter -= 1;
        }

        console.log(collateralData)

        // calculate asset manager profits
        const assetManagerProfits = [];
        const revenueLogs = await Brain.fetchRevenueLogsByAssetId(asset.assetID);
        console.log(revenueLogs)

        //set the state with the calculated data

        this.setState({
          loading: false,
          assetManagerProfits,
          collateralData,
        })
      }catch(err){
        console.log(err)
      }
      if(cb){
        cb();
      }
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
        const isLoading = this.props.withdrawingCollateral.includes(asset.assetID);

        let withdrawMax;
        let percentageMax;

        let alreadyWithdrawn = 0;
        this.state.collateralData.forEach((data, index) => {
          if(data.paidOut){
            alreadyWithdrawn += 1;
          }
          else if(data.withdrawable){
            withdrawMax = (collateral / 4) * (index + 1 - alreadyWithdrawn);
            percentageMax = 25 * (index + 1 - alreadyWithdrawn);
          }
        })

        //console.log(withdrawMax)
        //console.log(percentage)

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
                                <div className="AssetBoxedRow__Card-text">{collateral.toLocaleString('en-US', {maximumFractionDigits: 4})} MYB</div>
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
                                    chart
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
                                            <CollateralBar percentage={`${barPercentage}px`}>
                                              <div className="CollateralBar_percentage" />
                                            </CollateralBar>
                                            <div className="ManagedAsset__collateral-bars-column-status">{text}</div>
                                            <div className="ManagedAsset__collateral-bars-column-button">
                                              <Tooltip
                                                  title={`Once asset revenue reaches $${required} you can withdraw (${percentage}% of collateral) MYB.`}
                                              >
                                                <Button
                                                  loading={isLoading && withdrawable ? true : false}
                                                  type="primary"
                                                  disabled={!withdrawable}
                                                  onClick={() => this.props.withdrawCollateral(asset, percentageMax, withdrawMax, (cb) => {
                                                    this.getDataForAsset(this.asset, cb);
                                                  })}
                                                >
                                                  {(isLoading && withdrawable) ? 'Withdrawing' : 'Withdraw'}
                                                </Button>
                                              </Tooltip>
                                            </div>
                                          </div>
                                        )})}
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
