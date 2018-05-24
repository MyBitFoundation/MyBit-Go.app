import { combineReducers } from 'redux';

import assets from './assets';
import errors from './errors';
import portfolio from './portfolio';
import user from './user';
import transactions from './transactions';
import misc from './misc';

const rootReducer = combineReducers({
  assets,
  errors,
  portfolio,
  user,
  transactions,
  misc,
});

export default rootReducer;
