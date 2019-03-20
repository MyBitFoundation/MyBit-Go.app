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
import FundingCalculatorTitle from './fundingCalculatorTitle';
import FundingCalculatorEqualsSeparator from './fundingCalculatorEqualsSeparator';
import FundingCalculatorLabel from './fundingCalculatorLabel';
import FundingCalculatorSeparator from './fundingCalculatorSeparator';
import FundingCalculatorValue from './fundingCalculatorValue';
import FundingCalculatorSpin from './fundingCalculatorSpin';
import FundingCalculatorGrid from './fundingCalculatorGrid';
import FundingCalculatorSliderLabel from './fundingCalculatorSliderLabel';

const FundingCalculator = ({
  handleOnChangeEthValue,
  handleOnChangePercentage,
  handleOnChangeSlider,
  selectedAmountEth,
  fundingGoal,
  maxInvestment,
  minInvestment,
  selectedOwnership,
  ended,
  yourContribution,
  yourOwnership,
  maxOwnership,
  loadingUserInfo,
  userInvestment,
}) => {
  return(
    <React.Fragment>
      <FundingCalculatorTitle>
        {ended ? 'Your investment' : 'Calculate your investment'}
      </FundingCalculatorTitle>
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
            />
            <FundingCalculatorEqualsSeparator>
              =
            </FundingCalculatorEqualsSeparator>
            <NumericInput
              placeholdertext="Amount %"
              value={selectedOwnership}
              min={0}
              label="%"
              onChange={number => handleOnChangePercentage(number, maxOwnership, fundingGoal, maxInvestment)}
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
            disabled={ended}
          />
          <FundingCalculatorGrid
            style={{marginTop: '10px'}}
          >
            <FundingCalculatorSliderLabel>
            Min. <span>{formatMonetaryValue(minInvestment)}</span>
            </FundingCalculatorSliderLabel>
            <FundingCalculatorSliderLabel>
            Max. <span>{formatMonetaryValue(maxInvestment)}</span>
            </FundingCalculatorSliderLabel>
          </FundingCalculatorGrid>
        </React.Fragment>
      )}
      <FundingCalculatorGrid
        style={{marginTop: '20px'}}
      >
        <div>
          <FundingCalculatorLabel>
            Your contribution:
          </FundingCalculatorLabel>
          <FundingCalculatorValue>
            {(loadingUserInfo && ended) && (
              <FundingCalculatorSpin />
            )}
            {(loadingUserInfo && ended) ? null : ended ? formatMonetaryValue(parseFloat(userInvestment)) : selectedAmountEth ? formatMonetaryValue(parseFloat(selectedAmountEth)) : 0}
          </FundingCalculatorValue>
        </div>
        <div>
          <FundingCalculatorLabel>
            Your ownership:
          </FundingCalculatorLabel>
          <FundingCalculatorValue>
            {(loadingUserInfo && ended) && (
              <FundingCalculatorSpin />
            )}
            {(loadingUserInfo && ended) ? null : ended ? yourOwnership * 100 : selectedAmountEth ? selectedOwnership : 0}%
          </FundingCalculatorValue>
        </div>
      </FundingCalculatorGrid>
    </React.Fragment>
  )
}

export default FundingCalculator;
