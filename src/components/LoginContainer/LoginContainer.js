import React from 'react'
import googleLogo from '../../img/google-logo.png'
import kakaoLogo from '../../img/kakao-logo.png'
import naverLogo from '../../img/naver-logo.png'

import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from '../../constants'

import './LoginContainer.css'

function LoginContainer() {
  return (
    <div className="container">

      <div className="oauth-container">

        <div className="oauth-content">

            <h3>PICO 로그인</h3>

            <a className="oauth-btn google" href={GOOGLE_AUTH_URL}>
              <img src={googleLogo} alt="google"/>
              Sign in with Google
            </a>

            <a className="oauth-btn kakao" href={KAKAO_AUTH_URL}>
              <img src={kakaoLogo} alt="kakao"/>
              <label>카카오 로그인</label>
            </a>

            <a className="oauth-btn naver" href={KAKAO_AUTH_URL}>
              <img src={naverLogo} alt="kakao"/>
              <label>네이버 로그인</label>
            </a>
            
        </div>

      </div>

    </div>
  )
}

export default LoginContainer
