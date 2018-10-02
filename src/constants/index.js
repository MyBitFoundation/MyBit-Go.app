/* eslint-disable no-console */
import Bitcoin from '../images/categories/Bitcoinatm.jpeg';
import CoWorking from '../images/categories/Co-working.png';
import CryptoMining from '../images/categories/Cryptomining.jpeg';
import Storage from '../images/categories/Storage.jpeg';
import Energy from '../images/categories/Solar1.jpeg';


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
export const ETHERSCAN_BALANCE = address =>
  `https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${address}`;

export const isAssetIdEnabled = (assetId) => {
  const enabledAssetIds = {
    //first wave of assets
    '0x116dc7388854d37e952a811c1fa2e03369809eef84b7a49ce9ce9536b5f2c66b': {
      name: 'Co-Working at Trust Square',
      city: 'Zurich',
      country: 'Switzerland',
      description: 'This space is a great fit for a entrepreneurs, start-up teams, and freelancers. It is in an amazing location a few blocks from the lake in Zurich. With access to many major businesses and shops within walking distance it is great not only for working, but also for networking and expanding your professional relationships.',
      details: 'Air conditioning Fiber Internet 24/7 Access Security Reception 98% building occupancy rate (high-demand) Specific Location: Located across from Swiss National Bank Rent Term: Annual contract, paid quarterly',
      imgSrc: CoWorking,
    },
    '0x5125edb815829e8eb1f1944ffb6a4df0365e0340afa018195ba00b5631616657': {
      name: 'Climate Controlled Garage',
      city: 'Prague',
      country: 'Czech Republic',
      description: 'This space is a great fit for a range of assets from artwork to household furniture. It can be accessed remotely from an external door 24/7 and offers dedicated lock boxes inside for an additional cost to customers. It is important to note that security cameras are not active at this location.',
      details: 'Fully climate controlled space Enforced by Slock.it 40m Squared Suitable for low to mid value items Option for dedicated lock boxes 50x50x70cm Specific Location: Hidden for user protection Rent Term: Per square meter, monthly contract.',
      imgSrc: Storage,
    },
    '0x77577554da83a746eca3b1ba093942c07535ca946a3561b49f48394c965d641c': {
      name: 'Ethereum Asic',
      city: 'Amsterdam',
      country: 'Netherlands',
      description: 'The Bitmain E3 model is the most powerful Ethereum Miner to date. It offers modest power consumption, advanced cooling, and high performance.',
      details: 'Manufactured by Bitmain Model: E3 Total Hash Rate: 180 MH/s Algorithm: EThash Specific Location: Crypto Valley Labs, Zug, Switzerland',
      imgSrc: CryptoMining,
    },
    '0x8aa3395398fa2d443fe536246271f41fe5064be02223015e79bec113821ab48b': {
      name: 'Bitcoin ATM',
      city: 'Zug',
      country: 'Switzerland',
      description: 'Manufactured by General Bytes in Prague, Czech Republic. Model: BATMThreeXXL Supports Bitcoin and Ethereum purchases and sales. Average fee per transaction is 5.5%. Specific Location: Berlin Ostbahnhof',
      details: 'The BATMThreeXXL model is our ultimate configuration. It features a bill-acceptor with a cashbox that holds 2200 banknotes, a bill-dispenser with a capacity of 1000 banknotes (2x500) and an additional internal keypad lock on an internal safe. A keypad locked internal safe is usually a requirement for automatic collection by an armoured money transport service.',
      imgSrc: Bitcoin,
    },
    '0xf6e31cc03282ca18d3914af15a364b846a4327b40807f9930034d4380c333c8f': {
      name: 'Smart Bench',
      city: 'Dubai',
      country: 'UAE',
      description: 'Manufactured by Arabco Smart Technology in Dubai, UAE Model: Steora Monetisation: Wi-Fi hotspot subscriptions and advertisements Specific Location: Dubai Mall',
      details: 'Steora is the most ingenious smart bench ever designed. Its beautiful and timeless design hides multiple functionalities. With its perfect size and shape, Steora street bench easily adds allure to any outdoor location. Strong, powder-coated steel construction is completely weather-resistant and vandal-resistant. It offers wireless device charging, super fast internet connection, and data capturing.',
      imgSrc: Energy,
    },

    //second wave of assets
    '0x22d490637f59e4177d7325da206ffec7c1a9dd5c411b2bf4014d08059fbe2127': {
      name: 'Bitcoin ATM',
      city: 'Zug',
      country: 'Switzerland',
      description: 'Manufactured by General Bytes in Prague, Czech Republic. Model: BATMThreeXXL Supports Bitcoin and Ethereum purchases and sales. Average fee per transaction is 5.5%. Specific Location: Berlin Ostbahnhof',
      details: 'The BATMThreeXXL model is our ultimate configuration. It features a bill-acceptor with a cashbox that holds 2200 banknotes, a bill-dispenser with a capacity of 1000 banknotes (2x500) and an additional internal keypad lock on an internal safe. A keypad locked internal safe is usually a requirement for automatic collection by an armoured money transport service.',
      imgSrc: Bitcoin,
    },
    '0x0250e6230d7c4023cab32ed122aacb6ec64ee1f5d7bb02b81d1b3cfbab4fd3d4': {
      name: 'Smart Bench',
      city: 'Dubai',
      country: 'UAE',
      description: 'Manufactured by Arabco Smart Technology in Dubai, UAE Model: Steora Monetisation: Wi-Fi hotspot subscriptions and advertisements Specific Location: Dubai Mall',
      details: 'Steora is the most ingenious smart bench ever designed. Its beautiful and timeless design hides multiple functionalities. With its perfect size and shape, Steora street bench easily adds allure to any outdoor location. Strong, powder-coated steel construction is completely weather-resistant and vandal-resistant. It offers wireless device charging, super fast internet connection, and data capturing.',
      imgSrc: Energy,
    },
    '0x279de10410e6a69f800689137d9a7f77677cff73875b831ef0e817f54e4d7cbd': {
      name: 'Ethereum Asic',
      city: 'Amsterdam',
      country: 'Netherlands',
      description: 'The Bitmain E3 model is the most powerful Ethereum Miner to date. It offers modest power consumption, advanced cooling, and high performance.',
      details: 'Manufactured by Bitmain Model: E3 Total Hash Rate: 180 MH/s Algorithm: EThash Specific Location: Crypto Valley Labs, Zug, Switzerland',
      imgSrc: CryptoMining,
    },
    '0xaab978d696b90cd6747b30df1e9c8300d50d55aa296e4f389b7d95683a86b644': {
      name: 'Climate Controlled Garage',
      city: 'Prague',
      country: 'Czech Republic',
      description: 'This space is a great fit for a range of assets from artwork to household furniture. It can be accessed remotely from an external door 24/7 and offers dedicated lock boxes inside for an additional cost to customers. It is important to note that security cameras are not active at this location.',
      details: 'Fully climate controlled space Enforced by Slock.it 40m Squared Suitable for low to mid value items Option for dedicated lock boxes 50x50x70cm Specific Location: Hidden for user protection Rent Term: Per square meter, monthly contract.',
      imgSrc: Storage,
    },
    '0xddbe66fe4cb8a7f34ebe8f8da3feb49e2f51e9158d9adb8a66b75a89673879b4': {
      name: 'Co-Working at Trust Square',
      city: 'Zurich',
      country: 'Switzerland',
      description: 'This space is a great fit for a entrepreneurs, start-up teams, and freelancers. It is in an amazing location a few blocks from the lake in Zurich. With access to many major businesses and shops within walking distance it is great not only for working, but also for networking and expanding your professional relationships.',
      details: 'Air conditioning Fiber Internet 24/7 Access Security Reception 98% building occupancy rate (high-demand) Specific Location: Located across from Swiss National Bank Rent Term: Annual contract, paid quarterly',
      imgSrc: CoWorking,
    },
    // third wave of assets
    '0x8fccb958606876ec566e7632b9e4b9f48b5b2a5e96549fa8b2d6570629789d15': {
      name: 'Bitcoin ATM',
      city: 'Zug',
      country: 'Switzerland',
      description: 'Manufactured by General Bytes in Prague, Czech Republic. Model: BATMThreeXXL Supports Bitcoin and Ethereum purchases and sales. Average fee per transaction is 5.5%. Specific Location: Berlin Ostbahnhof',
      details: 'The BATMThreeXXL model is our ultimate configuration. It features a bill-acceptor with a cashbox that holds 2200 banknotes, a bill-dispenser with a capacity of 1000 banknotes (2x500) and an additional internal keypad lock on an internal safe. A keypad locked internal safe is usually a requirement for automatic collection by an armoured money transport service.',
      imgSrc: Bitcoin,
    },
    '0x63eee2f0f92d6090b7b36e4eff15e37c25828d6f627a0eeb852da69ae5a471a4': {
      name: 'Smart Bench',
      city: 'Dubai',
      country: 'UAE',
      description: 'Manufactured by Arabco Smart Technology in Dubai, UAE Model: Steora Monetisation: Wi-Fi hotspot subscriptions and advertisements Specific Location: Dubai Mall',
      details: 'Steora is the most ingenious smart bench ever designed. Its beautiful and timeless design hides multiple functionalities. With its perfect size and shape, Steora street bench easily adds allure to any outdoor location. Strong, powder-coated steel construction is completely weather-resistant and vandal-resistant. It offers wireless device charging, super fast internet connection, and data capturing.',
      imgSrc: Energy,
    },
    '0x9eaea5a21b1d2157ad5e6007428d0faa24ce3fce10782fb8f7936df2cc0e8646': {
      name: 'Ethereum Asic',
      city: 'Amsterdam',
      country: 'Netherlands',
      description: 'The Bitmain E3 model is the most powerful Ethereum Miner to date. It offers modest power consumption, advanced cooling, and high performance.',
      details: 'Manufactured by Bitmain Model: E3 Total Hash Rate: 180 MH/s Algorithm: EThash Specific Location: Crypto Valley Labs, Zug, Switzerland',
      imgSrc: CryptoMining,
    },
    '0x435e01ca99c418d6154d084933e6cc22604dcb8e00b1431065eb59bddedbf876': {
      name: 'Climate Controlled Garage',
      city: 'Prague',
      country: 'Czech Republic',
      description: 'This space is a great fit for a range of assets from artwork to household furniture. It can be accessed remotely from an external door 24/7 and offers dedicated lock boxes inside for an additional cost to customers. It is important to note that security cameras are not active at this location.',
      details: 'Fully climate controlled space Enforced by Slock.it 40m Squared Suitable for low to mid value items Option for dedicated lock boxes 50x50x70cm Specific Location: Hidden for user protection Rent Term: Per square meter, monthly contract.',
      imgSrc: Storage,
    },
    '0x6099fe40bbf8f967f6cf4b4a6674b78388225ab4f7ec14136dd3a404a6bf5012': {
      name: 'Co-Working at Trust Square',
      city: 'Zurich',
      country: 'Switzerland',
      description: 'This space is a great fit for a entrepreneurs, start-up teams, and freelancers. It is in an amazing location a few blocks from the lake in Zurich. With access to many major businesses and shops within walking distance it is great not only for working, but also for networking and expanding your professional relationships.',
      details: 'Air conditioning Fiber Internet 24/7 Access Security Reception 98% building occupancy rate (high-demand) Specific Location: Located across from Swiss National Bank Rent Term: Annual contract, paid quarterly',
      imgSrc: CoWorking,
    },
  };

  return enabledAssetIds[assetId];
};
