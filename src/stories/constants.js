<<<<<<< HEAD
const solarPanel1 = require('../images/category-solar-energy.png');
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

=======
>>>>>>> b2420800bf77db430454102d3aa2b17f4f7de32d
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

export const assets = [{
  amountRaisedInUSD: 'NaN',
  amountToBeRaised: '200',
  assetID: '0x32bcdca6197cf6bb2b3ec3045ad1e7ca72bafd52f147616f7621205127914ed1',
  assetIncome: '0',
  assetType: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
  category: 'uncategorized',
  creator: '0x00854dcc5872fB3cCc1bBcFda849F4dCdF53172F',
  fundingDeadline: '1524512082',
  installerID: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
  ownershipUnits: '0',
}, {
  amountRaisedInUSD: 'NaN',
  amountToBeRaised: '200',
  assetID: '0x32bcdca6197cf6bb2b3ec3045ad1e7ca72bafd52f147616f7621205127914ed1',
  assetIncome: '0',
  assetType: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
  category: 'coffeemachine',
  creator: '0x00854dcc5872fB3cCc1bBcFda849F4dCdF53172F',
  fundingDeadline: '1524512082',
  installerID: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
  ownershipUnits: '0',
}];

export const transactions = [{
  date: '2018-07-13',
  amount: 100,
  type: 'Sent',
  status: 'Pending',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-07-12',
  amount: 50,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-07-13',
  amount: 50,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-05-01',
  amount: 12.3213,
  type: 'Received',
  status: 'Pending',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-05-03',
  amount: 23.12,
  type: 'Received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-05-08',
  amount: 61.12,
  type: 'Received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-03-22',
  amount: 1.0238,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2017-08-10',
  amount: 100020,
  type: 'Received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2017-08-18',
  amount: 433.1231,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2017-08-18',
  amount: 1.911,
  type: 'received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-07-13',
  amount: 10310,
  type: 'Sent',
  status: 'Pending',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-07-12',
  amount: 5031,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-07-13',
  amount: 42240,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-05-01',
  amount: 11.3213,
  type: 'Received',
  status: 'Pending',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-05-03',
  amount: 20.12,
  type: 'Received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-05-08',
  amount: 69.12,
  type: 'Received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2018-03-22',
  amount: 19.0238,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2017-08-10',
  amount: 130020,
  type: 'Received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2017-08-18',
  amount: 133.1231,
  type: 'Sent',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}, {
  date: '2017-08-18',
  amount: 4.911,
  type: 'received',
  status: 'Confirmed',
  txId: '0xd577346a96dc22cbcce7b3de533588dc33208a25b8aa38730829585d395fa09a',
}];
