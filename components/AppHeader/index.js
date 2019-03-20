import React from 'react';
import { compose } from 'recompose'
import Router from 'next/router';
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
import { withBlockchainContext } from 'components/Blockchain'
import { withMetamaskContext } from 'components/MetamaskChecker'
import { withNotificationsContext } from 'components/NotificationsModule';
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
    default:
      pageName = '';
      break;
  }

  const balance = user && user.avgBalance;

  return (
    <BancorConsumer>
      {({ initBancor }) => (
        <AppHeaderContainer
          hideOnMobile={hideOnMobile}
        >
          <div style={{position: 'relative', height: '100%'}}>
            <AppHeaderLogo>
              <Logo onCLick={() => Router.push('/explore')}/>
            </AppHeaderLogo>
            <AppHeaderPageName>
              {pageName}
            </AppHeaderPageName>
            {!isReadOnlyMode && (
              <AppHeaderBalance>
                <Balance
                  balance={balance}
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
                    <span>{shortenAddress(user.address, 4, 3)}</span>
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
  withNotificationsContext,
);

export default enhance(AppHeader);
