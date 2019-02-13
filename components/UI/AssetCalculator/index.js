import React from 'react';
import {
  Slider,
} from 'antd';
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
  handleOnChangeUsdValue,
  handleOnChangePercentage,
  handleOnChangeSlider,
  selectedAmountEth,
  maxEther,
  currentEthInUsd,
  amountToBeRaisedInUSD,
  selectedAmountUsd,
  maxInvestment,
  minInvestment,
  selectedOwnership,
  daysToGo,
  formatMonetaryValue,
  ended,
  yourContributionUsd,
  yourContributionEth,
  yourOwnership,
  maxOwnership,
  loadingUserInfo,
}) => {
  return(
    <React.Fragment>
      <StyledAssetCalculatorTitle>
        {ended ? 'Your investment' : 'Calculate your investment'}
      </StyledAssetCalculatorTitle>
      {!ended && (
        <React.Fragment>
          <div>
            <NumericInput
              style={{ width: '28%' }}
              placeholdertext="Amount in ETH"
              value={selectedAmountEth}
              label="ETH"
              onChange={number =>
                handleOnChangeEthValue(number, maxEther, currentEthInUsd, amountToBeRaisedInUSD)}
              min={0}
              precision={5}
            />
            <StyledAssetCalculatorEqualsSeparator>
              =
            </StyledAssetCalculatorEqualsSeparator>
            <NumericInput
              style={{ width: '28%' }}
              placeholdertext="Amount in USD"
              value={selectedAmountUsd}
              onChange={number => handleOnChangeUsdValue(number, maxInvestment, currentEthInUsd, amountToBeRaisedInUSD)}
              label="$"
              min={0}
              precision={2}
            />
            <StyledAssetCalculatorEqualsSeparator>
              =
            </StyledAssetCalculatorEqualsSeparator>
            <NumericInput
              style={{ width: '28%' }}
              placeholdertext="Amount %"
              value={selectedOwnership}
              min={0}
              label="%"
              onChange={number => handleOnChangePercentage(number, maxOwnership, amountToBeRaisedInUSD, maxEther)}
              precision={2}
            />
          </div>
          <Slider
            id="slider"
            step={0.01}
            defaultValue={0}
            value={
              Number(selectedAmountUsd) >= minInvestment
              ? Number(selectedAmountUsd)
              : minInvestment
            }
            min={minInvestment}
            max={maxInvestment}
            onChange={number => handleOnChangeSlider(number, currentEthInUsd, amountToBeRaisedInUSD)}
            disabled={daysToGo < 0 || maxInvestment === 0}
          />
          <StyledAssetCalculatorMinLabel>
          Min. <b>{formatMonetaryValue(minInvestment).substring(1)} USD</b>
          </StyledAssetCalculatorMinLabel>
          <StyledAssetCalculatorMaxLabel>
          Max. <b>{formatMonetaryValue(maxInvestment).substring(1)} USD</b>
          </StyledAssetCalculatorMaxLabel>
        </React.Fragment>
      )}
      <StyledAssetCalculatorLabel
        ended={ended}
        paddedTop
      >
        Your contribution:
      </StyledAssetCalculatorLabel>
      <StyledAssetCalculatorValue
        paddedRight
      >
        {(loadingUserInfo && ended) && (
          <StyledAssetCalculatorSpin />
        )}
        {(loadingUserInfo && ended) ? null : ended ? formatMonetaryValue(yourContributionUsd) : selectedAmountUsd ? formatMonetaryValue(selectedAmountUsd).substring(1) : 0} USD
      </StyledAssetCalculatorValue>
      <StyledAssetCalculatorSeparator />
      <StyledAssetCalculatorValue>
        {(loadingUserInfo && ended) && (
          <StyledAssetCalculatorSpin />
        )}
        {(loadingUserInfo && ended) ? null : ended ? parseFloat(Number(yourContributionEth).toFixed(5)) : selectedAmountUsd ? parseFloat(Number(selectedAmountEth).toFixed(5)) : 0} ETH
      </StyledAssetCalculatorValue>
      <div>
        <StyledAssetCalculatorLabel>
          Your ownership:
        </StyledAssetCalculatorLabel>
        <StyledAssetCalculatorValue>
          {(loadingUserInfo && ended) && (
            <StyledAssetCalculatorSpin />
          )}
          {(loadingUserInfo && ended) ? null : ended ? yourOwnership : selectedAmountUsd ? selectedOwnership : 0}%
        </StyledAssetCalculatorValue>
      </div>
    </React.Fragment>
  )
}

export default AssetCalculator;
