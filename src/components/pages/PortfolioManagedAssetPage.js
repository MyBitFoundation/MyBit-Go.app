import React from 'react';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';
import TooltipAnt from 'antd/lib/tooltip';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'
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
import {Chart, Axis, Legend, Geom, Tooltip} from "bizcharts";
import { formatMonetaryValue } from '../../util/helpers';
import * as Brain from '../../apis/brain';
import {
  getDayInText,
  getMonthInText,
} from '../../constants';
dayjs.extend(isBetween)

const ButtonGroup = Button.Group;

const fromWeiToEth = weiValue => Number(window.web3js.utils.fromWei(weiValue, 'ether'));

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
          profitChartView: 'weekly',
        };
        this.asset = undefined;
        this.getDataForAsset = this.getDataForAsset.bind(this);
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

    shouldComponentUpdate(nextProps, nextState){
      if(this.props.loading.assets && !nextProps.loading.assets){
        return true;
      }
      if(!this.state.revenueData && nextState.revenueData){
        return true;
      }
      const { assetId } = this.props.match.params;
      const asset = nextProps.assets.find(({ assetID }) => assetID === assetId);
      if(this.asset && asset && (this.asset.assetIncome !== asset.assetIncome)){
        console.log("HEREEEEEE")
        console.log(this.asset.assetIncome)
        console.log(asset.assetIncome)
        this.asset = asset;
        this.getDataForAsset(asset);
        return true;
      }
      if(this.state.profitChartView !== nextState.profitChartView){
        return true;
      }
      if(this.props.withdrawingCollateral !== nextProps.withdrawingCollateral){
        return true;
      }
      if(this.state.daysSinceItWentLive !== nextState.daysSinceItWentLive){
        return true;
      }
      if(this.state.chartBoxView !== nextState.chartBoxView){
        return true;
      }
      if(this.props.withdrawingAssetManager !== nextProps.withdrawingAssetManager){
        return true;
      }
      if(this.state.toWithdraw !== nextState.toWithdraw){
        return true;
      }
      return false;
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
          blockNumberitWentLive,
          assetManager,
        } = asset;

        const mybitPrice = this.props.prices.mybit.price;
        const collateralUSD = collateral * mybitPrice;

        // calculate collateral data to be displayed
        let [unlockedEscrow, remainingEscrow] = await Promise.all([await Brain.unlockedEscrow(asset.assetID), await Brain.remainingEscrow(asset.assetID)]);
        unlockedEscrow = window.web3js.utils.fromWei(unlockedEscrow, 'ether');
        remainingEscrow = window.web3js.utils.fromWei(remainingEscrow, 'ether');
        const percentageWithdrawn = remainingEscrow !== collateral ? 100 - ((remainingEscrow * 100) / collateral) : 0;
        const percentageWithdrawableCollateralUsd = ((assetIncome * 100) / amountToBeRaisedInUSD) / 100;
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
            if(percentageWithdrawableCollateralUsd < maxValue && percentageWithdrawableCollateralUsd > minValue){
              current = percentageWithdrawableCollateralUsd * amountToBeRaisedInUSD;
            }
            collateralData.push({
              withdrawable: false,
              current,
              required,
            })
          }
        }

        // calculate asset manager profits
        const assetManagerProfits = [];
        const revenueRawData = await Brain.fetchRevenueLogsByAssetId(asset.assetID);
        const revenueData = revenueRawData.map( revenue => {
          return {
            amount: fromWeiToEth(revenue.amount),
            date: dayjs(revenue.timestamp * 1000),
          }
        })

        let daysSinceItWentLive = 1;

        if(blockNumberitWentLive){
          const blockInfo = await window.web3js.eth.getBlock(blockNumberitWentLive);
          const timestamp = blockInfo.timestamp;

          daysSinceItWentLive = dayjs().diff(dayjs(timestamp * 1000), 'day');
          daysSinceItWentLive = daysSinceItWentLive === 0 ? 1 : daysSinceItWentLive;
        }

        //calculate how much the asset manager can withdraw
        const [totalIncome, totalWithdrawn] = await Promise.all([Brain.getManagerIncomeEarned(assetManager, asset.assetID), Brain.getManagerIncomeWithdraw(assetManager, asset.assetID)]);

        //set the state with the calculated data
        this.setState({
          loading: false,
          assetManagerProfits,
          collateralData,
          revenueData,
          daysSinceItWentLive,
          toWithdraw: totalIncome - totalWithdrawn,
        })
      }catch(err){
        console.log(err)
      }
      if(cb){
        cb();
      }
    }

    getWeeklyData(managerPercentage){
      const etherPrice = this.props.prices.ether.price;
      const dataWeekly = [];
      let currentDay = dayjs().day();
      const minDate = dayjs().subtract(7, 'day').set('hour', 0).set('minute', 0).set('second', 0);
      const maxDate = dayjs();
      const assetsFiltered = this.state.revenueData.filter(({date}) => date.isBetween(minDate, maxDate));
      let totalProfit = 0;
      for(let i = 0; i < 7; i++){
        const revenueFilteredByDay =
          this.state.revenueData
            .filter(({date}) => date.day() === currentDay);

        const data = {
          month: getDayInText(currentDay),
        }

        let managerFee = 0;
        let assetRevenue = 0;

        for(let revenue of revenueFilteredByDay){
          const totalRevenue = revenue.amount;
          managerFee += totalRevenue * (managerPercentage / 100);
          assetRevenue += totalRevenue;
        }

        data['Asset Revenue'] = Number((assetRevenue * etherPrice).toFixed(2));
        data['Manager Fee'] = Number((managerFee * etherPrice).toFixed(2));

        totalProfit += (managerFee * etherPrice);
        dataWeekly.push(data);

        currentDay-=1;
        if(currentDay === -1){
          currentDay = 6;
        }
      }

      dataWeekly.reverse();

      return {
        data: dataWeekly,
        totalProfitUSD: totalProfit,
        totalProfitETH: (totalProfit / etherPrice).toFixed(4)
      };
    }

    getMonthlyData(managerPercentage){
      const etherPrice = this.props.prices.ether.price;
      const dataMonthly = [];
      let totalProfit = 0;
      let currentDay = dayjs();
      const minDate = dayjs().subtract(31, 'day').set('hour', 0).set('minute', 0).set('second', 0);
      const maxDate = dayjs();
      const assetsFiltered = this.state.revenueData.filter(({date}) => date.isBetween(minDate, maxDate));
      for(let i = 0; i < 30; i++){

        const revenueFilteredByDayAndMonth =
          this.state.revenueData
            .filter(({date}) => date.date() === currentDay.date() && date.month() === currentDay.month());

        const data = {
          month: `${currentDay.date()}`,
        }

        let managerFee = 0;
        let assetRevenue = 0;

        for(let revenue of revenueFilteredByDayAndMonth){
          const totalRevenue = revenue.amount;
          managerFee += totalRevenue * (managerPercentage / 100);
          assetRevenue += totalRevenue;
        }

        data['Asset Revenue'] = Number((assetRevenue * etherPrice).toFixed(2));
        data['Manager Fee'] = Number((managerFee * etherPrice).toFixed(2));

        totalProfit += (managerFee * etherPrice);

        dataMonthly.push(data);

        currentDay = currentDay.subtract(1, 'day');
      }

      dataMonthly.reverse();

      return {
        data: dataMonthly,
        totalProfitUSD: totalProfit,
        totalProfitETH: (totalProfit / etherPrice).toFixed(4)
      };
    }

    getYearlyData(managerPercentage){
      const etherPrice = this.props.prices.ether.price;
      const dataYearly = [];
      let totalProfit = 0;
      let currentDay = dayjs();
      const minDate = dayjs().subtract(12, 'month').set('hour', 0).set('minute', 0).set('second', 0);
      const maxDate = dayjs();
      const assetsFiltered = this.state.revenueData.filter(({date}) => date.isBetween(minDate, maxDate));
      for(let i = 0; i < 12; i++){

        const revenueFilteredByDayAndMonth =
          this.state.revenueData
            .filter(({date}) => date.month() === currentDay.month());

        const data = {
          month: `${getMonthInText(currentDay.month())}`,
        }

        let managerFee = 0;
        let assetRevenue = 0;

        for(let revenue of revenueFilteredByDayAndMonth){
          const totalRevenue = revenue.amount;
          managerFee += totalRevenue * (managerPercentage / 100);
          assetRevenue += totalRevenue;
        }

        data['Asset Revenue'] = Number((assetRevenue * etherPrice).toFixed(2));
        data['Manager Fee'] = Number((managerFee * etherPrice).toFixed(2));

        totalProfit += (managerFee * etherPrice);

        dataYearly.push(data);

        currentDay = currentDay.subtract(1, 'month');
      }

      dataYearly.reverse();

      return {
        data: dataYearly,
        totalProfitUSD: totalProfit,
        totalProfitETH: (totalProfit / etherPrice).toFixed(4)
      };
    }

    displayProfit(type) {
      this.setState({ chartBoxView: "profit", profitChartView: type });
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
          withdrawingAssetManager,
        } = this.props;

        const componentLoading = this.state.loading;
        const {
          revenueData,
          profitChartView,
          collateralData,
          daysSinceItWentLive,
          toWithdraw,
        } = this.state;

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
        collateralData.forEach((data, index) => {
          if(data.paidOut){
            alreadyWithdrawn += 1;
          }
          else if(data.withdrawable){
            withdrawMax = (collateral / 4) * (index + 1 - alreadyWithdrawn);
            percentageMax = 25 * (index + 1 - alreadyWithdrawn);
          }
        })

        let graphData;
        if(profitChartView === 'weekly'){
          graphData = this.getWeeklyData(managerPercentage);
        } else if(profitChartView === 'monthly'){
          graphData = this.getMonthlyData(managerPercentage);
        } else if(profitChartView === 'yearly'){
          graphData = this.getYearlyData(managerPercentage);
        }

        const ds = new window.DataSet();
        const dv = ds.createView().source(graphData.data);
        dv.transform({
          type: 'fold',
          fields: [ 'Manager Fee', 'Asset Revenue' ],
          key: 'profit',
          value: 'currency',
        });
        const cols = {
          month: {
            range: [ 0, 1 ]
          }
        }

        const averageProfitUSD = profitUSD / daysSinceItWentLive;
        const averageProfitETH = (profitETH / daysSinceItWentLive).toFixed(4);

        const toWithdrawETH = window.web3js.utils.fromWei(toWithdraw.toString(), 'ether');
        const toWithdrawUSD = formatMonetaryValue(toWithdrawETH * etherPrice);
        const isLoadingWithdraw = this.props.withdrawingAssetManager.includes(asset.assetID);

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
                                      disabled={toWithdrawETH === 0}
                                      loading={isLoadingWithdraw}
                                      onClick={() => this.props.withdrawProfitAssetManager(asset, toWithdrawUSD, (cb) => {
                                        this.getDataForAsset(this.asset, cb);
                                      })}
                                    >
                                      {isLoadingWithdraw ? 'Withdrawing' : 'Withdraw'}
                                    </Button>
                                </div>
                            </div>
                        </EqualBoxes>
                    </div>
                    <div className="ManagedAsset__content-column">
                        <EqualBoxesWithShadow>
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
                                <div className="AssetBoxedRow__Card-text--is-blue">{formatMonetaryValue(collateral * mybitPrice)}</div>
                                <div className="AssetBoxedRow__Card-text">{Number(collateral).toLocaleString('en-US', {maximumFractionDigits: 4})} MYB</div>
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
                                <Chart height={400} data={dv} scale={cols}>
                                  <Legend />
                                  <Axis name="month" />
                                  <Axis name="currency" label={{formatter: val => `${formatMonetaryValue(val)}`}}/>
                                  <Tooltip crosshairs={{type : "y"}}/>
                                  <Geom type="line" position="month*currency" size={2} color={'profit'} />
                                  <Geom type='point' position="month*currency" size={4} shape={'circle'} color={'profit'} style={{ stroke: '#fff', lineWidth: 1}} />
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
                                              <TooltipAnt
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
                                              </TooltipAnt>
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
