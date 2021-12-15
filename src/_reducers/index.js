import { combineReducers } from "redux";
import auth from "./auth_reducer";
import categories from "./category_reducer"
const rootReducer = combineReducers({
  auth: auth,
  categories: categories
})

export default rootReducer;