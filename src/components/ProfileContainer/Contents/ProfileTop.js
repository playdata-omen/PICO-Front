import React from 'react'
import styles from './ProfileTop.module.css'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Stars from '../../Stars/Stars'

import AccountBoxIcon from '@mui/icons-material/AccountBox'


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
        <AccountBoxIcon fontSize='large' className={styles.profile} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <span>{user.nickName} {user.isPhotographer ? '작가님' : '고객님'}</span>

          {
            user.isPhotographer &&
            <ReviewStarContainer user={user} grade={grade} />
          }

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

const ReviewStarContainer = ({ user, grade }) => {
  return (
    grade ?
      <React.Fragment>
        <label>평점 ({grade.toFixed(2)} / 5)</label>
        <span><Stars grade={grade} /></span>
      </React.Fragment>

      :

      <React.Fragment>
        <label>아직 리뷰가 없습니다</label>
      </React.Fragment>
  )
}
