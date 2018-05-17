import { FETCH_ASSET_SUCCESS } from '../actions';

const initialState = [];

const assets = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSET_SUCCESS:
      return [...action.payload.data];
    default:
      return state;
  }
};

export default assets;
