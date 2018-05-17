import { combineReducers } from 'redux';

import assets from './assets';
import user from './user';

const rootReducer = combineReducers({
  assets,
  user,
});

export default rootReducer;
