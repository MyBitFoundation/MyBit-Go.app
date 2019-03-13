import StyledFundingDetails from './styledFundingDetails';
import StyledFundsRaised from './styledFundsRaised';
import StyledFundsGoal from './styledFundsGoal';
import StyledFundsInvestors from './styledFundsInvestors';
import StyledFundingDetailsTitle from './styledFundingDetailsTitle';
import StyledFundingDetailsValue from './styledFundingDetailsValue';
import {
  DEFAULT_TOKEN,
} from 'constants';

const AssetFundingDetails = ({
  fundingGoal,
  fundingProgress,
  funded,
  numberOfInvestors,
  formatMonetaryValue,
}) => (
  <StyledFundingDetails>
    <StyledFundsRaised>
      <StyledFundingDetailsTitle>
        Funds raised
      </StyledFundingDetailsTitle>
      <StyledFundingDetailsValue
        funded={funded}
      >
        {funded ? fundingProgress : fundingProgress} {DEFAULT_TOKEN}
      </StyledFundingDetailsValue>
    </StyledFundsRaised>
    <StyledFundsGoal>
      <StyledFundingDetailsTitle>
        Funding goal
      </StyledFundingDetailsTitle>
      <StyledFundingDetailsValue>
        {`${fundingGoal} ${DEFAULT_TOKEN}`}
      </StyledFundingDetailsValue>
    </StyledFundsGoal>
    <StyledFundsInvestors>
      <StyledFundingDetailsTitle>
        Number of investors so far
      </StyledFundingDetailsTitle>
      <StyledFundingDetailsValue>
        {numberOfInvestors}
      </StyledFundingDetailsValue>
    </StyledFundsInvestors>
  </StyledFundingDetails>
)

export default AssetFundingDetails;
