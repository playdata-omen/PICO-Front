import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_PHTOGRAPHER_SUCCESS } from "../_actions/type"
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
  photographer: {
    hasStudio: true,
    city: '서울특별시',
    address: '전체',
    studioAddress: '서울시 은평구 불광동 머시기',
    otherAreas: false,
    pCategory: [
      {"categoryIdx":2,"kind":"스냅"},
      {"categoryIdx":3,"kind":"화보"}
    ]
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
    case FETCH_PHTOGRAPHER_SUCCESS: {
      return {
        ...state,
        loading: false,
        photographer: action.payload,
        error: ''
      }
    }
    default: return state
  }
}

export default auth_reducer