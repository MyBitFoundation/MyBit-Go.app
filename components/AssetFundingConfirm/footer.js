import {
  METAMASK_ERRORS,
} from 'components/MetamaskChecker/constants';
import {
  CORRECT_NETWORK,
} from 'constants/app';
import SupportedBrowsers from 'ui/SupportedBrowsers';

const getMetamaskErrors = (metamaskError, extensionUrl) => {
  switch(metamaskError){
    case METAMASK_ERRORS.NO_METAMASK:
      return {
        buttonProps: {
          text: 'Install Metamask',
          href: extensionUrl,
        },
        messageProps: {
          text: 'What is MetaMask and How to get it',
          href: 'https://metamask.io/',
        }
      };
    case METAMASK_ERRORS.NOT_CONNECTED:
      return {
        buttonProps: {
          text: 'Connect MetaMask',
          onClick: window.ethereum.enable,
        },
      };
    case METAMASK_ERRORS.NOT_SUPPORTED:
      return {
        buttonProps: {
          text: 'Browser Not Supported',
          error: true,
        },
        messageProps: {
          text: (
            <span>The following browsers are supported: <SupportedBrowsers /></span>
          ),
        }
      };
    case METAMASK_ERRORS.NO_LOGIN:
      return {
        buttonProps: {
          text: 'Login in MetaMask',
          error: true,
        },
      };
    case METAMASK_ERRORS.NO_METAMASK:
      return {
        buttonProps: {
          text: 'Connect MetaMask',
          onClick: window.ethereum.enable,
        },
      };
    case METAMASK_ERRORS.NOT_NETWORK:
      return {
        buttonProps: {
          text: 'Wrong Network Selected',
          error: true,
        },
        messageProps: {
          text: `Select the ${CORRECT_NETWORK} network in MetaMask`,
        }
      };
  }
}

const getBalancesError = () => {
  return {
      buttonProps: {
        text: 'Insufficient Funds',
        error: true,
      },
      messageProps: {
        text: 'A bank is worth stealing if the plan is right.',
      }
    };
  }

export const getFooter = (metamaskError, extensionUrl, amountToPay, balances, handleFundAsset) => {
  if(metamaskError){
     return getMetamaskErrors(metamaskError, extensionUrl);
  }
  const tokenWithSufficientBalance = Object.values(balances).find(token => token.balanceInDai >= amountToPay);
  if(!tokenWithSufficientBalance){
    return getBalancesError();
  } else {
    return {
      buttonProps: {
        text: 'Confirm & Pay with MetaMask',
        onClick: handleFundAsset,
      },
    }
  }
}
