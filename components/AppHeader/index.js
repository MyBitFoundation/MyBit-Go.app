import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import ExchangeRate from '../ExchangeRate';
import Balance from '../Balance';
import Address from '../UI/Address';
import { Consumer as BancorConsumer } from '../UI/BancorContainer/index';
import Button from '../UI/Button/index';
import Theme from '../UI/Theme/index';
import StyledAppheader from './styledAppHeader';
import StyledLogoAndInfo from './styledLogoAndInfo';
import StyledLogo from './styledLogo';
import StyledBancorWidget from './styledBancorWidget';
import StyledSection from './styledSection';

const AppHeader = ({
  user,
  prices,
  readOnlyMode,
}) => (
  <BancorConsumer>
    {({ initBancor }) => (
      <StyledAppheader
        styling={Theme}
      >
        <StyledLogoAndInfo>
          <StyledLogo>
            <Logo/>
          </StyledLogo>
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
            styling={Theme.buttons.primary.blue}
            size="large"
            onClick={(e) => {
              e.preventDefault();
              initBancor();
            }}
            >
            Get MYB
          </Button>
        </StyledBancorWidget>
        {!readOnlyMode && (
          <Address {...user} />
        )}
      </StyledAppheader>
    )}
  </BancorConsumer>
);

AppHeader.defaultProps = {
  prices: undefined,
};

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }),
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  readOnlyMode: PropTypes.bool.isRequired,
};

export default AppHeader;
