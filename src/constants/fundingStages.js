export const FundingStages = {
  FUNDED: 'funded',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
};

export const getFundingStage = (fundingStageNumber) => {
  switch(fundingStageNumber){
    case 3:
    case 4:
      return FundingStages.FUNDED;
    case 0:
      return FundingStages.FAILED;
    default:
      return FundingStages.IN_PROGRESS;
  }
}
