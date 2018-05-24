const initialState = {
  portfolioValue:
  {
    value: 5000,
    assets: [{ name: 'Bitcoin ATM', ownership: '18', value: '2000' }, { name: 'Bitcoin ATM', ownership: '10', value: '4000' }],
  },
  portfolioRevenue:
  {
    value: 3450,
    assets: [{ name: 'Bitcoin ATM', totalRevenue: '1330', monthlyRevenue: '120' }, { name: 'Bitcoin ATM', totalRevenue: '1880', monthlyRevenue: '120' }],
  },
  loaded: true,
};

const portfolio = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default portfolio;
