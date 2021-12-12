import React from 'react'
import googleLogo from '../../img/oauth/google-logo.png'
import kakaoLogo from '../../img/oauth/kakao-logo.png'
import naverLogo from '../../img/oauth/naver-logo.png'

import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL, NAVER_AUth_URL } from '../../constants'

import styles from  './LoginContainer.module.css'

function LoginContainer() {
  return (
    <div className={styles.container}>

      <div className={styles.oauthContainer}>

        <div className={styles.oauthContent}>

          <h3>PICO 로그인</h3>

          <a className={`${styles.oauthBtn} ${styles.google}`} href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="google"/>
            Sign in with Google
          </a>

          <a className={`${styles.oauthBtn} ${styles.kakao}`} href={KAKAO_AUTH_URL}>
            <img src={kakaoLogo} alt="kakao"/>
            <label>카카오 로그인</label>
          </a>

          <a className={`${styles.oauthBtn} ${styles.naver}`} href={NAVER_AUth_URL}>
            <img src={naverLogo} alt="naver"/>
            <label>네이버 로그인</label>
          </a>
            
        </div>

      </div>

    </div>
  )
}

export default LoginContainer
