import { combineReducers } from "redux";
import auth from "./auth_reducer";
import categories from "./category_reducer"

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["auth"]
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({
  auth: auth,
  categories: categories
})

// export default rootReducer;

export default persistReducer(persistConfig, rootReducer)