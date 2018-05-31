import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import assets from './assets';
import errors from './errors';
import loading from './loading';
import misc from './misc'; // TODO: Needs to be renamed prices
import user from './user';
import transactions from './transactions';

const rootReducer = combineReducers({
  assets,
  errors,
  loading,
  misc,
  router: routerReducer,
  transactions,
  user,
});

export default rootReducer;
