import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import assets from './assets';
import errors from './errors';
import loading from './loading';
import misc from './misc';
import portfolio from './portfolio';
import user from './user';
import transactions from './transactions';

const rootReducer = combineReducers({
  assets,
  errors,
  loading,
  misc,
  portfolio,
  router: routerReducer,
  transactions,
  user,
});

export default rootReducer;
