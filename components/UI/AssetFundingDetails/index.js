import StyledFundingDetails from './styledFundingDetails';
import StyledFundsRaised from './styledFundsRaised';
import StyledFundsGoal from './styledFundsGoal';
import StyledFundsInvestors from './styledFundsInvestors';
import StyledFundingDetailsTitle from './styledFundingDetailsTitle';
import StyledFundingDetailsValue from './styledFundingDetailsValue';

const AssetFundingDetails = ({
  amountRaisedInUSD,
  funded,
  goalFormatted,
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
        {funded ? goalFormatted : `${formatMonetaryValue(amountRaisedInUSD)}`}
      </StyledFundingDetailsValue>
    </StyledFundsRaised>
    <StyledFundsGoal>
      <StyledFundingDetailsTitle>
        Funding goal
      </StyledFundingDetailsTitle>
      <StyledFundingDetailsValue>
        {goalFormatted}
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
