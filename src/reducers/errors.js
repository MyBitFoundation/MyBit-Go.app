import { CLEAR_ERRORS, FETCH_ASSETS_FAILURE } from '../actions';

const initialState = [];

const errors = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSETS_FAILURE:
      return [...state, action.payload.error];
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
};

export default errors;
