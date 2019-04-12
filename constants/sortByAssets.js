export const SORT_BY_ASSETS = [{
    name: 'Highest Collateral',
    compare: (a, b) => {
      return b.collateralPercentage - a.collateralPercentage;
    },
  }, {
    name: 'Most Funded',
    compare: (a, b) => {
      return (b.fundingProgress / b.fundingGoal) - (a.fundingProgress / a.fundingGoal);
    },
  }, {
    name: 'Least Funded',
    compare: (a, b) => {
      return (a.fundingProgress / a.fundingGoal) - (b.fundingProgress / b.fundingGoal);
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
