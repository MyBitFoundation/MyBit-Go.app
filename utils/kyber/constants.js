export const ABI = [{
  "constant": true,
  "inputs": [
    {
      "name": "src",
      "type": "address"
    },
    {
      "name": "dest",
      "type": "address"
    },
    {
      "name": "srcQty",
      "type": "uint256"
    }
  ],
  "name": "getExpectedRate",
  "outputs": [
    {
      "name": "expectedRate",
      "type": "uint256"
    },
    {
      "name": "slippageRate",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [
    {
      "name": "src",
      "type": "address"
    },
    {
      "name": "srcAmount",
      "type": "uint256"
    },
    {
      "name": "dest",
      "type": "address"
    },
    {
      "name": "destAddress",
      "type": "address"
    },
    {
      "name": "maxDestAmount",
      "type": "uint256"
    },
    {
      "name": "minConversionRate",
      "type": "uint256"
    },
    {
      "name": "walletId",
      "type": "address"
    }
  ],
  "name": "trade",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}]

export const ADDRESS = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';

/*
export const getSupportedTokensUrl = network =>
  `https://${network === 'ropsten' ? 'ropsten-' : ''}api.kyber.network/currencies`
*/
