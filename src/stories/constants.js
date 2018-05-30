export const assetInfo = {
  assetName: 'Bitcoin ATM',
  city: 'Zug',
  country: 'Switzerland',
  dueDate: new Date().setDate(new Date().getDate() + 2),
  amountRaisedInUSD: 50000,
  amountToBeRaised: 100000,
  investors: 5,
  expectedReturn: 18,
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis metus, pretium eget venenatis quis, fringilla in mauris. Phasellus sit amet massa tellus. Proin eros augue, lobortis eget ex sit amet, accumsan tristique lorem.',
  description:
    'Proin luctus, neque eget tincidunt molestie, orci leo fringilla mauris, at tristique nisl quam vel turpis. Curabitur aliquam ante ac nulla vulputate, non vehicula quam venenatis. Sed pellentesque est justo, ac faucibus ex rutrum a. Sed placerat magna vitae justo tempus, in imperdiet enim pellentesque. Ut eget pulvinar massa. Morbi vitae turpis justo. Quisque tincidunt odio et eros vulputate sollicitudin. Nulla erat ipsum, tincidunt elementum felis eu, commodo sagittis lacus. Donec et ullamcorper est. Nullam tincidunt enim in tempus consequat.',
  creator: '0xDe384n4aw4fs52',
};

export const newState = {
  transactionsHistory: [{
    date: 'January 01, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9cd68cda49fee0c1e147845ebad2344514ede2dd89919b114b2',
  }, {
    date: 'March 02, 2018, 19:51', amount: 3, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee7r068cda49fee0c1e147845ebad84514e23572dd89919b114b2',
  }, {
    date: 'March 03, 2018, 19:51', amount: 47, status: 'Complete', type: 'ETH', txId: '0x5eed7527deeg9c068cda49fee0c1e147845ebad886414ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 0.7, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e1478213bad84514ede2dd89919b114b2',
  }, {
    date: 'March 01, 2018, 19:51', amount: -37, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715gc068cda49fg0c1e1776845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee7ve9c068cda49d0c1e133457845ebad84514ede2dd89919b114b2',
  }, {
    date: 'March 04, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fd1e147845eba444514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -3, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0e845ebad856774ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.8, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9cdcda49fee0c1e147845ebad86714ede2dd89919b114b2',
  }, {
    date: 'April 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'ETH', txId: '0x5eed7527a15e9c068cda49fee0c1e1q845ebad84519ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 1.5, status: 'Complete', type: 'MYB', txId: '0x5eed7527ds5e9c068cda49fee0c1e1t845eb24514ede2dd89919b114b2',
  }, {
    date: 'January 01, 2018, 19:51', amount: -0.4, status: 'Complete', type: 'MYB', txId: '0x5eed7527deevc068cda49fee0c1eu845eb04514ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 22, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845jad84ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 14, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715e9c068cda49fee0c1e147845mad8455ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -15, status: 'Complete', type: 'MYB', txId: '0x5eed7527dee715e9c068cda49fee0c1e1478nad84514e6e2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: 13.22, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee7sc068cda49fee0c1e147845ebad8r4ede2dd89919b114b2',
  }, {
    date: 'March 05, 2018, 19:51', amount: -17.87, status: 'Complete', type: 'ETH', txId: '0x5eed7527dee715gcda49fee0c1e147845ebad8451fe2dd89919b114b2',
  }],
};

export const noTransactions = { transactionsHistory: [] };

export const headerLoading = { user: {}, misc: {} };

export const header = { user: { userName: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac', ethBalance: 20, myBitBalance: 215 }, misc: { currentMybitInUsd: 2.68 } };

export const explorePage = {
  assets:
  [
    {
      assetID: '0xc481012a7563a254e34971fa6eb679d6556726ebfafa7c0cb62d444f90b6f82c',
      installerID: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
      amountToBeRaised: '200',
      assetType: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
      creator: '0x00854dcc5872fB3cCc1bBcFda849F4dCdF53172F',
      amountRaisedInUSD: '212.704',
      category: 'coffeemachine',
    },
    {
      assetID: '0x32bcdca6197cf6bb2b3ec3045ad1e7ca72bafd52f147616f7621205127914ed1',
      installerID: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
      amountToBeRaised: '200',
      assetType: '0xfed2f47c142e37b43fa1c3aae37cd7fce40d0dd5c9b26045f85d78ea05225f55',
      creator: '0x00854dcc5872fB3cCc1bBcFda849F4dCdF53172F',
      amountRaisedInUSD: '212.704',
      category: 'uncategorized',
    }],
  loading: { assets: false },
};


export const portfolio = {
  portfolio: {
    portfolioValue: {
      value: 5000,
      assets: [
        {
          name: 'Bitcoin ATM',
          ownership: '18',
          value: '2000',
        },
        {
          name: 'Bitcoin ATM',
          ownership: '10',
          value: '4000',
        },
      ],
    },
    portfolioRevenue: {
      value: 3450,
      assets: [
        {
          name: 'Bitcoin ATM',
          totalRevenue: '1330',
          monthlyRevenue: '120',
        },
        {
          name: 'Bitcoin ATM',
          totalRevenue: '1880',
          monthlyRevenue: '120',
        },
      ],
    },
  },
  loading: {
    portfolio: false,
  },
};


export const portfolioLoading = {
  portfolio: {
    portfolioValue: {},
    portfolioRevenue: {},
  },
  loading: {
    portfolio: true,
  },
};
