import React from 'react';
import { compose } from 'recompose'
import Link from 'next/link';
import PropTypes from 'prop-types';
import Logo from 'components/Logo';
import Balance from 'components/Balance';
import ConnectionStatus from 'components/ConnectionStatus';
import { Consumer as BancorConsumer } from 'ui/BancorContainer';
import AppHeaderContainer from './appHeaderContainer';
import AppHeaderLogo from './appHeaderLogo';
import AppHeaderHamburguerButton from './appHeaderHamburguerButton';
import AppHeaderPageName from './appHeaderPageName';
import AppHeaderConnectionStatus from './appHeaderConnectionStatus';
import { withBlockchainContext } from 'components/BlockchainContext';
import { withMetamaskContext } from 'components/MetamaskContext';
import { withNotificationsContext } from 'components/NotificationsContext';
import NotificationsMobileCounter from 'components/NotificationsMobile';
import AppHeaderNotificationCounter from './appHeaderNotificationCounter';
import AppHeaderAddress from './appHeaderAddress';
import AppHeaderBalance from './appHeaderBalance';
import {
  shortenAddress,
} from 'utils/helpers';

const AppHeader = ({
  metamaskContext,
  readOnlyMode,
  hideOnMobile,
  currentPath,
  handleMobileMenuState,
  notificationsContext,
}) => {
  const {
    user,
    isReadOnlyMode,
    metamaskErrors: getMetamaskErrors,
    network,
    loadingBalancesForNewUser,
  } = metamaskContext;

  const {
    notifications,
  } = notificationsContext;

  const notificationsNumberToRender = Object.keys(notifications).length;

  const metamaskErrors = getMetamaskErrors();

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
    case '/asset-managers':
      pageName = 'Asset Managers';
      break;
    default:
      pageName = '';
      break;
  }

  const balance = user && user.avgBalance;

  return (
    <AppHeaderContainer
      hideOnMobile={hideOnMobile}
    >
      <div style={{position: 'relative', height: '100%'}}>
        <Link href="/explore">
          <AppHeaderLogo>
            <Logo />
          </AppHeaderLogo>
        </Link>
        <AppHeaderPageName>
          {pageName}
        </AppHeaderPageName>
        {!isReadOnlyMode && (
          <AppHeaderBalance>
            <Balance
              balance={loadingBalancesForNewUser ? undefined : balance}
            />
          </AppHeaderBalance>
        )}
        <AppHeaderConnectionStatus>
          <React.Fragment>
            <ConnectionStatus
              metamaskErrors={metamaskErrors}
            />
            {!isReadOnlyMode && (
              <AppHeaderAddress>
                <span>{network}</span>
                <div/>
                <Link
                  as={`/asset-managers/${user.address}`}
                  href={`/asset-managers?id=${user.address}`}
                >
                  <span style={{cursor: 'pointer'}}>{shortenAddress(user.address, 4, 3)}</span>
                </Link>
              </AppHeaderAddress>
            )}
          </React.Fragment>
        </AppHeaderConnectionStatus>
        <AppHeaderHamburguerButton onClick={() => handleMobileMenuState(true)} />
        {notificationsNumberToRender > 0 && (
          <AppHeaderNotificationCounter>
            {notificationsNumberToRender}
          </AppHeaderNotificationCounter>
        )}
      </div>
    </AppHeaderContainer>
  )
};

const enhance = compose(
  withMetamaskContext,
  withNotificationsContext,
);

export default enhance(AppHeader);
