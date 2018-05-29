import { FETCH_ASSETS_SUCCESS } from '../actions';

const initialState = [];

const assets = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSETS_SUCCESS:
      console.log(action.payload.assets)
      return [...action.payload.assets];
    default:
      return state;
  }
};

export default assets;
