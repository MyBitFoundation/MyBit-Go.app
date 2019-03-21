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
import AssetPortfolioInvestmentContainer from './assetPortfolioInvestmentContainer';
import AssetPortfolioInvestmentSection from './assetPortfolioInvestmentSection';
import AssetPortfolioInvestmentValue from './assetPortfolioInvestmentValue';
import AssetPortfolioInvestmentFundingLabel from './assetPortfolioInvestmentFundingLabel';
import AssetPortfolioInvestmentButtons from './assetPortfolioInvestmentButtons';
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

  const buttonType = funded ? 'secondary' : 'primary';
  const text = funded ? 'View asset listing' : 'Contribute more';

  const button = (
    <Link
      as={`/asset/${assetId}`}
      href={`/asset?id=${assetId}`}
    >
      <Button
        type={buttonType}
      >
        {text}
      </Button>
    </Link>
  );

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
    <AssetPortfolioInvestmentContainer>
      <AssetPortfolioInvestmentSection>
        <span>Unrealised profit:</span>
        {!funded ?
          <AssetPortfolioInvestmentValue
            isGray
          >
            Funding in progress
          </AssetPortfolioInvestmentValue> :
          <AssetPortfolioInvestmentValue
            isGreen={unrealizedProfit > 0}
          >
            {formatMonetaryValue(unrealizedProfit)}
          </AssetPortfolioInvestmentValue>}
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
            {parseFloat((ownership * 100).toFixed(2))}%
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
              {formatMonetaryValue(fundingProgress)}/
              <AssetPortfolioInvestmentValue>
                {formatMonetaryValue(fundingGoal)}
              </AssetPortfolioInvestmentValue>
            </span>
          </React.Fragment>
        )}
        </div>
        <AssetPortfolioInvestmentButtons
          hasWithdrawButton
        >
          {withdrawButton}
          {button}
        </AssetPortfolioInvestmentButtons>
      </AssetPortfolioInvestmentSection>
    </AssetPortfolioInvestmentContainer>
  )
};

AssetPortfolioInvestment.propTypes = {
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

AssetPortfolioInvestment.defaultProps = {
  city: '',
  country: '',
  name: '',
  clickHandler: () => {},
  backgroundImage: '',
};

export default React.memo(AssetPortfolioInvestment);
