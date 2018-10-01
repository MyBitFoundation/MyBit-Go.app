import React from 'react';
import Wrong from '../images/wrong.svg';
import Check from '../images/check.svg';

export const TableRows = [{
  name: 'Single point of failure',
  mybit: <Wrong />,
  traditional: <Check />,
}, {
  name: 'Instant payments',
  mybit: <Check />,
  traditional: <Wrong />,
}, {
  name: 'Payment speed',
  mybit: '<1m',
  traditional: '3+ Days',
}, {
  name: 'Fees',
  mybit: '1%',
  traditional: '20%',
}, {
  name: 'Liquid',
  mybit: <Check />,
  traditional: <Wrong />,
}];

export const HowDoesItWork = [
  <p>First make sure you have <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">metamask</a> (on ropsten) and <a href="https://faucet.metamask.io/" target="_blank" rel="noopener noreferrer">testnet Ether</a></p>,
  <p>Once you find an asset, choose amount, and click contribute</p>,
  <p>After confirming the transactions via metamask you now own part of an asset</p>,
  <p>Once funding is finished, sit back and watch the revenue come in automatically</p>,
];
