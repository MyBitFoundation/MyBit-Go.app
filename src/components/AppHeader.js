import React from 'react';
import PropTypes from 'prop-types';

import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';
import Address from './Address';
import { Consumer as BancorConsumer } from './UI/BancorContainer/index';
import Button from './UI/Button/index';
import Theme from './UI/theme/index';


import '../styles/BancorWidgetButton.css';

const AppHeader = ({
  user,
  prices,
  usingServer,
}) => (
  <BancorConsumer>
    {({ initBancor }) => (
      <div className="AppHeader">
        <div className="AppHeader__logo-and-info">
          <Logo className="AppHeader__logo" />
          <ExchangeRate
            {...prices}
          />
          {!usingServer && (
            <AccountInfo
              {...user}
            />
          )}
        </div>
        <div className="AppHeader__BancrorWidget-container">
          <div className="BancorWidget__button">
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
          </div>
        </div>
        {!usingServer && (
          <Address {...user} />
        )}
      </div>
    )}
  </BancorConsumer>
);

AppHeader.defaultProps = {
  prices: undefined,
};

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }),
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
  usingServer: PropTypes.bool.isRequired,
};

export default AppHeader;
