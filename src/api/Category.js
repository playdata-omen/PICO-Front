import { category_actions } from "../_actions/category_actions"
import API from "./API"

export const getCategoryAll = () => {
  return(dispatch => {
    API.get('getCategory')
    .then(res => {
      const categories = res.data
      dispatch(category_actions.fetchCategories(categories))
    })
    .catch(err => {
      alert('categoty err')
      dispatch(category_actions.fetchCategoriesFaiures(err.message))
    })
  })
}