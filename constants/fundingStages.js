export const FundingStages = {
  FUNDED: 'funded',
  FAILED: 'failed',
  IN_PROGRESS: 'in_progress',
};

export const getFundingStage = (fundingStageNumber) => {
  switch(fundingStageNumber){
    case 0:
      return FundingStages.FUNDED;
    case 1:
      return FundingStages.FAILED;
    case 2:
      return FundingStages.IN_PROGRESS;
  }
}
