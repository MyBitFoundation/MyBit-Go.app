import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  Button,
  Icon,
  Progress,
} from 'antd';
import { formatMonetaryValue } from 'utils/helpers';
import {
  FundingStages,
} from 'constants/fundingStages';
import AssetPortfolioInvestmentWrapper from './assetPortfolioInvestmentWrapper';
import AssetPortfolioInvestmentSection from './assetPortfolioInvestmentSection';
import AssetPortfolioInvestmentValue from './assetPortfolioInvestmentValue';
import AssetPortfolioInvestmentFundingLabel from './assetPortfolioInvestmentFundingLabel';
import AssetPortfolioManagedContribution from './assetPortfolioManagedContribution';

const AssetPortfolioInvestment = ({
  fundingGoal,
  fundingProgress,
  funded,
  assetId,
  fundingStage,
  owedToInvestor,
  numberOfInvestors,
  ownership,
  withdrawing,
  withdrawInvestorProfit,
  unrealizedProfit,
  totalProfit,
  userInvestment,
}) => {
  const withdrawButton = unrealizedProfit > 0 ? (
    <Button
      onClick={() => withdrawInvestorProfit(assetId, formatMonetaryValue(unrealizedProfit))}
      type="primary"
      loading={withdrawing}
    >
      Withdraw
    </Button>

  ) : null;

  return (
    <AssetPortfolioInvestmentWrapper>
      <AssetPortfolioInvestmentSection>
        <span>Unrealised profit:</span>
        {!funded
          ? (
            <AssetPortfolioInvestmentValue
              isGray
            >
            Funding in progress
            </AssetPortfolioInvestmentValue>
          )
          : (
            <AssetPortfolioInvestmentValue
              isGreen={unrealizedProfit > 0}
            >
              {formatMonetaryValue(unrealizedProfit)}
            </AssetPortfolioInvestmentValue>
          )}
      </AssetPortfolioInvestmentSection>
      {funded && (
        <AssetPortfolioInvestmentSection>
          <span>Total profit:</span>
          <div>
            <AssetPortfolioInvestmentValue>
              {formatMonetaryValue(totalProfit)}
            </AssetPortfolioInvestmentValue>
          </div>
        </AssetPortfolioInvestmentSection>
      )}
      <AssetPortfolioInvestmentSection
        onlyTwoItems={fundingStage === FundingStages.IN_PROGRESS}
        extraMarginBotton
      >
        <span>Your ownership:</span>
        <div>
          <AssetPortfolioInvestmentValue>
            {parseFloat(((ownership || 0) * 100).toFixed(2))}
%
          </AssetPortfolioInvestmentValue>
        </div>
      </AssetPortfolioInvestmentSection>
      <AssetPortfolioInvestmentSection
        hasNoMarginBottom
      >
        <div>
          {funded ? (
            <AssetPortfolioManagedContribution>
              <AssetPortfolioInvestmentFundingLabel>
              Your contribution:
              </AssetPortfolioInvestmentFundingLabel>
              <AssetPortfolioInvestmentValue>
                {formatMonetaryValue(userInvestment)}
              </AssetPortfolioInvestmentValue>
            </AssetPortfolioManagedContribution>
          ) : (
            <React.Fragment>
              <AssetPortfolioInvestmentFundingLabel>
              Funding:
              </AssetPortfolioInvestmentFundingLabel>
              <span>
                {formatMonetaryValue(fundingProgress)}
/
                <AssetPortfolioInvestmentValue>
                  {formatMonetaryValue(fundingGoal)}
                </AssetPortfolioInvestmentValue>
              </span>
            </React.Fragment>
          )}
        </div>
        {withdrawButton}
      </AssetPortfolioInvestmentSection>
    </AssetPortfolioInvestmentWrapper>
  );
};

export default React.memo(AssetPortfolioInvestment);
