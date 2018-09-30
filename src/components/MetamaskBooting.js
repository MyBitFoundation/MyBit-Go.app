import React from 'react';
import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

import '../styles/MetamaskAudit.css';
import MetamaskLogo from '../images/metamask.svg';

const MetamaskBooting = ({ isBraveBrowser, extensionUrl }) => {
  const visible = true;
  const closable = false;
  return (
    <Modal className="MetamaskAudit" visible={visible} closable={closable} footer={null}>
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
      <MetamaskLogo
        className="MetamaskAudit__metamaskfox-image"
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
}



MetamaskBooting.propTypes = {
  isBraveBrowser: PropTypes.bool.isRequired,
  extensionUrl: PropTypes.string.isRequired,
};

export default MetamaskBooting;
