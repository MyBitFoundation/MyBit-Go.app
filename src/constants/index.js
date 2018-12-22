/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable function-paren-newline */

import React from 'react';
import CryptoMining from '../images/categories/Cryptomining.jpg';
import Storage from '../images/categories/Storage.jpg';
import Bitcoinatm from '../images/categories/Bitcoinatm.jpg';
import Solar from '../images/categories/Solar1.jpg';
import Coworking from '../images/categories/Co-working.jpg';

export const ethereumNetwork = 'ropsten';

export const MYBIT_TICKER_COINMARKETCAP = 1902;
export const ETHEREUM_TICKER_COINMARKETCAP = 1027;

export const METAMASK_FIREFOX = 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
export const METAMASK_CHROME = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
export const METAMASK_OPERA = 'https://addons.opera.com/extensions/details/metamask/';

export const fetchTransactionHistoryTime = 60 * 1000;
export const loadMetamaskUserDetailsTime = 5 * 1000;
export const pullAssetsFromServerTime = 30 * 1000;
export const fetchAssetsFromWeb3Time = 30 * 1000;
export const checkIfLoggedInTime = 5 * 1000;

export const ETHERSCAN_TX_BY_ADDR_ENDPOINT = address =>
  `https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc`;
export const ETHERSCAN_TX = txHash =>
  `https://api-ropsten.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${txHash}`;
export const ETHERSCAN_BALANCE = address =>
  `https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}`;

export const serverIp = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/assets' : '/api/assets';
export const debug = process.env.NODE_ENV === 'development' ? console.log : () => {};

const testEnabledAssetIdsData = {
  '0x8d896c37eb6f50f35ddefe472f91f51d30faff549cd251e5f8a4a90a471ab0c8': {
    name: 'Test asset for development 1',
    city: 'Zurich',
    country: 'Switzerland',
    description: 'Test description',
    details: 'Test details',
    imgSrc: CryptoMining,
  },
  '0x4b2ee232401b105c8a92fade0722e56b428f6d41ec99053ccbb82b9e7c1e1b22': {
    name: 'Test asset for development 2',
    city: 'Zurich',
    country: 'Switzerland',
    description: 'Test description',
    details: 'Test details',
    imgSrc: CryptoMining,
  },
  '0x769d3fff60149b2037323933c28ddd3284f072bd83c376b6e5f36cd61ad31316': {
    name: 'Test asset for development 3',
    city: 'Zurich',
    country: 'Switzerland',
    description: 'Test description',
    details: 'Test details',
    imgSrc: CryptoMining,
  },
  '0x171705b3ea7e2cb6df9f4efa06ee550939cee76d5b861a1e40f19122da715112': {
    name: 'Test asset for development 4',
    city: 'Zurich',
    country: 'Switzerland',
    description: 'Test description',
    details: 'Test details',
    imgSrc: CryptoMining,
  },
};

export const testAssetIds = Object.keys(testEnabledAssetIdsData);

const CoworkingAsset = {
  name: 'Co-Working at Trust Square',
  city: 'Zurich',
  country: 'Switzerland',
  description: 'This space is a great fit for a entrepreneurs, start-up teams, and freelancers. It is in an amazing location a few blocks from the lake in Zurich. With access to many major businesses and shops within walking distance it is great not only for working, but also for networking and expanding your professional relationships.',
  details: 'Air conditioning Fiber Internet 24/7 Access Security Reception 98% building occupancy rate (high-demand) Specific Location: Located across from Swiss National Bank Rent Term: Annual contract, paid quarterly',
  imageSrc: Coworking,
};

const StorageAsset = {
  name: 'Climate Controlled Garage',
  city: 'Prague',
  country: 'Czech Republic',
  description: 'This space is a great fit for a range of assets from artwork to household furniture. It can be accessed remotely from an external door 24/7 and offers dedicated lock boxes inside for an additional cost to customers. It is important to note that security cameras are not active at this location.',
  details: 'Fully climate controlled space Enforced by Slock.it 40m Squared Suitable for low to mid value items Option for dedicated lock boxes 50x50x70cm Specific Location: Hidden for user protection Rent Term: Per square meter, monthly contract.',
  imageSrc: Storage,
};

const CryptoMiningAsset = {
  name: 'Ethereum Asic',
  city: 'Zug',
  country: 'Switzerland',
  description: 'The Bitmain E3 model is the most powerful Ethereum Miner to date. It offers modest power consumption, advanced cooling, and high performance.',
  details: 'Manufactured by Bitmain Model: E3 Total Hash Rate: 180 MH/s Algorithm: EThash Specific Location: Crypto Valley Labs, Zug, Switzerland',
  imageSrc: CryptoMining,
};

const BitcoinAtmAsset = {
  name: 'Bitcoin ATM',
  city: 'Berlin',
  country: 'Germany',
  description: 'Manufactured by General Bytes in Prague, Czech Republic. Model: BATMThreeXXL Supports Bitcoin and Ethereum purchases and sales. Average fee per transaction is 5.5%. Specific Location: Berlin Ostbahnhof',
  details: 'The BATMThreeXXL model is our ultimate configuration. It features a bill-acceptor with a cashbox that holds 2200 banknotes, a bill-dispenser with a capacity of 1000 banknotes (2x500) and an additional internal keypad lock on an internal safe. A keypad locked internal safe is usually a requirement for automatic collection by an armoured money transport service.',
  imageSrc: Bitcoinatm,
};

const SolarAsset = {
  name: 'Smart Bench',
  city: 'Dubai',
  country: 'UAE',
  description: 'Manufactured by Arabco Smart Technology in Dubai, UAE Model: Steora Monetisation: Wi-Fi hotspot subscriptions and advertisements Specific Location: Dubai Mall',
  details: 'Steora is the most ingenious smart bench ever designed. Its beautiful and timeless design hides multiple functionalities. With its perfect size and shape, Steora street bench easily adds allure to any outdoor location. Strong, powder-coated steel construction is completely weather-resistant and vandal-resistant. It offers wireless device charging, super fast internet connection, and data capturing.',
  imageSrc: Solar,
};


export const isAssetIdEnabled = (assetId) => {
  let enabledAssetIds = {
    // first wave of assets
    '0x116dc7388854d37e952a811c1fa2e03369809eef84b7a49ce9ce9536b5f2c66b': CoworkingAsset,
    '0x5125edb815829e8eb1f1944ffb6a4df0365e0340afa018195ba00b5631616657': StorageAsset,
    '0x77577554da83a746eca3b1ba093942c07535ca946a3561b49f48394c965d641c': CryptoMiningAsset,
    '0x8aa3395398fa2d443fe536246271f41fe5064be02223015e79bec113821ab48b': BitcoinAtmAsset,
    '0xf6e31cc03282ca18d3914af15a364b846a4327b40807f9930034d4380c333c8f': SolarAsset,

    // second wave of assets
    '0x22d490637f59e4177d7325da206ffec7c1a9dd5c411b2bf4014d08059fbe2127': BitcoinAtmAsset,
    '0x0250e6230d7c4023cab32ed122aacb6ec64ee1f5d7bb02b81d1b3cfbab4fd3d4': SolarAsset,
    '0x279de10410e6a69f800689137d9a7f77677cff73875b831ef0e817f54e4d7cbd': CryptoMiningAsset,
    '0xaab978d696b90cd6747b30df1e9c8300d50d55aa296e4f389b7d95683a86b644': StorageAsset,
    '0xddbe66fe4cb8a7f34ebe8f8da3feb49e2f51e9158d9adb8a66b75a89673879b4': CoworkingAsset,

    // third wave of assets
    '0x8fccb958606876ec566e7632b9e4b9f48b5b2a5e96549fa8b2d6570629789d15': BitcoinAtmAsset,
    '0x63eee2f0f92d6090b7b36e4eff15e37c25828d6f627a0eeb852da69ae5a471a4': SolarAsset,
    '0x9eaea5a21b1d2157ad5e6007428d0faa24ce3fce10782fb8f7936df2cc0e8646': CryptoMiningAsset,
    '0x435e01ca99c418d6154d084933e6cc22604dcb8e00b1431065eb59bddedbf876': StorageAsset,
    '0x6099fe40bbf8f967f6cf4b4a6674b78388225ab4f7ec14136dd3a404a6bf5012': CoworkingAsset,

    // forth wave of assets
    '0x33a65575a2ea5f315e35a049e6b8d6e6bf49f89c361fab745fcf9eecdb23a88a': BitcoinAtmAsset,
    '0x20460e88ce50cca9bac4c67bc9939c6d4ae7b7a86e4629f703c01fac97e3dd92': SolarAsset,
    '0xd3dc362b8292b158a6cdc6036ab5ddff81008633ecdbf7b135d421999117b8bc': CryptoMiningAsset,
    '0x6e854951a4fc99f8d9aca5fd3d3ca06bd2eff580a2da1feb5730c38d1f32e884': StorageAsset,
    '0x15050ed0e7c24fc4605e19cd21e774a2326654535e0f3ed271b45d128bde95f4': CoworkingAsset,

    // fifth wave of assets
    '0x6cc0911691b682f76b6fcdef2364f79bca4303382cb494e652d3c7d5ae7927b0': BitcoinAtmAsset,
    '0x4fcd57563c306e06ee093a3fffa7cabf78f37b9adf43917ca0c9a1f356163fc1': SolarAsset,
    '0xd08679987c51bd7d5b0bbfc26966d2fc2d53b8ae6f914fe8133ddadb891e12be': CoworkingAsset,

    // sixth wave of assets
    '0x845967f73ff423ee3f137ea2dcf6fba75c315e51633a6931268b5af2628bb7e4': StorageAsset,

    //seventh wave of assets
    '0x8d8ef956a9df74a65750495e3daa7e1db768dc6b1ec5bdeaf4ccb59eec1f1b72': CoworkingAsset,
    '0x07526bd23070c1690cd82c35a3b81e1efd79d77d87cd1650c6285416907ba404': StorageAsset,
    '0xb6b1783a50b4eebdfdac574e49d2bca295b0ef84c2965b9de0752f72c5eca764': CryptoMiningAsset,
    '0xaaed38e80f289be2fede11d7f929790f49d4d6b20d63514d650c8456de66426a': BitcoinAtmAsset,
    '0xf2140db78a524e7a2640cdfec65d60f674d0015e0a3c908e23d16fc6b8f448a4': SolarAsset,
  };

  if (process.env.NODE_ENV === 'development') {
    enabledAssetIds = {
      ...enabledAssetIds,
      ...testEnabledAssetIdsData,
    };
  }

  return enabledAssetIds[assetId];
};

export const metamaskErrors = (
  className, userHasMetamask, extensionUrl, isBraveBrowser, userIsLoggedIn, network,
) => {
  let toRender = null;
  if (!userHasMetamask && extensionUrl && !isBraveBrowser) {
    toRender = (
      <p>Please connect via <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a> to confirm contribution.
        You can download the extension via{' '}
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer">this</a> link.
      </p>
    );
  } else if (!userHasMetamask && !extensionUrl && !isBraveBrowser) {
    toRender = (
      <div>
        <span>Your browser is not supported. Metamask supports the following browsers:
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
        The Brave browser comes pre-installed with Metamask, please enable it to contribute. Click{' '}
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
      <p>Please login in Metamask to be able to contribute.</p>
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
