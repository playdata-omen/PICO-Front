import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { auth_actions } from '../../../_actions/auth_action';

import { ACCESS_TOKEN } from '../../../constants';

import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router';

import styles from './Nav.module.css'

function Nav() {

  let navigate = useNavigate()

  const authenticated = useSelector(store => store.auth.authenticated)
  const [burger, setBurger] = useState(false)

  useEffect(() => {
    localStorage.getItem(ACCESS_TOKEN) ? handleLogin() : handleLogout()
    setBurger(false)
  }, [])

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    dispatch(auth_actions.logout())
    navigate('/')
    setBurger(false)
  }

  const handleLogin = () => {
    dispatch(auth_actions.login())
  }

  const handleNavigate = url => {
    navigate(url)
    setBurger(false)
  }

  return (
    <nav>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link to="/"><h3>PICO</h3></Link>
        </div>


        <div className={styles.navLinks}>
          <div className={styles.burger} onClick={() => setBurger(!burger)}>
            { burger ?<ExpandMoreIcon /> : <MenuIcon /> }
          </div>
          <input type="radio" checked={burger === true} />
          <div className={styles.links}>
            {
              authenticated ?

                <ul>
                  <li><a onClick={() => handleNavigate("/estimateRequest")}>견적요청</a></li>
                  <li><a onClick={() => handleNavigate("/myPage")}>마이페이지</a></li>
                  <li><a onClick={handleLogout}>로그아웃</a></li>
                </ul>


                :

                <ul>
                  <li><Link to="/login">로그인</Link></li>
                </ul>
            }
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Nav
