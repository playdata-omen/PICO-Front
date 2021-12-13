import React from 'react'
import styles from './ProfileTop.module.css'

function ProfileTop({ user }) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}> 
        <img alt='프로필 사진'/>
      </div>
      <div className={styles.infoContainer}>
        <span>{user.name} { user.isPhotographer ? '작가님' : '고객님'}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <button>정보수정</button>
      </div>
    </div>
  )
}

export default ProfileTop
