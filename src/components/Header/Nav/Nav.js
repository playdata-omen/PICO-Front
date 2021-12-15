import React, { useEffect } from 'react'
import './Nav.css';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { auth_actions } from '../../../_actions/auth_action';

import picoLogo from '../../../img/pico-logo.png'
import { ACCESS_TOKEN } from '../../../constants';

function Nav() {
  
  const authenticated = useSelector(store => store.auth.authenticated)

  useEffect(() => {
    localStorage.getItem(ACCESS_TOKEN) ? handleLogin() : handleLogout()
  },[])

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    dispatch(auth_actions.logout())
  }

  const handleLogin = () => {
    dispatch(auth_actions.login())
  }

  return (
    <nav>
      <div className="nav_container">
        <div className="logo">
          <Link to="/"><img src={picoLogo}/></Link>
        </div>

        <div className="nav_links">
          {
            authenticated ?
            
              <ul>
                <li><Link to="/estimateRequest">견적요청</Link></li>
                <li><Link to="/myPage">마이페이지</Link></li>
                {/* <li><Link to="/myPage">로그아웃</Link></li> */}
                <li><button onClick={handleLogout}>리덕스 테스트 로그아웃</button></li>
              </ul>

            :

              <ul>
                <li><Link to="/login">로그인</Link></li>
                {/* <li><button onClick={handleLogin}>리덕스 테스트 로그인</button></li> */}
              </ul>
            
          }
        </div>  

      </div>
    </nav>
  )
}

export default Nav
