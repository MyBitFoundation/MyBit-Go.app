import React from 'react';
import {
  CORRECT_NETWORK,
} from '../constants';

const metamaskErrors = (
  className,
  userHasMetamask,
  extensionUrl,
  isBraveBrowser,
  userIsLoggedIn,
  network,
  enabled,
) => {
  let toRender = null;
  if (!userHasMetamask && extensionUrl && !isBraveBrowser) {
    toRender = (
      <p>Please connect via <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">MetaMask</a> to be able to fund and create assets.
        You can download the extension via{' '}
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer">this</a> link.
      </p>
    );
  } else if (!userHasMetamask && !extensionUrl && !isBraveBrowser) {
    toRender = (
      <div>
        <span>Your browser is not supported. MetaMask supports the following browsers:
          <a
            href="https://www.google.com/chrome/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Chrome
          </a>,
          <a
            href="https://www.mozilla.org/en-US/firefox/new/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Firefox
          </a>,
          <a
            href="https://www.opera.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Opera
          </a>{' '}
          or
          <a
            href="https://brave.com/download/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            Brave
          </a>
        </span>
      </div>
    );
  } else if (!userHasMetamask && isBraveBrowser) {
    toRender = (
      <p>
        The Brave browser comes pre-installed with MetaMask, please enable it to contribute. Click{' '}
        <a
          href="https://brave.com/into-the-blockchain-brave-with-metamask/"
          target="_blank"
          rel="noopener noreferrer"
        >
         here
        </a>
        {' '}to see how.
      </p>
    );
  } else if (userHasMetamask && !userIsLoggedIn) {
    toRender = (
      <p>Please login in MetaMask to be able to contribute.</p>
    );
  } else if(enabled === false){
    toRender = (
      <p><span className="MetamaksErrors__connect" onClick={window.ethereum.enable}>Connect</span> your MetaMask account to get started.</p>
    );
  } else if (network !== CORRECT_NETWORK) {
    toRender = (
      <p>
        The main Ethereum network is not supported yet,
        please change to the Ropsten network to contribute.
      </p>
    );
  }
  return toRender && (
    <div className={className}>
      {toRender}
    </div>
  );
};

export default metamaskErrors;
