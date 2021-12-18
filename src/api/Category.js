import { category_actions } from "../_actions/category_actions"
import API from "./API"

export const fetchCategories = () => {
  return dispatch => {
    dispatch(category_actions.fetchCategoriesRequest)
    API.get('category/getAllCategory')
    .then(res => {
      const categories = res.data
      dispatch(category_actions.fetchCategoriesSuccess(categories))
    })
    // .catch(err => {
    //   dispatch(category_actions.fetchCategoriesFailure(err.message))
    // })
  }
}

export const getPCategories = async photgrapherIdx => {
  const data = await API.get('getPCategories', photgrapherIdx)
  .then(res => {
    return res.data
  })
  .catch(err => {
    return ([
      {"categoryIdx":4,"kind":"제품"},
      {"categoryIdx":5,"kind":"행사"},
      {"categoryIdx":6,"kind":"기타"},
    ])
  })
  return data
}