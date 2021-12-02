import React from 'react'
import googleLogo from '../../img/google-logo.png'
import kakaoLogo from '../../img/kakao-logo.png'

import './LoginContainer.css'

function LoginContainer() {
  return (
    <div>
      <div className="container">
        <a className="oauth-btn" href={"https://www.google.com"}>
          <img src={googleLogo} alt="google"/>Google
        </a>
        <a className="oauth-btn">
          <img src={kakaoLogo} alt="kakao"/>Kakao
        </a>
      </div>
    </div>
  )
}

export default LoginContainer
