import { combineReducers } from 'redux';
import auth from './auth_reducer';
import categories from './category_reducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  whitelist: ['auth', 'categories'],
  // blacklist -> 제외할 내용들
};

const rootReducer = combineReducers({
  auth: auth,
  categories: categories,
});

export default persistReducer(persistConfig, rootReducer);
