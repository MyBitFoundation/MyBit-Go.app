/* eslint-disable no-console */

export const ARTIFICIAL_DELAY_IN_MS = 3000;
export const USD_MYB_SYMBOL = 'USD/MYB';
export const noop = () => {};
export const debug =
  process.env.NODE_ENV === 'development' ? console.log : noop;
export const MYBIT_TICKER_COINMARKETCAP = 1902;
export const ETHEREUM_TICKER_COINMARKETCAP = 1027;
// TODO: Needs to be implemented server-side, API_KEY needs to be created
export const ETHERSCAN_API_KEY = '';
export const ETHERSCAN_TX_BY_ADDR_ENDPOINT = (apiKey, address) =>
  `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${apiKey}`;
export const ETHERSCAN_TX = (apiKey, txHash) =>
  `https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}`;
export const METAMASK_FIREFOX =
  'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
export const METAMASK_CHROME =
  'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
export const METAMASK_OPERA =
  'https://addons.opera.com/extensions/details/metamask/';

export const getAssetRevenueTmp = (assetId) => {
  switch (assetId) {
    case '0x0903212121a0073f661f7cadf9079433fc0fe5b3418482a1bdb4631d52833f9f':
      return 120000;
    case '0x8aa3395398fa2d443fe536246271f41fe5064be02223015e79bec113821ab48b':
      return 31000;
    case '0x530c9733c3af8fc4a5813ee6e567ffa77986fe5e90421a99e86de35624a79481':
      return 14200;
    case '0x4a3286e836279d44527e8a7ded68b0d43fe8f186c2a3cbefe01de1c61ce293c9':
      return 28300;
    case '0xd3d05db10b53dbd58a9346448a293a9890b37b5bf28bef7411b8507d5fed0296':
      return 87000;
    case '0x887a04020d5dbb2d88714fe417c7088e1ce6e49b106073479784df1221e53298':
      return 69000;
    case '0x69ca2cabb1a0bbe06a0315a4faa6a4aa3d71519aaf3e35f43ff6ffe7c765b045':
      return 910000;
    case '0xf6e31cc03282ca18d3914af15a364b846a4327b40807f9930034d4380c333c8f':
      return 100000;
    case '0x77577554da83a746eca3b1ba093942c07535ca946a3561b49f48394c965d641c':
      return 33000;
    case '0x5125edb815829e8eb1f1944ffb6a4df0365e0340afa018195ba00b5631616657':
      return 67000;
    case '0x116dc7388854d37e952a811c1fa2e03369809eef84b7a49ce9ce9536b5f2c66b':
      return 83400;
    case '0x1491c5bb3e63712e701c9d8d2ce6d23509b4eb20a477e68e0f7346caed8b6189':
      return 99000;
    case '0xa09908974f8445894d39cb24c10fda31c4e13ecf2b22ee445c69854e2411e13a':
      return 121000;
    case '0x58d6ce3276b2453b8fa7bdb62970e0e3a166b4ecceecebf13d71f5161de79c0c':
      return 4120000;
    case '0x49848c1051233c57e21fd2b2531fdb1d393d586d44e5278a7fe4db0bc6a30b58':
      return 680000;
    case '0xd377f0f0d0e79208189158dee8582df6d39618168a767fb663664e04e1926119':
      return 1238200;
    case '0x11c0e5430f15c4ae8e1b2d7c0633808e592c1e5aea0c54dc2930f4fcc1d3be38':
      return 93120;
    case '0xb3bbab4c1c942f40db198dad5b36810f2d62880053b9ccf4639cb7f0a16796b5':
      return 981000;

    default:
      return 500000;
  }
};
