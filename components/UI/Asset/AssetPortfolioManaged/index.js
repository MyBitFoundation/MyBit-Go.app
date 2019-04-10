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
import ValueDisplay from 'ui/ValueDisplay';
import AssetPortfolioManagedWrapper from './assetPortfolioManagedWrapper';
import AssetPortfolioManagedSection from './assetPortfolioManagedSection';
import AssetPortfolioManagedButtons from './assetPortfolioManagedButtons';
import AssetPortfolioManagedValue from './assetPortfolioManagedValue';
import AssetPortfolioManagedValueDisplays from './assetPortfolioManagedValueDisplays';
import AssetPortfolioManagedFundedLabel from './assetPortfolioManagedFundedLabel';
import AssetPortfolioManagedFundedValue from './assetPortfolioManagedFundedValue';

const AssetPortfolioManaged = ({
  funded,
  assetId,
  fundingStage,
  owedToInvestor,
  numberOfInvestors,
  ownership,
  withdrawing,
  withdrawInvestorProfit,
  unrealizedProfit,
  toWithdraw,
  managerPercentage,
  totalProfitAssetManager,
  assetIncome,
  pastDate,
  fundingGoal,
  fundingProgress,
  managerHasToCallPayout,
  callingPayout,
  payoutAsset,
  defaultData,
}) => {

  const buttonType = 'secondary';
  const text = !funded ? 'View asset listing' : managerHasToCallPayout ? 'Send funds to operator' : 'Manage asset';
  const url = !funded ? `/asset?id=${assetId}` : managerHasToCallPayout ? undefined : `/manage?id=${assetId}`;
  const urlAs = !funded ? `/asset/${assetId}` : managerHasToCallPayout ? undefined : `/manage/${assetId}`;
  const button = (
    <Button
      type={buttonType}
      onClick={managerHasToCallPayout ? () => payoutAsset({
        assetId,
        defaultData,
      }) : undefined}
      loading={callingPayout}
      disabled={callingPayout}
    >
      {text}
    </Button>
  )

  const buttonWithLink = url && (
    <Link
      as={urlAs}
      href={url}
    >
      {button}
    </Link>
  );

  return (
    <AssetPortfolioManagedWrapper>
      <AssetPortfolioManagedValueDisplays>
        <ValueDisplay
          text="Value"
          value={formatMonetaryValue(fundingGoal)}
          isBlue
          coloredBackground
        />
        {funded && (
          <ValueDisplay
            text="Revenue"
            value={formatMonetaryValue(assetIncome)}
            isGreen
            coloredBackground
          />
        )}
      </AssetPortfolioManagedValueDisplays>
      <AssetPortfolioManagedSection>
        <span>Your management fee:</span>
        <AssetPortfolioManagedValue>
          {managerPercentage * 100}%
        </AssetPortfolioManagedValue>
      </AssetPortfolioManagedSection>
      <AssetPortfolioManagedSection>
        <span>
          Total profit:
        </span>
        <div>
          <AssetPortfolioManagedValue
            isGray={!funded}
            isSmallMobile={!funded}
          >
            {funded ? formatMonetaryValue(totalProfitAssetManager) : pastDate ? 'Funding failed' : 'Funding in progress'}
          </AssetPortfolioManagedValue>
        </div>
      </AssetPortfolioManagedSection>
      <AssetPortfolioManagedSection
        hasExtraMarginBottom
      >
        <span>Available for withdrawal:</span>
        <div>
          <AssetPortfolioManagedValue
            isGray={!funded}
            isSmallMobile={!funded}
          >
            {funded ? formatMonetaryValue(toWithdraw) : pastDate ? 'Funding failed' : 'Funding in progress'}
          </AssetPortfolioManagedValue>
        </div>
      </AssetPortfolioManagedSection>
      <AssetPortfolioManagedSection>
        <div>
          {funded && (
            <span>
              Fully funded
            </span>
          )}
          {(!pastDate && fundingStage === FundingStages.IN_PROGRESS) && (
            <div>
              <AssetPortfolioManagedFundedLabel>
                Funded:
              </AssetPortfolioManagedFundedLabel>
              <AssetPortfolioManagedFundedValue>
                {`${formatMonetaryValue(fundingProgress, undefined, false)}/${formatMonetaryValue(fundingGoal)}`}
              </AssetPortfolioManagedFundedValue>
            </div>
          )}
          {(pastDate && !funded) && (
            <span>
              Funding failed
            </span>
          )}
        </div>
        <AssetPortfolioManagedButtons>
          {buttonWithLink || button}
        </AssetPortfolioManagedButtons>
      </AssetPortfolioManagedSection>
    </AssetPortfolioManagedWrapper>
  )
};

export default React.memo(AssetPortfolioManaged);
