import React from 'react';
import { Modal, Button } from 'carbon-components-react';
import '../styles/BrowserNotSupported.css';
import MetamaskLogo from '../images/metamask.svg';

const BrowserNotSupported = () => (
  <Modal className="BrowserNotSupported" open passiveModal>
    <p className="BrowserNotSupported__title">
        Download Metamask <br /> to get started.
    </p>
    <img className="BrowserNotSupported__metamaskfox-image" src={MetamaskLogo} alt="Metamask" />
    <p className="BrowserNotSupported__download-text">Download the browser extension on
      <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer"> Chrome</a>,
      <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank" rel="noopener noreferrer"> Firefox</a>,
      <a href="https://www.opera.com/" target="_blank" rel="noopener noreferrer"> Opera</a> or
      <a href="https://brave.com/download/" target="_blank" rel="noopener noreferrer"> Brave</a>
        .
    </p>
    <Button small className="BrowserNotSupported__metamasklogin-button">
        Your browser is not supported
    </Button>
    <br />
    <br />
  </Modal>
);

export default BrowserNotSupported;
