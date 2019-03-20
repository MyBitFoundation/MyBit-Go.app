import AssetDeadline from 'ui/AssetDeadline';
import AssetFundingDetails from 'ui/AssetFundingDetails';
import FundingCalculator from 'components/FundingCalculator';
import AssetFundingButton from 'components/AssetFunding/assetFundingButton';
import Separator from 'ui/Separator';
import AssetFundingSelectorFooter from './assetFundingSelectorFooter';

const separatorStyleFullWidth = {
  position: 'absolute',
  left: '0px',
  marginTop: '15px',
}

const separatorStyle = {
  margin: '20px 0px',
};

const AssetFundingSelector = ({
  asset,
  ended,
  loadingUserInfo,
  maxOwnership,
  yourOwnership,
  yourContribution,
  formatMonetaryValue,
  selectedOwnership,
  minInvestment,
  maxInvestment,
  selectedAmountEth,
  handleOnChangeSlider,
  handleOnChangePercentage,
  handleOnChangeEthValue,
  handleDeadlineHit,
  handleConfirmationClicked,
}) => (
  <div>
    <AssetDeadline
      {...asset}
      handleDeadlineHit={handleDeadlineHit}
    />
    <Separator style={separatorStyleFullWidth}/>
    <div style={{marginTop: '35px'}}>
      <AssetFundingDetails
        numberOfInvestors={asset.numberOfInvestors}
        funded={asset.funded}
        fundingGoal={formatMonetaryValue(asset.fundingGoal)}
        fundingProgress={formatMonetaryValue(asset.fundingProgress)}
        style={{marginTop: '20px'}}
      />
    </div>
    <Separator style={separatorStyle}/>
    <FundingCalculator
      {...asset}
      handleOnChangeEthValue={handleOnChangeEthValue}
      handleOnChangePercentage={handleOnChangePercentage}
      handleOnChangeSlider={handleOnChangeSlider}
      selectedAmountEth={selectedAmountEth}
      maxInvestment={maxInvestment}
      minInvestment={minInvestment}
      selectedOwnership={selectedOwnership}
      ended={ended}
      yourContribution={yourContribution}
      yourOwnership={yourOwnership}
      maxOwnership={maxOwnership}
      loadingUserInfo={loadingUserInfo}
    />
    {(!asset.pastDate && !asset.funded) && (
      <React.Fragment>
        <AssetFundingButton
          type="primary"
          onClick={handleConfirmationClicked}
          disabled={maxInvestment === 0 || selectedAmountEth < minInvestment}
          size="large"
          style={{
            margin: '20px 0px',
          }}
        >
          Contribute
        </AssetFundingButton>
        <AssetFundingSelectorFooter>
          You'll be able to select your preferred token of payment in the next step. <br />
          We use MetaMask & Kyber for payments
        </AssetFundingSelectorFooter>
      </React.Fragment>
    )}
  </div>
);

export default AssetFundingSelector;
