import React from 'react'
import styles from './ProfileTop.module.css'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'



function ProfileTop({ user }) {

  let navigate = useNavigate()

  const updateProfile = () => {
    setTimeout(
      function(){
        navigate('update')
      }, 700
    )
  }

  const userIdx = useSelector(store => store.auth.user.userIdx)
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}> 
        <img alt='프로필 사진'/>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span>{user.name} { user.photographer ? '작가님' : '고객님'}</span>
        </div>
        { 
          userIdx === user.userIdx &&
          <div className={styles.updateBtn} onClick={updateProfile}>
            <button>정보수정</button>
          </div>
        }
      </div>
    </div>
  )
}

export default ProfileTop
