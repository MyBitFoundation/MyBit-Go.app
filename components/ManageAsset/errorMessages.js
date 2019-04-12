export const getErrorMessage = (errorType) => {
  switch (errorType) {
    case 'no_asset':
      return 'This asset does not exist.'
    case 'no_permission':
      return `You don't have permission to view this asset`;
    case 'asset_not_funded':
      return 'This asset is not fully funded yet.';
    case 'asset_funding_failed':
      return `This asset's funding process failed, therefore this page is not accessible`;
  }
}
