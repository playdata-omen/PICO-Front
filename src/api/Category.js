import { category_actions } from "../_actions/category_actions"
import API from "./API"

export const fetchCategories = () => {
  return dispatch => {
    dispatch(category_actions.fetchCategoriesRequest)
    API.get('getCategory')
    .then(res => {
      const categories = res.data
      dispatch(category_actions.fetchCategoriesSuccess(categories))
    })
    .catch(err => {
      dispatch(category_actions.fetchCategoriesFailure(err.message))
    })
  }
}