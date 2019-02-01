export const SORT_BY_ASSETS = [{
    name: 'Highest Collateral',
    compare: (a, b) => {
      return b.collateralPercentage - a.collateralPercentage;
    },
  }, {
    name: 'Most Funded',
    compare: (a, b) => {
      return (b.amountRaisedInUSD / b.amountToBeRaisedInUSD) - (a.amountRaisedInUSD / a.amountToBeRaisedInUSD);
    },
  }, {
    name: 'Least Funded',
    compare: (a, b) => {
      return (a.amountRaisedInUSD / a.amountToBeRaisedInUSD) - (b.amountRaisedInUSD / b.amountToBeRaisedInUSD);
    },
  }, {
    name: 'Highest Management Fee',
    compare: (a, b) => {
      return b.managerPercentage - a.managerPercentage;
    },
  }, {
    name: 'Lowest Management Fee',
    compare: (a, b) => {
      return a.managerPercentage - b.managerPercentage;
    },
  }
];
