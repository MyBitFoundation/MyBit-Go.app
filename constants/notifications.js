import Link from 'next/link';
import {
  PortfolioTypes,
} from 'constants/portfolioTypes';

export const NotificationTypes = {
  METAMASK: 'metamask',
  LIST_ASSET: 'listAsset',
  FUNDING: 'funding',
  WITHDRAW_INVESTOR: 'withdrawInvestor',
  WITHDRAW_COLLATERAL: 'withdrawCollateral',
  WITHDRAW_MANAGER: 'withdrawManager',
  ASSET_PAYOUT: 'assetPayout',
  APPROVE: 'approve',
  PAY_DIVIDENDS: 'payDividends',
  ASSET_FILES_UPLOAD: 'assetFilesUpload',
};

export const NotificationsMetamask = {
  LIST_ASSET: 'list-asset',
  FUNDING: 'funding',
  WITHDRAW_INVESTOR: 'withdrawInvestor',
  WITHDRAW_COLLATERAL: 'withdrawCollateral',
  WITHDRAW_MANAGER: 'withdrawManager',
  ASSET_PAYOUT: 'assetPayout',
  APPROVE: 'approve',
  PAY_DIVIDENDS: 'payDividends',
  ASSET_FILES_UPLOAD: 'assetFilesUpload',
};

export const NotificationStatus = {
  SUCCESS: 'success',
  INFO: 'info',
  ERROR: 'error',
};

export const getContentForNotification = (obj) => {
  const {
    listAsset,
    metamask,
    funding,
    withdrawInvestor,
    withdrawCollateral,
    withdrawManager,
    assetPayout,
    status,
    payDividends,
    assetFilesUpload,
  } = obj;
  if (listAsset) {
    const {
      type,
      formattedAmount,
    } = listAsset;
    if (type === NotificationTypes.APPROVE) {
      switch (status) {
        case NotificationStatus.SUCCESS:
          return {
            title: <span style={{ marginRight: '10px' }}>
Approved access to
              {' '}
              {formattedAmount}
              {' '}
successfully
            </span>,
            message: 'Please accept the next transaction in MetaMask that will list the asset in the platform.',
          };
        case NotificationStatus.INFO:
          return {
            title: `Approving access to ${formattedAmount}`,
            message: slowEthereumMessage,
          };
        case NotificationStatus.ERROR:
          return {
            title: 'Failed to approve access to funds',
            message: transactionFailed,
          };
        default:
          return null;
      }
    } else {
      switch (status) {
        case NotificationStatus.SUCCESS:
          return {
            title: <span style={{ marginRight: '10px' }}>
Listed
              {' '}
              {listAsset.assetName}
              {' '}
successfully
            </span>,
            message: <span>
You can find the asset listing
              {' '}
              <Link
                as={`/asset/${listAsset.assetId}`}
                href={`/asset?id=${listAsset.assetId}`}
              >
                <a>here</a>
              </Link>
.
            </span>,
          };
        case NotificationStatus.INFO:
          return {
            title: `${listAsset.assetName} is being listed for investors`,
            message: slowEthereumMessage,
          };
        case NotificationStatus.ERROR:
          return {
            title: `Failed to start the crowdsale for ${listAsset.assetName}`,
            message: transactionFailed,
          };
        default:
          return null;
      }
    }
  } else if (funding) {
    const {
      type,
      formattedAmount,
    } = funding;
    if (type === NotificationTypes.APPROVE) {
      switch (status) {
        case NotificationStatus.SUCCESS:
          return {
            title: <span style={{ marginRight: '10px' }}>
Approved access to
              {' '}
              {formattedAmount}
              {' '}
successfully
            </span>,
            message: 'Please accept the next transaction in MetaMask that will send your contribution to the asset.',
          };
        case NotificationStatus.INFO:
          return {
            title: `Approving access to ${formattedAmount}`,
            message: slowEthereumMessage,
          };
        case NotificationStatus.ERROR:
          return {
            title: 'Failed to approve access to funds',
            message: transactionFailed,
          };
        default:
          return null;
      }
    } else {
      switch (status) {
        case NotificationStatus.SUCCESS:
          return {
            title: <span style={{ marginRight: '10px' }}>
Contributed successfully to
              {' '}
              {funding.assetName}
            </span>,
            message: (
              <React.Fragment>
                <span>
Amount contributed:
                  {' '}
                  <span style={{ fontWeight: 600 }}>{funding.amount}</span>
                </span>
                {window.location.pathname.includes('portfolio') ? <p>{' '}</p> : (
                  <span
                    style={{ display: 'block', textAlign: 'right' }}
                  >
                    <Link
                      href={`/portfolio?type=${PortfolioTypes.INVESTMENTS}`}
                      as={`/portfolio/${PortfolioTypes.INVESTMENTS}`}
                    >
                        Go to Portfolio
                    </Link>
                  </span>
                )
                  }
              </React.Fragment>
            ),
          };
        case NotificationStatus.INFO:
          return {
            title: `Contributing ${funding.amount} to ${funding.assetName}`,
            message: slowEthereumMessage,
          };
        case NotificationStatus.ERROR:
          return {
            title: `Failed to contribute to ${funding.assetName}`,
            message: transactionFailed,
          };
        default:
          return null;
      }
    }
  } else if (payDividends) {
    const {
      type,
      formattedAmount,
      assetName,
    } = payDividends;
    if (type === NotificationTypes.APPROVE) {
      switch (status) {
        case NotificationStatus.SUCCESS:
          return {
            title: <span style={{ marginRight: '10px' }}>
Approved access to
              {' '}
              {formattedAmount}
              {' '}
successfully
            </span>,
            message: 'Please accept the next transaction in MetaMask that will make the revenue available for investors to withdraw.',
          };
        case NotificationStatus.INFO:
          return {
            title: `Approving access to ${formattedAmount}`,
            message: slowEthereumMessage,
          };
        case NotificationStatus.ERROR:
          return {
            title: 'Failed to approve access to funds',
            message: transactionFailed,
          };
        default:
          return null;
      }
    } else {
      switch (status) {
        case NotificationStatus.SUCCESS:
          return {
            title: <span style={{ marginRight: '10px' }}>
Dividends of
              {' '}
              {assetName}
              {' '}
paid out successfully
            </span>,
            message: (
              <React.Fragment>
                <span>
Dividend amount:
                  {' '}
                  <span style={{ fontWeight: 600 }}>{formattedAmount}</span>
                </span>
                {window.location.pathname.includes('portfolio') ? <p>Investors are now able to withdraw their share. And so can you! Well done, Asset Manager.</p>
                  : (
                    <React.Fragment>
                      <p>
Investors are now able to withdraw their share. And so can you! Check your
                        {' '}
                        <span>
                          <Link
                            href={`/portfolio?type=${PortfolioTypes.INVESTMENTS}`}
                            as={`/portfolio/${PortfolioTypes.INVESTMENTS}`}
                          >
                            Portfolio
                          </Link>
                        .
                        </span>
                      </p>
                      <p>Well done, Asset Manager.</p>
                    </React.Fragment>
                  )
                }
              </React.Fragment>
            ),
          };
        case NotificationStatus.INFO:
          return {
            title: `Paying out dividends of ${formattedAmount} to investors`,
            message: slowEthereumMessage,
          };
        case NotificationStatus.ERROR:
          return {
            title: `Failed to pay out dividends of ${assetName}`,
            message: transactionFailed,
          };
        default:
          return null;
      }
    }
  } else if (withdrawInvestor) {
    switch (status) {
      case NotificationStatus.SUCCESS:
        return {
          title: <span style={{ marginRight: '10px' }}>
Withdrew profits from
            {' '}
            {withdrawInvestor.assetName}
            {' '}
successfully
          </span>,
          message: (
            <React.Fragment>
              <span style={{ display: 'block' }}>
Amount received:
                {' '}
                <span style={{ fontWeight: 600 }}>{withdrawInvestor.amount}</span>
              </span>
              <span>Welcome to the future of investing.</span>
            </React.Fragment>
          ),
        };
      case NotificationStatus.INFO:
        return {
          title: `Withdrawing profits from ${withdrawInvestor.assetName}`,
          message: slowEthereumMessage,
        };
      case NotificationStatus.ERROR:
        return {
          title: `Failed to withdraw from ${withdrawInvestor.assetName}`,
          message: transactionFailed,
        };
      default:
        return null;
    }
  } else if (withdrawCollateral) {
    switch (status) {
      case NotificationStatus.SUCCESS:
        return {
          title: <span style={{ marginRight: '10px' }}>
Withdrew collateral of
            {' '}
            {withdrawCollateral.assetName}
            {' '}
successfully
          </span>,
          message: (
            <React.Fragment>
              <span style={{ display: 'block' }}>
Amount received:
                {' '}
                <span style={{ fontWeight: 600 }}>{`${withdrawCollateral.amount} (${withdrawCollateral.percentage}%)`}</span>
              </span>
            </React.Fragment>
          ),
        };
      case NotificationStatus.INFO:
        return {
          title: `Withdrawing collateral of ${withdrawCollateral.assetName}`,
          message: slowEthereumMessage,
        };
      case NotificationStatus.ERROR:
        return {
          title: `Failed to withdraw the collateral from ${withdrawCollateral.assetName}`,
          message: transactionFailed,
        };
      default:
        return null;
    }
  } else if (withdrawManager) {
    switch (status) {
      case NotificationStatus.SUCCESS:
        return {
          title: <span style={{ marginRight: '10px' }}>
Withdrew profits of
            {' '}
            {withdrawManager.assetName}
            {' '}
successfully
          </span>,
          message: (
            <React.Fragment>
              <span style={{ display: 'block' }}>
Amount received:
                {' '}
                <span style={{ fontWeight: 600 }}>{withdrawManager.amount}</span>
              </span>
            </React.Fragment>
          ),
        };
      case NotificationStatus.INFO:
        return {
          title: `Withdrawing profits of ${withdrawManager.assetName}`,
          message: slowEthereumMessage,
        };
      case NotificationStatus.ERROR:
        return {
          title: `Failed to withdraw profits from ${withdrawManager.assetName}`,
          message: transactionFailed,
        };
      default:
        return null;
    }
  } else if (assetPayout) {
    switch (status) {
      case NotificationStatus.SUCCESS:
        return {
          title: <span style={{ marginRight: '10px' }}>Funds sent successfuly</span>,
          message: `The funds generated through the listing of ${assetPayout.assetName} were sent to the operator.`,
        };
      case NotificationStatus.INFO:
        return {
          title: `Sending funds to Operator of ${assetPayout.assetName}`,
          message: slowEthereumMessage,
        };
      case NotificationStatus.ERROR:
        return {
          title: 'Failed to send the funds to the Operator',
          message: transactionFailed,
        };
      default:
        return null;
    }
  } else if (assetFilesUpload) {
    switch (status) {
      case NotificationStatus.SUCCESS:
        return {
          title: <span style={{ marginRight: '10px' }}>
Successfully updated the files of
            {' '}
            {assetFilesUpload.assetName}
          </span>,
          message: 'Done done :)',
        };
      case NotificationStatus.INFO:
        return {
          title: `Updating the files of ${assetFilesUpload.assetName}`,
          message: slowEthereumMessage,
        };
      case NotificationStatus.ERROR:
        return {
          title: `Failed to update the files of ${assetFilesUpload.assetName}`,
          message: transactionFailed,
        };
      default:
        return null;
    }
  } else if (metamask) {
    const { operationType } = metamask;
    switch (operationType) {
      case NotificationsMetamask.LIST_ASSET:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Listing ${metamask.assetName} for investors`,
              message: approveTemplateMessage('list the asset'),
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      case NotificationsMetamask.FUNDING:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Contributing to ${metamask.assetName}`,
              message: approveTemplateMessage('contribute to the crowdsale'),
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      case NotificationsMetamask.WITHDRAW_INVESTOR:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Withdrawing profits of ${metamask.assetName}`,
              message: approveTemplateMessage('withdraw your profits'),
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      case NotificationsMetamask.WITHDRAW_COLLATERAL:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Withdrawing collateral of ${metamask.assetName}`,
              message: approveTemplateMessage('withdraw your collateral'),
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      case NotificationsMetamask.WITHDRAW_MANAGER:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Withdrawing profits of ${metamask.assetName}`,
              message: approveTemplateMessage('withdraw your profits'),
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      case NotificationsMetamask.ASSET_PAYOUT:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Sending funds to Operator of ${metamask.assetName}`,
              message: approveTemplateMessage('send the crowdsale funds to the Operator'),
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      case NotificationsMetamask.APPROVE:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Approving access to ${metamask.formattedAmount}`,
              message: approveTemplateMessage('approve access to funds'),
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      case NotificationsMetamask.ASSET_FILES_UPLOAD:
        switch (status) {
          case NotificationStatus.INFO:
            return {
              title: `Approving change in files of ${metamask.assetName}`,
              message: `Please confirm the transaction in Metamask to register this action in the ethereum network. Your asset will
                        be removed from the platform eventually otherwise, once we update the platform to only rely on data from IPFS.`,
            };
          case NotificationStatus.ERROR:
            return undefined;
          default:
            return null;
        }
      default:
        return null;
    }
  }
};

const slowEthereumMessage = 'It may take several minutes for this action to be processed by the Ethereum Network. Meanwhile, you can explore the platform.';
const approveTemplateMessage = chunk => `Please confirm the transaction in Metamask to ${chunk}.`;
const transactionFailed = 'Unfortunately your transaction failed. Please refresh the page and try again.';
