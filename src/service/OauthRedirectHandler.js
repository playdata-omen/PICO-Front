import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Spinner from '../components/Spinner/Spinner';
import { auth_actions } from '../_actions/auth_action';

function OauthRedirectHandler() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // respons code 받기
  let url = new URL(window.location.href)
  let code = url.searchParams.get('code');
  // provider
  let provider = url.pathname.substr(url.pathname.lastIndexOf('/') + 1)

  // 서버에 요청할때 어떤 소셜로그인 API 인지도 같이 보냐줘야 함
  useEffect(() => {
    dispatch(auth_actions.fetchUser(navigate, code, provider))
  },[])

  return(
    <div>
      <Spinner />
    </div>
  )

}

export default OauthRedirectHandler
