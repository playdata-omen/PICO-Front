import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../_actions/type"
// state, action 을 파라미터로 받고 
// state 에 적용되는 action을 통한 새로운 state값을 리턴

// (previousState, action) => newState

// state
const initialState = {
  loading: false,
  authenticated: false,
  user: {
    email: 'henrynoowa@gmail.com',
    name: '조하운',
    phone: '010-4446-0410',
    isRegistered: false,
    isPhotographer: false
  },
  error: ''
}

const auth_reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN: return {
      ...state,
      authenticated: true
    }
    case LOGOUT: return {
      ...state,
      authenticated: false,
      user: {}
    }
    case FETCH_USER_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_USER_SUCCESS: {
      return {
        loading: false,
        user: action.payload,
        error: ''
      }
    }
    case FETCH_USER_FAILURE: {
      return {
        loading: false,
        user: {},
        error: action.payload
      }
    }

    default: return state
  }
}

export default auth_reducer