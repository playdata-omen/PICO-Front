import React from 'react'
import styles from './ProfileTop.module.css'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Stars from '../../Stars/Stars'



function ProfileTop({ user, grade }) {

  const userIdx = useSelector(store => store.auth.user.userIdx)
  let navigate = useNavigate()

  const updateProfile = () => {
    setTimeout(
      function () {
        navigate('/user/update')
      }, 700
    )
  }

  const resquestPEstimate = () => {
    setTimeout(
      function () {
        navigate(`/estimateRequest/${user.userIdx}`)
      }, 700
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src="https://i.smalljoys.me/2020/04/img_5e96ad75617c7.png?w=615&ssl=1&strip=all" alt='프로필 사진' />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span>{user.nickName} {user.isPhotographer ? '작가님' : '고객님'}</span>
          <label>평점 ({grade} / 5)</label>
          <span><Stars grade={grade} /></span>
        </div>
        {
          userIdx === user.userIdx ?
            <div className={styles.updateBtn} onClick={updateProfile}>
              <button>정보수정</button>
            </div>
            :
            <div className={styles.updateBtn} onClick={resquestPEstimate}>
              <button>견적요청</button>
            </div>
        }
      </div>
    </div>
  )
}

export default ProfileTop
