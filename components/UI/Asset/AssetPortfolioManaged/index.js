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
} from 'constants';
import ValueDisplay from 'ui/ValueDisplay';
import StyledAssetPortfolioManagedContainer from './styledAssetPortfolioManagedContainer';
import StyledAssetPortfolioManagedSection from './styledAssetPortfolioManagedSection';
import StyledAssetPortfolioManagedButtons from './styledAssetPortfolioManagedButtons';
import StyledAssetPortfolioManagedValue from './styledAssetPortfolioManagedValue';
import StyledAssetPortfolioManagedValueDisplays from './styledAssetPortfolioManagedValueDisplays';
import StyledAssetPortfolioManagedFundedLabel from './styledAssetPortfolioManagedFundedLabel';
import StyledAssetPortfolioManagedFundedValue from './styledAssetPortfolioManagedFundedValue';

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
  const text = !funded ? 'View asset listing' : managerHasToCallPayout ? 'Payout' : 'Manage asset';
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
    <StyledAssetPortfolioManagedContainer>
      <StyledAssetPortfolioManagedValueDisplays>
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
      </StyledAssetPortfolioManagedValueDisplays>
      <StyledAssetPortfolioManagedSection>
        <span>Your management fee:</span>
        <StyledAssetPortfolioManagedValue>
          {managerPercentage}%
        </StyledAssetPortfolioManagedValue>
      </StyledAssetPortfolioManagedSection>
      <StyledAssetPortfolioManagedSection>
        <span>
          Total profit:
        </span>
        <div>
          <StyledAssetPortfolioManagedValue
            isGray={!funded}
            isSmallMobile={!funded}
          >
            {funded ? formatMonetaryValue(totalProfitAssetManager) : pastDate ? 'Funding failed' : 'Funding in progress'}
          </StyledAssetPortfolioManagedValue>
        </div>
      </StyledAssetPortfolioManagedSection>
      <StyledAssetPortfolioManagedSection
        hasExtraMarginBottom
      >
        <span>Available for withdrawal:</span>
        <div>
          <StyledAssetPortfolioManagedValue
            isGray={!funded}
            isSmallMobile={!funded}
          >
            {funded ? formatMonetaryValue(toWithdraw) : pastDate ? 'Funding failed' : 'Funding in progress'}
          </StyledAssetPortfolioManagedValue>
        </div>
      </StyledAssetPortfolioManagedSection>
      <StyledAssetPortfolioManagedSection>
        <div>
          {funded && (
            <span>
              Fully funded
            </span>
          )}
          {(!pastDate && fundingStage === FundingStages.IN_PROGRESS) && (
            <div>
              <StyledAssetPortfolioManagedFundedLabel>
                Funded:
              </StyledAssetPortfolioManagedFundedLabel>
              <StyledAssetPortfolioManagedFundedValue>
                {`${formatMonetaryValue(fundingProgress, 0, false)}/${formatMonetaryValue(fundingGoal)}`}
              </StyledAssetPortfolioManagedFundedValue>
            </div>
          )}
          {(pastDate && !funded) && (
            <span>
              Funding failed
            </span>
          )}
        </div>
        <StyledAssetPortfolioManagedButtons>
          {buttonWithLink || button}
        </StyledAssetPortfolioManagedButtons>
      </StyledAssetPortfolioManagedSection>
    </StyledAssetPortfolioManagedContainer>
  )
};

AssetPortfolioManaged.propTypes = {
  funded: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  city: PropTypes.string,
  country: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string.isRequired,
  clickHandler: PropTypes.func,
  AssetDefaultId: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  fundingStage: PropTypes.string.isRequired,
  pastDate: PropTypes.bool.isRequired,
  watchListed: PropTypes.bool.isRequired,
  handleAssetFavorited: PropTypes.func.isRequired,
};

AssetPortfolioManaged.defaultProps = {
  city: '',
  country: '',
  name: '',
  clickHandler: () => {},
  backgroundImage: '',
};

export default React.memo(AssetPortfolioManaged);
