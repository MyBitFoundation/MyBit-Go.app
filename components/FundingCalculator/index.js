import React, { memo } from 'react';
import {
  Slider,
  InputNumber,
} from 'antd';
import {
  DEFAULT_TOKEN,
} from 'constants/app';
import {
  formatMonetaryValue,
  getDecimalsForToken,
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

const decimalsForDefaultToken = getDecimalsForToken(DEFAULT_TOKEN);

const FundingCalculator = memo(({
  onChangeContributionDefaultToken,
  onChangeContributionPercentage,
  selectedAmountDefaultToken,
  maxInvestment,
  minInvestment,
  selectedOwnership,
  ended,
  userOwnership,
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
              value={selectedAmountDefaultToken > 0 ? selectedAmountDefaultToken : null}
              label={DEFAULT_TOKEN}
              onChange={onChangeContributionDefaultToken}
              min={0}
              decimalPlaces={decimalsForDefaultToken.decimals}
              step={decimalsForDefaultToken.step}
            />
            <FundingCalculatorEqualsSeparator>
              =
            </FundingCalculatorEqualsSeparator>
            <NumericInput
              placeholdertext="Amount %"
              value={selectedOwnership > 0 ? selectedOwnership : null}
              min={0}
              label="%"
              decimalPlaces={2}
              step={0.01}
              onChange={onChangeContributionPercentage}
            />
          </div>
          <Slider
            id="slider"
            step={decimalsForDefaultToken.step}
            defaultValue={0}
            value={selectedAmountDefaultToken}
            min={0}
            max={maxInvestment}
            onChange={onChangeContributionDefaultToken}
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
            Your contribution
          </FundingCalculatorLabel>
          <FundingCalculatorValue>
            {(loadingUserInfo && ended) && (
              <FundingCalculatorSpin />
            )}
            {(loadingUserInfo && ended) ? null : ended ? formatMonetaryValue(parseFloat(userInvestment)) : selectedAmountDefaultToken ? formatMonetaryValue(parseFloat(selectedAmountDefaultToken)) : 0}
          </FundingCalculatorValue>
        </div>
        <div>
          <FundingCalculatorLabel>
            Your ownership
          </FundingCalculatorLabel>
          <FundingCalculatorValue>
            {(loadingUserInfo && ended) && (
              <FundingCalculatorSpin />
            )}
            {(loadingUserInfo && ended) ? null : ended ? parseFloat((userOwnership * 100).toFixed(2)) : selectedAmountDefaultToken ? selectedOwnership : 0}%
          </FundingCalculatorValue>
        </div>
      </FundingCalculatorGrid>
    </React.Fragment>
  )
})

export default FundingCalculator;
