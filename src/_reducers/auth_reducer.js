import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_PHTOGRAPHER_SUCCESS } from "../_actions/type"
// state, action 을 파라미터로 받고 
// state 에 적용되는 action을 통한 새로운 state값을 리턴

// (previousState, action) => newState


const initialState = {
  loading: false,
  authenticated: false,
  user: {
    // email: 'henrynoowa@gmail.com',
    // nickName: 'test',
    // name: '조하운',
    // phone: '010-4446-0410',
    // isRegister: false,
    // isPhotographer: true
  },

  // hasStudio,
  // activityAddress,
  // activityCity,
  // category,
  // studioAddress,
  // studioCity
  photographer: {
    // hasStudio: true,
    // isOtherArea: false,
    // activityCity: '서울특별시',
    // activityAddress: '전체',
    // studioCity: '서울시 은평구 불광동 머시기',
    // studioAddress: '2층',
    // otherAreas: false,
    // category: [
    //   1, 2
    //   // {"categoryIdx":2,"kind":"스냅"},
    //   // {"categoryIdx":3,"kind":"화보"}
    // ]
  },
  error: ''
}

const auth_reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN: return {
      ...state,
      authenticated: true,
      error: ''
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
        ...state,
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