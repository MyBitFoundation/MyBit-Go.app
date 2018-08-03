import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'carbon-components-react';
import '../styles/MetamaskAudit.css';
import MetamaskLogo from '../images/metamask.svg';

const MetamaskBooting = ({ isBraveBrowser, extensionUrl }) => (
  <Modal className="MetamaskAudit" open passiveModal>
    <p className="MetamaskAudit__title">
      {isBraveBrowser ? (
        <p>
          To start investing, please <br /> install Metamask.
        </p>
      ) : (
        <p>
          To start investing, please <br /> connect your wallet.
        </p>
      )}
    </p>
    <img
      className="MetamaskAudit__metamaskfox-image"
      src={MetamaskLogo}
      alt="Metamask"
    />
    {!isBraveBrowser && (
      <div>
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer">
          <Button
            small
            kind="primary"
            className="MetamaskAudit__metamaskinstall-button"
          >
            Install Metamask and Refresh
          </Button>
        </a>
        <br />
      </div>
    )}
    <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
      <Button
        small
        kind="secondary"
        className="MetamaskAudit__metamaskmanual-button"
      >
        What is Metamask?
      </Button>
    </a>
    <br />
  </Modal>
);

MetamaskBooting.propTypes = {
  isBraveBrowser: PropTypes.bool.isRequired,
  extensionUrl: PropTypes.string.isRequired
};

export default MetamaskBooting;
