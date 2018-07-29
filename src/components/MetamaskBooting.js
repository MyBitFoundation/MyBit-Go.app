import React from 'react';
import { Modal, Button } from 'carbon-components-react';
import '../styles/MetamaskAudit.css';
import MetamaskLogo from '../images/metamask.svg';

const MetamaskBooting = () => (
  <Modal className="MetamaskAudit" open passiveModal>
    <p className="MetamaskAudit__title">
        To start investing, please <br /> connect your wallet.
    </p>
    <img className="MetamaskAudit__metamaskfox-image" src={MetamaskLogo} alt="Metamask" />
    <div small className="MetamaskAudit__metamaskinstall-button">
          Install Metamask and refresh
    </div>
    <br />
    <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
      <Button small kind="secondary" className="MetamaskAudit__metamaskmanual-button">
          What is Metamask?
      </Button>
    </a>
    <br />
    <a className="MetamaskAudit__metamaskfriendlyguide-link" href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        Try our handy step-by-step guide
    </a>
  </Modal>
);

export default MetamaskBooting;
