import { FETCH_CATEGORY_ALL, FETCH_CATEGORY_FAILURE } from "../_actions/type"
const initialState = {
  loading: false,
  categories: [
    {"categoryIdx":1,"kind":"웨딩"},
    {"categoryIdx":2,"kind":"스냅"},
    {"categoryIdx":3,"kind":"화보"},
    {"categoryIdx":4,"kind":"제품"},
    {"categoryIdx":5,"kind":"행사"},
    {"categoryIdx":6,"kind":"기타"}
  ],
  error: '',
  test: 'test'

}

const category_reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CATEGORY_ALL: return {
      ...state,
      categories: action.payload
    }
    case FETCH_CATEGORY_FAILURE: return {
      ...state,
      err: action.payload
    }
    default: return state
  }
}

export default category_reducer;