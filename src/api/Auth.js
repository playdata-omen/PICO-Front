import API from "./API"
import { auth_actions } from '../_actions/auth_action.js'
import { ACCESS_TOKEN } from "../constants"
import { getPhotographerDetail } from "./User"

// 로그인
export const getUser = (navigate, code, provider) => {
  return dispatch => {
    dispatch(auth_actions.fetchUserRequest)
    API.post('login', {
        code,
        provider
    })
    .then( async(res) => {
      console.log(res.data)
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
      navigate('/login')
    })
  }
}

// 회원가입/ 정보수정
export const registerUser = (userIdx, name, nickName, email, phone, isPhotographer, isRegister) => {
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

// 작가 등록
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
