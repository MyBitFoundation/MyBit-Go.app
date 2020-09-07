export const SORT_BY_ASSETS = [{
  name: 'Highest Collateral',
  compare: (a, b) => b.collateralInPlatformToken / b.fundingGoal - a.collateralInPlatformToken / a.fundingGoal,
}, {
  name: 'Most Funded',
  compare: (a, b) => (b.fundingProgress / b.fundingGoal) - (a.fundingProgress / a.fundingGoal),
}, {
  name: 'Least Funded',
  compare: (a, b) => (a.fundingProgress / a.fundingGoal) - (b.fundingProgress / b.fundingGoal),
}, {
  name: 'Highest Management Fee',
  compare: (a, b) => b.managerPercentage - a.managerPercentage,
}, {
  name: 'Lowest Management Fee',
  compare: (a, b) => a.managerPercentage - b.managerPercentage,
},
];
