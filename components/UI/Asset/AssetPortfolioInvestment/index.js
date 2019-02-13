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
import StyledAssetPortfolioInvestmentContainer from './styledAssetPortfolioInvestmentContainer';
import StyledAssetPortfolioInvestmentSection from './styledAssetPortfolioInvestmentSection';
import StyledAssetPortfolioInvestmentValue from './styledAssetPortfolioInvestmentValue';
import StyledAssetPortfolioInvestmentFundingLabel from './styledAssetPortfolioInvestmentFundingLabel';
import StyledAssetPortfolioInvestmentButtons from './styledAssetPortfolioInvestmentButtons';
import StyledAssetPortfolioManagedContribution from './styledAssetPortfolioManagedContribution';

const AssetPortfolioInvestment = ({
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
  totalProfit,
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
    <StyledAssetPortfolioInvestmentContainer>
      <StyledAssetPortfolioInvestmentSection>
        <span>Unrealised profit:</span>
        {!funded ?
          <StyledAssetPortfolioInvestmentValue
            isGray
          >
            Funding in progress
          </StyledAssetPortfolioInvestmentValue> :
          <StyledAssetPortfolioInvestmentValue
            isGreen={unrealizedProfit > 0}
          >
            {formatMonetaryValue(unrealizedProfit)}
          </StyledAssetPortfolioInvestmentValue>}
      </StyledAssetPortfolioInvestmentSection>
      {funded && (
        <StyledAssetPortfolioInvestmentSection>
          <span>Total profit:</span>
          <div>
            <StyledAssetPortfolioInvestmentValue>
              {formatMonetaryValue(totalProfit)}
              </StyledAssetPortfolioInvestmentValue>
          </div>
        </StyledAssetPortfolioInvestmentSection>
      )}
      <StyledAssetPortfolioInvestmentSection
        onlyTwoItems={fundingStage === FundingStages.IN_PROGRESS}
        extraMarginBotton
      >
        <span>Your ownership:</span>
        <div>
          <StyledAssetPortfolioInvestmentValue>
            {(numberOfInvestors === 1 && funded) ? '100' : ownership.toFixed(2)}%
          </StyledAssetPortfolioInvestmentValue>
        </div>
      </StyledAssetPortfolioInvestmentSection>
      <StyledAssetPortfolioInvestmentSection
        hasNoMarginBottom
      >
        <div>
        {funded ? (
          <StyledAssetPortfolioManagedContribution>
            <StyledAssetPortfolioInvestmentFundingLabel>
              Your contribution:
            </StyledAssetPortfolioInvestmentFundingLabel>
            <StyledAssetPortfolioInvestmentValue>
              {formatMonetaryValue(amountToBeRaisedInUSD)}
            </StyledAssetPortfolioInvestmentValue>
            </StyledAssetPortfolioManagedContribution>
        ) : (
          <React.Fragment>
            <StyledAssetPortfolioInvestmentFundingLabel>
              Funding:
            </StyledAssetPortfolioInvestmentFundingLabel>
            <span>
              {formatMonetaryValue(amountRaisedInUSD)}/
              <StyledAssetPortfolioInvestmentValue>
                {formatMonetaryValue(amountToBeRaisedInUSD)}
              </StyledAssetPortfolioInvestmentValue>
            </span>
          </React.Fragment>
        )}
        </div>
        <StyledAssetPortfolioInvestmentButtons
          hasWithdrawButton
        >
          {withdrawButton}
          {button}
        </StyledAssetPortfolioInvestmentButtons>
      </StyledAssetPortfolioInvestmentSection>
    </StyledAssetPortfolioInvestmentContainer>
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

export default AssetPortfolioInvestment;
