import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth_actions } from '../../_actions/auth_action';

import { LoginButton, LogOutButton } from '../Button.styles';

import Nav from './Nav/Nav';

import './Header.css';

function Header() {

  const authenticated = useSelector(store => store.auth.authenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOEN")
    console.log(authenticated)
    // return accessToken ? handleLogin : handleLogout
  })

  const handleLogin = () => {
    dispatch(auth_actions.login())
  }

  const handleLogout = () => {
    dispatch(auth_actions.logout())
  }

  return (
    <header>
      <div className="wrapper">
        <Nav authenticated/>
        {/* <nav>
          <div>
            Header
          </div>
          <div>
            {
              authenticated?
              
              <div>
                <ul>
                  <li><LogOutButton onClick={handleLogout}>로그아웃 테스트</LogOutButton></li>
                  <li>견적요청</li>
                  <li>마이 페이지</li>
                  <li>로그아웃</li>
                </ul>
              </div>

              :

              <div>
                <ul>
                  <li><LoginButton onClick={handleLogin}>로그인 테스트</LoginButton></li>
                  <li>로그인</li>
                </ul>
              </div>
              
            }
          </div>
        </nav> */}
      </div>
    </header>
  )
}

export default Header
