/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable function-paren-newline */

import React from 'react';

export const ethereumNetwork = 'ropsten';

export const MYBIT_TICKER_COINMARKETCAP = 1902;
export const ETHEREUM_TICKER_COINMARKETCAP = 1027;

export const METAMASK_FIREFOX = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
export const METAMASK_CHROME = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
export const METAMASK_OPERA = 'https://addons.opera.com/extensions/details/metamask/';

const baseUrl = 'http://localhost'
const port = 8081;
const secondPort = 8082;
const host = `${baseUrl}:${port}`
const secondHost = `${baseUrl}:${secondPort}`

export const fetchTransactionHistoryTime = 60 * 1000;
export const loadMetamaskUserDetailsTime = 5 * 1000;
export const fetchAssetsFromWeb3Time = 30 * 1000;
export const checkIfLoggedInTime = 5 * 1000;
export const S3_URL = 'https://s3.eu-central-1.amazonaws.com/mybit-go/';
export const AIRTABLE_CATEGORIES_URL = process.env.NODE_ENV === 'development' ? `${host}/api/airtable/categories` : '/api/airtable/categories';
export const AIRTABLE_ASSETS_URL = process.env.NODE_ENV === 'development' ? `${host}/api/airtable/assets` : '/api/airtable/assets';
export const UPDATE_ASSETS_URL = process.env.NODE_ENV === 'development' ? `${host}/api/airtable/update` : '/api/airtable/update';
export const S3_UPLOAD_URL = process.env.NODE_ENV === 'development' ? `${host}/api/files/upload` : '/api/files/upload';
export const S3_ASSET_FILES_URL = process.env.NODE_ENV === 'development' ? `${host}/api/assets/files` : '/api/assets/files';
export const MYBIT_API_COLLATERAL = process.env.NODE_ENV === 'development' ? `${secondHost}/collateral` : 'https://api.mybit.io/collateral';

export const AIRTABLE_CATEGORIES_NUMBER_OF_FIELDS = 3;
export const AIRTABLE_ASSETS_NUMBER_OF_FIELDS = 6;
export const MAX_FILES_UPLOAD = 2;
export const MAX_FILE_SIZE = 5000000; //5 MB
export const BLOCK_NUMBER_CONTRACT_CREATION = 4619384;

export const ETHERSCAN_TX_BY_ADDR_ENDPOINT = address =>
  `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`;
export const ETHERSCAN_TX = txHash =>
  `https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}`;
export const ETHERSCAN_BALANCE = address =>
  `https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}`;

export const debug = process.env.NODE_ENV === 'development' ? console.log : () => {};

export const metamaskErrors = (
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
  } else if(enabled === false){
    toRender = (
      <p><span className="MetamaksErrors__connect" onClick={window.ethereum.enable}>Connect</span> your MetaMask account to get started.</p>
    );
  } else if (userHasMetamask && !userIsLoggedIn) {
    toRender = (
      <p>Please login in MetaMask to be able to contribute.</p>
    );
  } else if (network !== ethereumNetwork) {
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

export const COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
  ,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
  ,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
  ,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
  ,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
  ,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
  ,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
  ,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
  ,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
  ,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
  ,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
  ,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
  ,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
  ,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
  ,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

export const getDayInText = number => {
  switch(number){
    case 0: return 'Sun';
    case 1: return 'Mon';
    case 2: return 'Tue';
    case 3: return 'Wed';
    case 4: return 'Fri';
    case 5: return 'Thu';
    case 6: return 'Sat';
    default: return '';
  }
}

export const getMonthInText = number => {
  switch(number){
    case 0: return 'Jan';
    case 1: return 'Fev';
    case 2: return 'Mar';
    case 3: return 'Apr';
    case 4: return 'May';
    case 5: return 'Jun';
    case 6: return 'Jul';
    case 7: return 'Aug';
    case 8: return 'Set';
    case 9: return 'Oct';
    case 10: return 'Nov';
    case 11: return 'Dec';
    default: return '';
  }
}
