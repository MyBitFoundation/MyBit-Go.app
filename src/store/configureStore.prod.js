import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore() {
  const middleware = [ReduxThunk];
  return createStore(rootReducer, applyMiddleware(...middleware));
}
