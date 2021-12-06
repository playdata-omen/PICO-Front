import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../_reducers';

import ReduxThunk from 'redux-thunk';

export const store = createStore(
  rootReducer, applyMiddleware(ReduxThunk)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);