import API from "./API"
import { auth_actions } from '../_actions/auth_action.js'
import { ACCESS_TOKEN } from "../constants"
import { getPhotographerDetail } from "./User"

export const getUser = (navigate, code, provider) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.post('login', {
        code,
        provider
    })
    .then( async(res) => {
      const user = res.data
      localStorage.setItem(ACCESS_TOKEN, user.accessToken)
      dispatch(auth_actions.fetchUserSuccess(user))
      dispatch(auth_actions.login())
      user.isPhotographer && dispatch(auth_actions.fetchPhotographerSuccess(await getPhotographerDetail(user.userIdx)))
      user.isRegister ? navigate('/') : navigate('/register')
    })
    .catch(err => {
      alert(err.message)
      dispatch(auth_actions.fetchUserFailure(err.message))
      console.log('test2')
      navigate('/login')
    })
  }
}

export const registerUser = (userIdx, name, nickName, email, phone, isPhotographer, isRegister) => {

  let form = new FormData()
  form.append('userIdx', userIdx)
  form.append("name", name)
  form.append('nickName', nickName)
  form.append('email', email)
  form.append('phone', phone)
  form.append('isPhotographer', isPhotographer)
  form.append('isRegister', isRegister)

  console.log(Array.from(form))

  form.forEach(v => console.log(v))

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
      isRegister ? alert('수정완료') :alert("회원가입")
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

// activityCity,
// activityAddress,
// category,
// hasStudio,
// isOtherArea,
// studioAddress,
// studioCity,

export const registerPhotographer = (userIdx, activityCity, activityAddress, category, hasStudio, isOtherArea, studioAddress, studioCity) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.post('photographer/register', {
      userIdx,
      activityCity,
      activityAddress,
      category,
      hasStudio,
      isOtherArea,
      studioAddress,
      studioCity,
    }).then(res => {
      const photographer = res.data
      console.log(res.data)
      dispatch(auth_actions.fetchPhotographerSuccess(photographer))
    }).catch(err => {
      alert(err.message)
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