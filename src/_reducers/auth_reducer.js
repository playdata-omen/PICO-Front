import { LOGIN, LOGOUT } from "../_actions/type"
// state, action 을 파라미터로 받고 
// state 에 적용되는 action을 통한 새로운 state값을 리턴

// (previousState, action) => newState

// state
const initialState = {
  authenticated: false
}

const auth_reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN: return {
      ...state,
      authenticated: true
    }
    case LOGOUT: return {
      ...state,
      authenticated: false
    }

    default: return state
  }
}

export default auth_reducer