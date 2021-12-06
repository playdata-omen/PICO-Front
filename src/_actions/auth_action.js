// action type
import serverAxios from "../utils/serverAxios"
import { LOGIN, LOGOUT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./type"

// action creator
// simply creates an action
// function returning action
export const auth_actions = {
  login: () => ({ type: LOGIN }),
  logout: () => ({ type: LOGOUT }),
  fetchUserRequest: () => ({ type: FETCH_USER_REQUEST}),
  fetchUserSuccess: user => ({ type: FETCH_USER_SUCCESS, payload: user}),
  fetchUserFailure: err => ({ type: FETCH_USER_FAILURE, payload: err}),

  // action creator
  fetchUser: (navigate, code, provider) => {
    console.log(code)
    return (dispatch) => {
      dispatch(auth_actions.fetchUserRequest())
      serverAxios.get('getUser', {
        params: {
          code: code,
          provider: provider
        }
      })
      .then(res => {
        const user = res.data.map(user => user.email)
        localStorage.setItem("token", user.accessToken)
        dispatch(auth_actions.fetchUserSuccess(user))
        navigate('/')
      })
      .catch(err => {
        alert(err.message)
        dispatch(auth_actions.fetchUserFailure(err.message))
        console.log('test2')
        navigate('/login')
      })
    }
  }
}



