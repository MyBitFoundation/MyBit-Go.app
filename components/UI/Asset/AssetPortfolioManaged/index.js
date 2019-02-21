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
  amountRaisedInUSD,
  amountToBeRaisedInUSD,
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
}) => {

  const buttonType = 'secondary';
  const text = funded ? 'Manage asset' : 'View asset listing';
  const url = funded ? `/manage?id=${assetId}` : `/asset?id=${assetId}`;
  const urlAs = funded ? `/manage/${assetId}` : `/asset/${assetId}`;

  const button = (
    <Link
      as={urlAs}
      href={url}
    >
      <Button
        type={buttonType}
      >
        {text}
      </Button>
    </Link>
  );

  return (
    <StyledAssetPortfolioManagedContainer>
      <StyledAssetPortfolioManagedValueDisplays>
        <ValueDisplay
          text="Value"
          value={`${formatMonetaryValue(amountToBeRaisedInUSD)}`}
          isBlue
          coloredBackground
        />
        {funded && (
          <ValueDisplay
            text="Revenue"
            value={`${formatMonetaryValue(assetIncome)}`}
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
            {funded ? formatMonetaryValue(totalProfitAssetManager) : 'Funding in progress'}
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
            {funded ? formatMonetaryValue(toWithdraw) : 'Funding in progress'}
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
          {fundingStage === FundingStages.IN_PROGRESS && (
            <StyledAssetPortfolioManagedFundedLabel>Funded:
              <StyledAssetPortfolioManagedFundedValue>
                <StyledAssetPortfolioManagedValue>
                  {' '}{formatMonetaryValue(amountRaisedInUSD)}
                </StyledAssetPortfolioManagedValue>/{formatMonetaryValue(amountToBeRaisedInUSD)}
              </StyledAssetPortfolioManagedFundedValue>
            </StyledAssetPortfolioManagedFundedLabel>
          )}
        </div>
        <StyledAssetPortfolioManagedButtons>
          {button}
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
