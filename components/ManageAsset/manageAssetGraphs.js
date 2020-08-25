import React from 'react';
import {
  Button,
} from 'antd';
import isBetween from 'dayjs/plugin/isBetween';
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
import {
  DEFAULT_TOKEN,
  DEFAULT_TOKEN_MAX_DECIMALS,
  getPlatformToken,
} from 'constants/app';
import { useMetamaskContext } from 'components/MetamaskContext';

let Bizcharts;
if (typeof window !== 'undefined') {
  Bizcharts = require('bizcharts');
}

const ButtonGroup = Button.Group;

dayjs.extend(isBetween);

const ManageAssetGraphs = ({
  chartBoxView,
  revenueData,
  profitChartView,
  managerPercentage,
  displayProfit,
  displayCollateral,
  assetManagerCollateral,
  collateralData,
  fundingGoal,
  isWithdrawingCollateral,
  withdrawCollateral,
}) => {
  const { network } = useMetamaskContext();
  const graphData = getTimeFilteredData(managerPercentage, revenueData, profitChartView);

  const ds = new window.DataSet();
  const dv = ds.createView().source(graphData.data);
  dv.transform({
    type: 'fold',
    fields: ['Manager Fee', 'Asset Revenue'],
    key: 'profit',
    value: 'currency',
  });
  const cols = {
    month: {
      range: [0, 1],
    },
  };

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
            {formatMonetaryValue(graphData.totalProfit)}
          </ManageAssetColoredValue>
          <ButtonGroup size="small">
            <Button
              type={profitChartView === 'weekly' && chartBoxView === 'profit' ? 'primary' : undefined}
              onClick={() => displayProfit('weekly')}
            >
              1W
            </Button>
            <Button
              type={profitChartView === 'monthly' && chartBoxView === 'profit' ? 'primary' : undefined}
              onClick={() => displayProfit('monthly')}
            >
              1M
            </Button>
            <Button
              type={profitChartView === 'yearly' && chartBoxView === 'profit' ? 'primary' : undefined}
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
              {formatMonetaryValue(assetManagerCollateral, getPlatformToken(network))}
            </ManageAssetColoredValue>
            <br />
          </div>
          <Button type="secondary" onClick={displayCollateral}>View & Withdraw</Button>
        </ManageAssetRectangleContainer>
      </ManageAssetCustomRow>
      {chartBoxView === 'profit' && (
      <ManageAssetRectangleContainer
        height="322px"
        isFullWidth
        hasShadow
      >
        <ReactResizeDetector handleWidth>
          {(width, height) => {
            let widthOfChart = width;
            if (widthOfChart > 500) {
              widthOfChart = 500;
            }
            const heightOfChart = Math.round(widthOfChart / 1.639751);
            return (
              <ManageAssetChartWrapper>
                <Bizcharts.Chart height={heightOfChart} width={widthOfChart} data={dv} scale={cols}>
                  <Bizcharts.Legend />
                  <Bizcharts.Axis name="month" />
                  <Bizcharts.Axis name="currency" label={{ formatter: val => `${formatMonetaryValue(val)}` }} />
                  <Bizcharts.Tooltip crosshairs={{ type: 'y' }} />
                  <Bizcharts.Geom type="line" position="month*currency" size={2} color="profit" />
                  <Bizcharts.Geom type="point" position="month*currency" size={4} shape="circle" color="profit" style={{ stroke: '#fff', lineWidth: 1 }} />
                </Bizcharts.Chart>
              </ManageAssetChartWrapper>
            );
          }}
        </ReactResizeDetector>
      </ManageAssetRectangleContainer>
      )}
      {chartBoxView === 'collateral' && (
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
            fundingGoal={fundingGoal}
          />
        </ManageAssetRectangleContainer>
      )}
    </React.Fragment>
  );
};

export default ManageAssetGraphs;

const getTimeFilteredData = (managerPercentage, revenueData, type) => {
  let iterator; let
    typeOfDate;
  switch (type) {
    case 'weekly':
      typeOfDate = 'day',
      iterator = 7;
      break;
    case 'monthly':
      typeOfDate = 'day',
      iterator = 30;
      break;
    case 'yearly':
      typeOfDate = 'month',
      iterator = 12;
      break;
  }
  let minDate = dayjs().subtract(iterator, typeOfDate).set('hour', 24).set('minute', 0)
    .set('second', 0);
  if (type == 'yearly') {
    minDate = dayjs().subtract(iterator, typeOfDate).set('month', minDate.month() + 1);
  }
  const dataToReturn = [];
  let totalProfit = 0;
  const maxDate = dayjs();
  let currentDay = minDate;
  const revenueFiltered = revenueData.filter(({ date }) => date.isBetween(minDate, maxDate));
  for (let i = 0; i < iterator; i++) {
    const revenueFilteredByTime = revenueFiltered
      .filter(({ date }) => {
        if (type === 'weekly') {
          return date.date() === currentDay.date();
        } if (type === 'monthly') {
          return date.date() === currentDay.date();
        } if (type === 'yearly') {
          return date.month() === currentDay.month();
        }
      });

    const data = {};
    if (type === 'weekly') {
      data['month'] = getDayInText(currentDay.day());
    } else if (type === 'monthly') {
      data['month'] = i + 1;
    } else if (type === 'yearly') {
      data['month'] = `${getMonthInText(currentDay.month())}`;
    }

    let managerFee = 0;
    let assetRevenue = 0;

    for (const revenue of revenueFilteredByTime) {
      const totalRevenue = Number(revenue.amount);
      managerFee += totalRevenue * managerPercentage;
      assetRevenue += totalRevenue;
    }

    data['Asset Revenue'] = Number((assetRevenue).toFixed(DEFAULT_TOKEN_MAX_DECIMALS));
    data['Manager Fee'] = Number((managerFee).toFixed(DEFAULT_TOKEN_MAX_DECIMALS));

    totalProfit += managerFee;

    dataToReturn.push(data);
    currentDay = currentDay.add(1, typeOfDate);
  }

  return {
    data: dataToReturn,
    totalProfit,
  };
};
