const solarPanel1 = require('../images/Solar-Panel.png');
const solarPanel2 = require('../images/Solar-Panel-2.png');
const bitcoinAtm = require('../images/bitcoin-atm.png');

export const assetsInfo =
[{
  image: solarPanel1,
  path: '/crypto-currency-atm',
  funded: '1000',
  goal: '4000',
  city: 'Lisbon',
  country: 'Portugal',
  name: 'Solar Powered Bench',
}, {
  image: solarPanel2,
  path: '/solar-energy',
  funded: '2000',
  goal: '4000',
  city: 'Lisbon',
  country: 'Portugal',
  name: 'Solar Powered Bench',
}, {
  image: bitcoinAtm,
  path: '/crypto-currency-atm',
  funded: '3000',
  goal: '4000',
  city: 'Lisbon',
  country: 'Portugal',
  name: 'Bitcoin ATM',
}, {
  image: bitcoinAtm,
  path: '/solar-energy',
  funded: '4000',
  goal: '4000',
  city: 'Lisbon',
  country: 'Portugal',
  name: 'Bitcoin ATM',
}];

export const assetInfo = {
  assetName: 'Bitcoin ATM',
  city: 'Zug',
  country: 'Switzerland',
  dueDate: new Date().setDate(new Date().getDate() + 2),
  raised: 50000,
  goal: 100000,
  investors: 5,
  minInvestment: 950,
  maxInvestment: 9990,
  expectedReturn: 18,
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis metus, pretium eget venenatis quis, fringilla in mauris. Phasellus sit amet massa tellus. Proin eros augue, lobortis eget ex sit amet, accumsan tristique lorem.',
  description:
    'Proin luctus, neque eget tincidunt molestie, orci leo fringilla mauris, at tristique nisl quam vel turpis. Curabitur aliquam ante ac nulla vulputate, non vehicula quam venenatis. Sed pellentesque est justo, ac faucibus ex rutrum a. Sed placerat magna vitae justo tempus, in imperdiet enim pellentesque. Ut eget pulvinar massa. Morbi vitae turpis justo. Quisque tincidunt odio et eros vulputate sollicitudin. Nulla erat ipsum, tincidunt elementum felis eu, commodo sagittis lacus. Donec et ullamcorper est. Nullam tincidunt enim in tempus consequat.',
  address: '0xDe384n4aw4fs52',
};

export const portfolio =
{
  portfolioValue:
  {
    value: 5000,
    assets: [{ name: 'Bitcoin ATM', ownership: '18', value: '2000' }, { name: 'Bitcoin ATM', ownership: '10', value: '4000' }],
  },
  revenue:
  {
    value: 3450,
    assets: [{ name: 'Bitcoin ATM', totalRevenue: '$1330', monthlyRevenue: '$120' }, { name: 'Bitcoin ATM', totalRevenue: '$1880', monthlyRevenue: '$120' }],
  },
};

export const newState = { transactionsHistory : [{
    date: 'January 01, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 02, 2018, 19:51', amount: 3, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 03, 2018, 19:51', amount: 47, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 0.7, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 01, 2018, 19:51', amount: -37, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 04, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -3, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.8, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'April 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'January 01, 2018, 19:51', amount: -0.4, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 22, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 14, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -15, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 13.22, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -17.87, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845ebad84514ede2dd89919b114b2',
  }]
}

export const noTransactions = { transactionsHistory : [] }
