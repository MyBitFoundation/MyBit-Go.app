import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'carbon-components-react';
import '../styles/MetamaskAudit.css';
import MetamaskLogo from '../images/metamask.svg';

const MetamaskNetwork = () => (
  <Modal className="MetamaskAudit" open passiveModal>
    <p className="MetamaskAudit__title">
        MyBit Go DAPP is in alpha test release.<br/>
        Please rearrange to Ropsten Test Network
    </p>
    <img
      className="MetamaskAudit__metamaskfox-image"
      src={MetamaskLogo}
      alt="Metamask"
    />
    
    <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
      <Button
        small
        kind="secondary"
        className="MetamaskAudit__metamaskmanual-button"
      >
        What d fck is Ropsten Network?
      </Button>
    </a>
    <br />
  </Modal>
);

MetamaskNetwork.propTypes = {
};

export default MetamaskNetwork;
