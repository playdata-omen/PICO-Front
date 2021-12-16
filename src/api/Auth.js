import API from "./API"
import { auth_actions } from '../_actions/auth_action.js'
import { ACCESS_TOKEN } from "../constants"

export const getUser = (navigate, code, provider) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.post('login', {
        code,
        provider
    })
    .then(res => {
      const user = res.data
      localStorage.setItem(ACCESS_TOKEN, user.accessToken)
      dispatch(auth_actions.fetchUserSuccess(user))
      dispatch(auth_actions.login())
      user.register ? navigate('/') : navigate('/register')
    })
    .catch(err => {
      alert(err.message)
      dispatch(auth_actions.fetchUserFailure(err.message))
      console.log('test2')
      navigate('/login')
    })
  }
}

export const registerUser = (userIdx, name, nickName, email, phone, isPhotographer, isRegistered) => {
  return dispatch => {
    console.log(userIdx)
    dispatch(auth_actions.fetchUserRequest)
    API.post('user/register', {
      userIdx,
      name,
      nickName,
      email,
      phone,
      isPhotographer
    }).then(res => {
      const user = res.data
      isRegistered ? alert('수정완료') :alert("회원가입")
      localStorage.setItem(ACCESS_TOKEN, user.accessToken)
      dispatch(auth_actions.fetchUserSuccess(user))
    }).catch(err => {
      alert("에러")
      dispatch(auth_actions.fetchUserFailure(err.message))
    })
  }
}

// {
//   "activityAddress": "string",
//   "activityCity": "string",
//   "category": [
//     0
//   ],
//   "hasStudio": true,
//   "isOtherArea": true,
//   "photographerIdx": 0,
//   "studioAddress": "string",
//   "studioCity": "string",
//   "userIdx": 0
// }

export const registerPhotographer = (hasStudio, activityAddress, activityCity, category, studioAddress, studioCity) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.post('photographer/register', {
      hasStudio,
      activityAddress,
      activityCity,
      category,
      studioAddress,
      studioCity
    }).then(res => {
      const photographer = res.data
      dispatch(auth_actions.fetchPhotoGrapherSuccess(photographer))
    }).catch(err => {
      alert("작가가입")
      dispatch(auth_actions.fetchUserFailure(err.message))
    })
  }
}