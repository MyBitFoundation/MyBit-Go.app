import React from 'react';
import {
  Slider,
  InputNumber,
} from 'antd';
import {
  DEFAULT_TOKEN,
} from 'constants';
import {
  formatMonetaryValue,
} from 'utils/helpers';
import NumericInput from 'ui/NumericInput';
import StyledAssetCalculatorTitle from './styledAssetCalculatorTitle';
import StyledAssetCalculatorEqualsSeparator from './styledAssetCalculatorEqualsSeparator';
import StyledAssetCalculatorMinLabel from './styledAssetCalculatorMinLabel';
import StyledAssetCalculatorMaxLabel from './styledAssetCalculatorMaxLabel';
import StyledAssetCalculatorLabel from './styledAssetCalculatorLabel';
import StyledAssetCalculatorSeparator from './styledAssetCalculatorSeparator';
import StyledAssetCalculatorValue from './styledAssetCalculatorValue';
import StyledAssetCalculatorSpin from './styledAssetCalculatorSpin';

const AssetCalculator = ({
  handleOnChangeEthValue,
  handleOnChangePercentage,
  handleOnChangeSlider,
  selectedAmountEth,
  fundingGoal,
  maxInvestment,
  minInvestment,
  selectedOwnership,
  daysToGo,
  ended,
  yourContribution,
  yourOwnership,
  maxOwnership,
  loadingUserInfo,
  userInvestment,
}) => {
  console.log("maxOwnership: ", maxOwnership);
  console.log("selectedAmountEth: ", selectedAmountEth)
  console.log("fundingGoal: ", fundingGoal)
  console.log("yourOwnership: ", yourOwnership);
  console.log("yourContribution: ", yourContribution);
  console.log("maxInvestment: ", maxInvestment);
  console.log("minInvestment: ", minInvestment);
  console.log("selectedOwnership: ", selectedOwnership)
  console.log("ended: ", ended);
  console.log("daysToGo: ", daysToGo);
  return(
    <React.Fragment>
      <StyledAssetCalculatorTitle>
        {ended ? 'Your investment' : 'Calculate your investment'}
      </StyledAssetCalculatorTitle>
      {!ended && (
        <React.Fragment>
          <div style={{display: 'flex'}}>
            <NumericInput
              placeholdertext={`Amount in ${DEFAULT_TOKEN}`}
              value={selectedAmountEth}
              label={DEFAULT_TOKEN}
              onChange={number =>
                handleOnChangeEthValue(number, maxInvestment, fundingGoal)}
              min={0}
              precision={2}
            />
            <StyledAssetCalculatorEqualsSeparator>
              =
            </StyledAssetCalculatorEqualsSeparator>
            <NumericInput
              placeholdertext="Amount %"
              value={selectedOwnership}
              min={0}
              label="%"
              onChange={number => handleOnChangePercentage(number, maxOwnership, fundingGoal, maxInvestment)}
              precision={2}
            />
          </div>
          <Slider
            id="slider"
            step={0.01}
            defaultValue={0}
            value={
              selectedAmountEth ?
                Number(selectedAmountEth) >= minInvestment
                  ? Number(selectedAmountEth)
                  : minInvestment
                : 0
            }
            min={minInvestment}
            max={maxInvestment}
            onChange={number => handleOnChangeSlider(number, fundingGoal)}
            disabled={daysToGo < 0 || maxInvestment === 0}
          />
          <StyledAssetCalculatorMinLabel>
          Min. <b>{formatMonetaryValue(minInvestment)}</b>
          </StyledAssetCalculatorMinLabel>
          <StyledAssetCalculatorMaxLabel>
          Max. <b>{formatMonetaryValue(maxInvestment)}</b>
          </StyledAssetCalculatorMaxLabel>
        </React.Fragment>
      )}
      <StyledAssetCalculatorLabel
        ended={ended}
        paddedTop
      >
        Your contribution:
      </StyledAssetCalculatorLabel>
      <StyledAssetCalculatorValue>
        {(loadingUserInfo && ended) && (
          <StyledAssetCalculatorSpin />
        )}
        {(loadingUserInfo && ended) ? null : ended ? formatMonetaryValue(parseFloat(userInvestment)) : selectedAmountEth ? formatMonetaryValue(parseFloat(selectedAmountEth)) : 0}
      </StyledAssetCalculatorValue>
      <div>
        <StyledAssetCalculatorLabel>
          Your ownership:
        </StyledAssetCalculatorLabel>
        <StyledAssetCalculatorValue>
          {(loadingUserInfo && ended) && (
            <StyledAssetCalculatorSpin />
          )}
          {(loadingUserInfo && ended) ? null : ended ? yourOwnership * 100 : selectedAmountEth ? selectedOwnership : 0}%
        </StyledAssetCalculatorValue>
      </div>
    </React.Fragment>
  )
}

export default AssetCalculator;
