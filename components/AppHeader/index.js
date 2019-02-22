import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Logo from 'components/Logo';
import ExchangeRate from 'components/ExchangeRate';
import Balance from 'components/Balance';
import Address from 'ui/Address';
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
import HamburguerIcon from 'static/hamburguer-icon.svg';

const AppHeader = ({
  user,
  prices,
  readOnlyMode,
  hideOnMobile,
  currentPath,
  handleMobileMenuState,
}) => {
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
            {!readOnlyMode && (
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
          {!readOnlyMode && (
            <AppHeaderSection
              noPadding
              isAddress
            >
              <Address {...user} />
            </AppHeaderSection>
          )}
          <AppHeaderHamburguerButton onClick={() => handleMobileMenuState(true)}>
            <HamburguerIcon />
          </AppHeaderHamburguerButton>
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

export default AppHeader;
