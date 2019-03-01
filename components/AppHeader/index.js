import React from 'react';
import { compose } from 'recompose'
import Router from 'next/router';
import PropTypes from 'prop-types';
import Logo from 'components/Logo';
import ExchangeRate from 'components/ExchangeRate';
import Balance from 'components/Balance';
import Address from 'ui/Address';
import ConnectionStatus from 'components/ConnectionStatus';
import { Consumer as BancorConsumer } from 'ui/BancorContainer';
import {
  Button,
} from 'antd';
import AppHeaderContainer from './appHeaderContainer';
import AppHeaderLogoAndInfo from './appHeaderLogoAndInfo';
import AppHeaderLogo from './appHeaderLogo';
import AppHeaderBancorWidget from './appHeaderBancorWidget';
import AppHeaderSection from './appHeaderSection';
import AppHeaderHamburguerButton from './appHeaderHamburguerButton';
import AppHeaderPageName from './appHeaderPageName';
import AppHeaderConnectionStatus from './appHeaderConnectionStatus';
import { withBlockchainContext } from 'components/Blockchain'
import { withMetamaskContext } from 'components/MetamaskChecker'
import { withTokenPricesContext } from 'components/TokenPrices'

const AppHeader = ({
  metamaskContext,
  pricesContext,
  readOnlyMode,
  hideOnMobile,
  currentPath,
  handleMobileMenuState,
}) => {
  const {
    user,
    isReadOnlyMode,
    metamaskErrors: getMetamaskErrors,
  } = metamaskContext;

  const metamaskErrors = getMetamaskErrors();

  const {
    prices,
  } = pricesContext;

  let pageName;
  switch (currentPath) {
    case '/explore':
      pageName = 'Explore';
      break;
    case '/portfolio':
      pageName = 'Portfolio';
      break;
    case '/watch-list':
      pageName = 'Watch List';
      break;
    case '/transaction-history':
      pageName = 'Transactions';
      break;
    case '/help':
      pageName = 'Help';
      break;
    default:
      pageName = '';
      break;
  }

  return (
    <BancorConsumer>
      {({ initBancor }) => (
        <AppHeaderContainer
          hideOnMobile={hideOnMobile}
        >
          <AppHeaderLogoAndInfo>
            <AppHeaderLogo>
              <Logo onCLick={() => Router.push('/explore')}/>
            </AppHeaderLogo>
            <AppHeaderPageName>
              {pageName}
            </AppHeaderPageName>
            <AppHeaderSection>
              <ExchangeRate
                {...prices.mybit}
              />
            </AppHeaderSection>
            {!isReadOnlyMode && (
              <AppHeaderSection>
              <Balance
                {...user.balances}
              />
              </AppHeaderSection>
            )}
          </AppHeaderLogoAndInfo>
          <AppHeaderBancorWidget>
            <Button
              size="large"
              type="primary"
              onClick={(e) => {
                e.preventDefault();
                initBancor();
              }}
            >
              Get MYB
            </Button>
          </AppHeaderBancorWidget>
          <AppHeaderConnectionStatus>
            <ConnectionStatus
              metamaskErrors={metamaskErrors}
            />
          </AppHeaderConnectionStatus>
          {!isReadOnlyMode && (
            <AppHeaderSection
              noPadding
              isAddress
            >
              <Address {...user} />
            </AppHeaderSection>
          )}
          <AppHeaderHamburguerButton onClick={() => handleMobileMenuState(true)} />
        </AppHeaderContainer>
      )}
    </BancorConsumer>
  )
};

AppHeader.defaultProps = {
  prices: undefined,
};

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }),
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  readOnlyMode: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
};

const enhance = compose(
  withMetamaskContext,
  withTokenPricesContext,
);

export default enhance(AppHeader);
