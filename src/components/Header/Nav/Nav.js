import React, { useEffect } from 'react'
import './Nav.css';

import { Link } from 'react-router-dom';

function Nav({ authenticated }) {

  return (
    <nav>
      <div className="nav_container">
        <div>
          <Link to="/">PICO</Link>
        </div>
        <div>
          {
            authenticated?
            
            <div>
              <ul>
                <li>견적요청</li>
                <li><Link to="/myPage">마이페이지</Link></li>
                <li>로그아웃</li>
              </ul>
            </div>

            :

            <div>
              <ul>
                <li>로그인</li>
              </ul>
            </div>
            
          }
        </div>  
      </div>
    </nav>
  )
}

export default Nav
