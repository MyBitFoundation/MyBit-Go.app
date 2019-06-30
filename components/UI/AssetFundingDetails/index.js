import { memo } from 'react';
import FundingDetailsWrapper from './fundingDetailsWrapper';
import FundingDetailsSection from './fundingDetailsSection';
import FundingDetailsTitle from './fundingDetailsTitle';
import FundingDetailsValue from './fundingDetailsValue';

const AssetFundingDetails = memo(({
  fundingGoal,
  fundingProgress,
  funded,
  numberOfInvestors,
}) => (
  <FundingDetailsWrapper>
    <FundingDetailsSection>
      <FundingDetailsTitle>
        Funds raised
      </FundingDetailsTitle>
      <FundingDetailsValue
        funded={funded}
      >
        {fundingProgress}
      </FundingDetailsValue>
    </FundingDetailsSection>
    <FundingDetailsSection>
      <FundingDetailsTitle>
        Funding goal
      </FundingDetailsTitle>
      <FundingDetailsValue>
        {fundingGoal}
      </FundingDetailsValue>
    </FundingDetailsSection>
    <FundingDetailsSection>
      <FundingDetailsTitle>
        Investors
      </FundingDetailsTitle>
      <FundingDetailsValue>
        {numberOfInvestors}
      </FundingDetailsValue>
    </FundingDetailsSection>
  </FundingDetailsWrapper>
))

export default AssetFundingDetails;
