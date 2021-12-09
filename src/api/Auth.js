import API from "./API"
import { auth_actions } from '../_actions/auth_action.js'

export const getUser = (navigate, code, provider) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.get('getUser', {
      params: {
        code: code,
        provider: provider
      }
    })
    .then(res => {
      const user = res.data
      localStorage.setItem("token", user.accessToken)
      dispatch(auth_actions.fetchUserSuccess(user))
      user.isRegistered ? navigate('/') : navigate('/register')
    })
    .catch(err => {
      alert(err.message)
      dispatch(auth_actions.fetchUserFailure(err.message))
      console.log('test2')
      navigate('/login')
    })
  }
}

export const registerUser = (name, email, phone) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.post('registerUser', {
      name,
      email,
      phone
    }).then(res => {
      const user = res.data
      dispatch(auth_actions.fetchUserSuccess(user))
    }).catch(err => {
      alert("회원가입")
      dispatch(auth_actions.fetchUserFailure(err.message))
    })
  }
}

export const registerPhotographer = (hasStudio, location, location2, pCategory, address, addressDetail) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.post('registerPhotographer', {
      hasStudio,
      location,
      location2,
      pCategory,
      address,
      addressDetail
    }).then(res => {
      const photographer = res.data
      dispatch(auth_actions.fetchPhotoGrapherSuccess(photographer))
    }).catch(err => {
      alert("작가가입")
      dispatch(auth_actions.fetchUserFailure(err.message))
    })
  }
}