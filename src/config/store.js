import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../_reducers';

import ReduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)) 
);