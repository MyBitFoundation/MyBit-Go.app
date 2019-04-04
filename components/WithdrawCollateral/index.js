import {
  Button,
  Tooltip as TooltipAnt,
} from 'antd';

import {
  formatMonetaryValue,
} from 'utils/helpers';
import {
  PLATFORM_TOKEN,
} from 'constants/app';
import WithdrawCollateralWrapper from './withdrawCollateralWrapper';
import WithdrawCollateralGraphWrapper from './withdrawCollateralGraphWrapper';
import WithdrawCollateralSection from './withdrawCollateralSection';
import WithdrawCollateralPercentage from './withdrawCollateralPercentage';
import WithdrawCollateralColumn from './withdrawCollateralColumn';
import WithdrawCollateralTitle from './withdrawCollateralTitle';
import WithdrawCollateralDescription from './withdrawCollateralDescription';

const WithdrawCollateral = React.memo(({
  collateralData,
  isWithdrawingCollateral,
  withdrawCollateral,
  fundingGoal,
}) => (
  <WithdrawCollateralWrapper>
    <WithdrawCollateralTitle>Asset collateral</WithdrawCollateralTitle>
    <WithdrawCollateralDescription>Once asset revenue surpasses the asset value you can withdraw your asset collateral.</WithdrawCollateralDescription>
    <WithdrawCollateralGraphWrapper>
      {collateralData.map((info, index) => {
        const {
          withdrawable,
          current,
          required,
          paidOut
        } = info;

        const percentage = 25 * (index + 1);
        const minValBar = (fundingGoal / 4) * index;
        const barPercentage = ((current-minValBar) * 172) / (required - minValBar);
        let text = `${formatMonetaryValue(current, 2, false)}/${formatMonetaryValue(required)}`;
        if(paidOut){
          text = 'Paid out';
        }

        return(
         <WithdrawCollateralSection key={minValBar}>
            <WithdrawCollateralPercentage>
              {percentage}%
            </WithdrawCollateralPercentage>
            <WithdrawCollateralColumn height={`${barPercentage}px`} >
              <div/>
            </WithdrawCollateralColumn>
            <div className="ManagedAsset__collateral-bars-column-status">{text}</div>
            <TooltipAnt
                title={`Once asset revenue reaches $${required} you can withdraw (${percentage}% of collateral) ${PLATFORM_TOKEN}.`}
            >
              <Button
                loading={isWithdrawingCollateral && withdrawable ? true : false}
                type="primary"
                disabled={isWithdrawingCollateral || !withdrawable}
                onClick={withdrawCollateral}
              >
                {(isWithdrawingCollateral && withdrawable) ? 'Withdrawing' : 'Withdraw'}
              </Button>
            </TooltipAnt>
          </WithdrawCollateralSection>
        )})}
    </WithdrawCollateralGraphWrapper>
  </WithdrawCollateralWrapper>
));

export default WithdrawCollateral;
