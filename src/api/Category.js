import { category_actions } from '../_actions/category_actions';
import API from './API';

// 작품 카테고리 릿
export const fetchCategories = () => {
  return (dispatch) => {
    dispatch(category_actions.fetchCategoriesRequest);
    API.get('category/getAllCategory')
      .then((res) => {
        const categories = res.data;
        dispatch(category_actions.fetchCategoriesSuccess(categories));
      })
      .catch((err) => {
        dispatch(category_actions.fetchCategoriesFailure(err.message));
      });
  };
};

// 작가 프로필 페이지에 출력 될 카테고리 라벨
export const getPCategories = async (photgrapherIdx) => {
  const data = await API.get('getPCategories', photgrapherIdx).then((res) => {
    return res.data;
  });
  return data;
};
