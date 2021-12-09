import { FETCH_CATEGORY_ALL, FETCH_CATEGORY_FAILURE } from "./type"

export const category_actions = {
  fetchCategories: (categories) => ({ type: FETCH_CATEGORY_ALL, payload: categories }),
  fetchCategoriesFailure: err => ({ type: FETCH_CATEGORY_FAILURE, payload: err}),
}

