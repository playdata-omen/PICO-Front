import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from '../_actions/type';

const initialState = {
  loading: false,
  categories: [],
  error: '',
};

const category_reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        categories: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default category_reducer;
