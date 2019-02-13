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
import StyledAppheader from './styledAppHeader';
import StyledLogoAndInfo from './styledLogoAndInfo';
import StyledLogo from './styledLogo';
import StyledBancorWidget from './styledBancorWidget';
import StyledSection from './styledSection';
import StyledHamburguerButton from './styledHamburguerButton';
import StyledAppHeaderPageName from './styledAppHeaderPageName';
import HamburguerIcon from 'static/hamburguer-icon.svg';

const AppHeader = ({
  user,
  prices,
  readOnlyMode,
  show,
  hideAt,
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
        <StyledAppheader
          show={show}
          hideAt={hideAt}
        >
          <StyledLogoAndInfo>
            <StyledLogo>
              <Logo onCLick={() => Router.push('/explore')}/>
            </StyledLogo>
            <StyledAppHeaderPageName>
              {pageName}
            </StyledAppHeaderPageName>
            <StyledSection>
              <ExchangeRate
                {...prices.mybit}
              />
            </StyledSection>
            {!readOnlyMode && (
              <StyledSection>
              <Balance
                {...user}
              />
              </StyledSection>
            )}
          </StyledLogoAndInfo>
          <StyledBancorWidget>
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
          </StyledBancorWidget>
          {!readOnlyMode && (
            <StyledSection
              noPadding
              isAddress
            >
              <Address {...user} />
            </StyledSection>
          )}
          <StyledHamburguerButton onClick={() => handleMobileMenuState(true)}>
            <HamburguerIcon />
          </StyledHamburguerButton>
        </StyledAppheader>
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
