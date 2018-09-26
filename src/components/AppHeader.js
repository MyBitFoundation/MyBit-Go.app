import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

import '../styles/AppHeader.css';
import Logo from './Logo';
import ExchangeRate from './ExchangeRate';
import AccountInfo from './AccountInfo';
import Address from './Address';

const AppHeader = ({ user, prices }) => (
  <div className="AppHeader">
    <Row>
      <Col span={9}>
        <Logo className="AppHeader__logo" />
        <ExchangeRate {...prices} />
        <AccountInfo {...user} />
      </Col>
      <Col span={7}>
        <h3>BANCOR GOES HERE</h3>
      </Col>
      <Col span={8}>
        <Address {...user} />
      </Col>
    </Row>
  </div>
);

export default AppHeader;

AppHeader.propTypes = {
  prices: PropTypes.shape({ params: PropTypes.object }).isRequired,
  user: PropTypes.shape({ params: PropTypes.object }).isRequired,
};
