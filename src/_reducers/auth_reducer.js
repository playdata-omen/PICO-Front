import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_PHTOGRAPHER_SUCCESS } from '../_actions/type';

const initialState = {
  loading: false,
  authenticated: false,
  user: {},
  photographer: {},
  error: '',
};

const auth_reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticated: true,
        error: '',
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: {},
        photographer: {},
      };
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    }
    case FETCH_PHTOGRAPHER_SUCCESS: {
      return {
        ...state,
        loading: false,
        photographer: action.payload,
        error: '',
      };
    }
    default:
      return state;
  }
};

export default auth_reducer;
