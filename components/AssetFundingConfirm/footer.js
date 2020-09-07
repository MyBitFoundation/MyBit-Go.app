import {
  METAMASK_ERRORS,
} from 'components/MetamaskContext/constants';
import { SUPPORTED_NETWORKS } from 'constants/supportedNetworks';
import SupportedBrowsers from 'ui/SupportedBrowsers';
import getTokenWithSufficientBalance from 'constants/getTokenWithSufficientBalance';

const getMetamaskErrors = (metamaskError, extensionUrl) => {
  switch (metamaskError) {
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
          onClick: async () => await window.ethereum.enable(),
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
          onClick: async () => await window.ethereum.enable(),
        },
      };
    case METAMASK_ERRORS.NOT_NETWORK:
      return {
        buttonProps: {
          text: 'Wrong Network Selected',
          error: true,
        },
        messageProps: {
          text: `Select one of the supported networks in MetaMask: ${
            SUPPORTED_NETWORKS.map((network, index) => index === SUPPORTED_NETWORKS.length - 1 ? network : `${network}, `)
            }`,
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

export const getFooter = (
  metamaskError,
  extensionUrl,
  amountToPay,
  amountContributed,
  balances,
  handleFundAsset,
  paymentToken,
  paymentTokenSymbol,
  kyberLoading
) => {
  if (kyberLoading) {
    return {
      buttonProps: {
        text: 'Loading data from Kyber',
        loading: true,
      }
    };
  }
  if (metamaskError) {
    return getMetamaskErrors(metamaskError, extensionUrl);
  }
  const tokenWithSufficientBalance = getTokenWithSufficientBalance(balances, amountContributed);
  if (!tokenWithSufficientBalance) {
    return getBalancesError();
  } else {
    return {
      buttonProps: {
        text: 'Confirm & Pay with MetaMask',
        onClick: () => handleFundAsset(amountToPay, amountContributed, paymentToken, paymentTokenSymbol),
      },
    }
  }
}
