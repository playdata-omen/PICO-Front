import { fetchCategories } from "../api/Category"
import { FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS } from "./type"

export const category_actions = {
  fetchCategoriesRequest: () => ({ type: FETCH_CATEGORY_REQUEST }),
  fetchCategoriesFailure: err => ({ type: FETCH_CATEGORY_FAILURE, payload: err}),
  fetchCategoriesSuccess: categories => ({ type: FETCH_CATEGORY_SUCCESS, payload: categories}),

  // action creators
  fetchCategories: fetchCategories
}

