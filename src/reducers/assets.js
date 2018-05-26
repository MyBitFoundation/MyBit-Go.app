import { FETCH_ASSETS_SUCCESS } from '../actions';

const initialState = {
  'crypto-currency-atm': {
    1: {
      assetName: 'Bitcoin ATM',
      city: 'Zug',
      country: 'Switzerland',
      dueDate: new Date().setDate(new Date().getDate() + 2),
      raised: 50000,
      goal: 100000,
      investors: 5,
      expectedReturn: 18,
      details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi turpis metus, pretium eget venenatis quis, fringilla in mauris. Phasellus sit amet massa tellus. Proin eros augue, lobortis eget ex sit amet, accumsan tristique lorem.',
      description:
    'Proin luctus, neque eget tincidunt molestie, orci leo fringilla mauris, at tristique nisl quam vel turpis. Curabitur aliquam ante ac nulla vulputate, non vehicula quam venenatis. Sed pellentesque est justo, ac faucibus ex rutrum a. Sed placerat magna vitae justo tempus, in imperdiet enim pellentesque. Ut eget pulvinar massa. Morbi vitae turpis justo. Quisque tincidunt odio et eros vulputate sollicitudin. Nulla erat ipsum, tincidunt elementum felis eu, commodo sagittis lacus. Donec et ullamcorper est. Nullam tincidunt enim in tempus consequat.',
      address: '0xDe384n4aw4fs52',
    },
  },
  loaded: false,
};

const assets = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSETS_SUCCESS:
      return { ...state, ...action.payload.assets };
    default:
      return state;
  }
};

export default assets;
