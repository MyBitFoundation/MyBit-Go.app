import React from 'react';
import { Modal } from 'antd';
import '../styles/MetamaskAudit.css';
import MetamaskLogo from '../images/metamask.svg';

const MetamaskNetwork = () => (
  <Modal className="MetamaskAudit" visible closable={false} footer={null}>
    <p className="MetamaskAudit__title">
      The MyBit platform is still in testing,<br />
      please use the Ropsten test network.
    </p>
    <MetamaskLogo
      className="MetamaskAudit__metamaskfox-image"
    />
    <br />
  </Modal>
);

export default MetamaskNetwork;
