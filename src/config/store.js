import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../_reducers';

import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist' 
import { PersistGate } from 'redux-persist/integration/react' 

import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)) 
);

export const persistor = persistStore(store)