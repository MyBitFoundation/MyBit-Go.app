import React from 'react';
import {
  Button,
} from 'antd';
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from 'dayjs';
import ReactResizeDetector from 'react-resize-detector';
import ManageAssetColoredValue from './manageAssetColoredValue';
import ManageAssetCustomRow from './manageAssetCustomRow';
import ManageAssetRectangleContainer from './manageAssetRectangleContainer';
import ManageAssetChartWrapper from './manageAssetChartWrapper';
import {
  getDayInText,
  getMonthInText,
  formatMonetaryValue,
} from 'utils/helpers';
import WithdrawCollateral from 'components/WithdrawCollateral';
let Bizcharts;
if(typeof window !== 'undefined'){
  Bizcharts = require('bizcharts');
}

const ButtonGroup = Button.Group;

dayjs.extend(isBetween)

const ManageAssetGraphs = ({
  chartBoxView,
  revenueData,
  profitChartView,
  managerPercentage,
  ethereumPrice,
  mybitPrice,
  displayProfit,
  displayCollateral,
  collateral,
  collateralData,
  amountToBeRaisedInUSD,
  isWithdrawingCollateral,
  withdrawCollateral,
}) => {

  let graphData = getTimeFilteredData(managerPercentage, ethereumPrice, revenueData, profitChartView);

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

  return (
    <React.Fragment>
      <ManageAssetCustomRow>
        <ManageAssetRectangleContainer
          hasShadow
        >
          <b>Profit</b>
          <ManageAssetColoredValue
            isGreen
          >
            {formatMonetaryValue(graphData.totalProfitUSD)}
          </ManageAssetColoredValue>
          <b>{graphData.totalProfitETH}{' '}ETH</b>
          <ButtonGroup size="small">
            <Button
              type={profitChartView === 'weekly' && chartBoxView === "profit" ? 'primary' : undefined}
              onClick={() => displayProfit('weekly')}
            >
              1W
            </Button>
            <Button
              type={profitChartView === 'monthly' && chartBoxView === "profit" ? 'primary' : undefined}
              onClick={() => displayProfit('monthly')}
            >
              1M
            </Button>
            <Button
              type={profitChartView === 'yearly' && chartBoxView === "profit" ? 'primary' : undefined}
              onClick={() => displayProfit('yearly')}
            >
              1Y
            </Button>
        </ButtonGroup>
        </ManageAssetRectangleContainer>
        <ManageAssetRectangleContainer
          hasShadow
        >
          <b>Collateral</b>
          <div>
            <ManageAssetColoredValue
              isBlue
            >
              {formatMonetaryValue(collateral * mybitPrice)}
            </ManageAssetColoredValue>
            <br />
            <b>{Number(collateral).toLocaleString('en-US', {maximumFractionDigits: 4})}{' '}MYB</b>
          </div>
          <Button type="secondary" onClick={displayCollateral}>View</Button>
        </ManageAssetRectangleContainer>
      </ManageAssetCustomRow>
      {chartBoxView === "profit" && (
      <ManageAssetRectangleContainer
        height="322px"
        isFullWidth
        hasShadow
      >
        <ReactResizeDetector handleWidth>
          {(width, height) => {
            let widthOfChart = width;
            if(widthOfChart > 500){
              widthOfChart = 500;
            }
            const heightOfChart = Math.round(widthOfChart / 1.639751);
            return (
              <ManageAssetChartWrapper>
                <Bizcharts.Chart height={heightOfChart} width={widthOfChart} data={dv} scale={cols}>
                  <Bizcharts.Legend />
                  <Bizcharts.Axis name="month" />
                  <Bizcharts.Axis name="currency" label={{formatter: val => `${formatMonetaryValue(val)}`}}/>
                  <Bizcharts.Tooltip crosshairs={{type : "y"}}/>
                  <Bizcharts.Geom type="line" position="month*currency" size={2} color={'profit'} />
                  <Bizcharts.Geom type='point' position="month*currency" size={4} shape={'circle'} color={'profit'} style={{ stroke: '#fff', lineWidth: 1}} />
                </Bizcharts.Chart>
              </ManageAssetChartWrapper>
            )
          }}
        </ReactResizeDetector>
      </ManageAssetRectangleContainer>
      )}
      {chartBoxView === "collateral" && (
        <ManageAssetRectangleContainer
          hasShadow
          isFullWidth
          height="auto"
          isLeftAligned
        >
          <WithdrawCollateral
            collateralData={collateralData}
            isWithdrawingCollateral={isWithdrawingCollateral}
            withdrawCollateral={withdrawCollateral}
            amountToBeRaisedInUSD={amountToBeRaisedInUSD}
          />
        </ManageAssetRectangleContainer>
      )}
    </React.Fragment>
  )
}

export default ManageAssetGraphs;

const getTimeFilteredData = (managerPercentage, etherPrice, revenueData, type) => {
  let minDate, iterator, subtract;
  switch (type) {
    case 'weekly':
      subtract= 'day',
      iterator = 7;
      minDate = dayjs().subtract(iterator, 'day').set('hour', 0).set('minute', 0).set('second', 0);
      break;
    case 'monthly':
      subtract= 'day',
      iterator = 30;
      minDate = dayjs().subtract(iterator, 'day').set('hour', 0).set('minute', 0).set('second', 0);
      break;
    case 'yearly':
      subtract= 'month',
      iterator = 12;
      minDate = dayjs().subtract(iterator, 'month').set('hour', 0).set('minute', 0).set('second', 0);
      break;
  }

  const dataToReturn = [];
  let totalProfit = 0;
  let currentDay = dayjs();
  const maxDate = dayjs();
  const revenueFiltered = revenueData.filter(({date}) => date.isBetween(minDate, maxDate));
  for(let i = iterator; iterator > 0; iterator --){
    const revenueFilteredByTime = revenueFiltered
        .filter(({date}) => {
          if(type === 'weekly') {
            return date.day() === currentDay;
          } else if(type === 'monthly'){
            return date.date() === currentDay.date();
          } else if(type === 'yearly'){
            return date.month() === currentDay.month();
          }
        });

    let data = {}
    if(type === 'weekly'){
      data['month'] = getDayInText(currentDay.day());
    } else if(type === 'monthly'){
      data['month'] = iterator;
    } else if(type === 'yearly'){
      data['month'] = `${getMonthInText(currentDay.month())}`;
    }

    let managerFee = 0;
    let assetRevenue = 0;

    for(const revenue of revenueFilteredByTime){
      const totalRevenue = Number(revenue.amount);
      managerFee += totalRevenue * (managerPercentage / 100);
      assetRevenue += totalRevenue;
    }

    data['Asset Revenue'] = Number((assetRevenue * etherPrice).toFixed(2));
    data['Manager Fee'] = Number((managerFee * etherPrice).toFixed(2));

    totalProfit += (managerFee * etherPrice);

    dataToReturn.push(data);
    currentDay = currentDay.subtract(1, subtract);
  }

  dataToReturn.reverse();

  return {
    data: dataToReturn,
    totalProfitUSD: totalProfit,
    totalProfitETH: (totalProfit / etherPrice).toFixed(4)
  };
}
