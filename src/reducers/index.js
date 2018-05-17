import { combineReducers } from 'redux';

import assets from './assets';
import errors from './errors';
import portfolio from './portfolio';
import user from './user';

const rootReducer = combineReducers({
  assets,
  errors,
  portfolio,
  user,
});

export default rootReducer;
