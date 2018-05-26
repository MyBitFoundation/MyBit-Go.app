import { combineReducers } from 'redux';

import assets from './assets';
import errors from './errors';
import misc from './misc';
import portfolio from './portfolio';
import user from './user';

const rootReducer = combineReducers({
  assets,
  errors,
  misc,
  portfolio,
  user,
});

export default rootReducer;
