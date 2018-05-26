import { combineReducers } from 'redux';

import assets from './assets';
import errors from './errors';
import misc from './misc';
import portfolio from './portfolio';
import user from './user';
import transactions from './transactions';
import misc from './misc';

const rootReducer = combineReducers({
  assets,
  errors,
  misc,
  portfolio,
  user,
  transactions,
  misc,
});

export default rootReducer;
