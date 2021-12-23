import React, { useState, useEffect } from 'react'
import Info from './Contents/Info/Info'
import Work from './Contents/Work/Work'
import ProfileTop from './Contents/ProfileTop'
import styles from './ProfileContainer.module.css'
import Review from './Contents/Review/Review'
import { useSelector } from 'react-redux'
import { getPhotographerDetail } from '../../api/User'

function ProfileContainer({ user }) {
  const userIdx = useSelector(store => store.auth.user.userIdx)
  
  const [page, setPage] = useState(1)
  const [photographer, setPhotograpHer] = useState({})
  const [loading, setLoading] = useState(true)
  
  useEffect(async() => {
    user.isPhotographer && setPhotograpHer(await getPhotographerDetail(user.useridx))
  })

  const pageBtnContainer = (
    <div className={styles.pageBtnContainer}>
      <div>
        <input type="radio" checked={page === 1} readOnly />
        <button onClick={() => setPage(1)}>소개</button>
      </div>
      {
        user.isPhotographer &&
        (
          <div>
            <input type="radio" checked={page === 2} readOnly />
            <button onClick={() => setPage(2)}>작업/사진</button>
          </div>
        )
      }
      {
        user.isPhotographer &&
        (
          <div>
            <input type="radio" checked={page === 3} readOnly />
            <button onClick={() => setPage(3)}>리뷰</button>
          </div>
        )
      }
    </div>
  )

  return (

    <div className={styles.container}>
      <div className={styles.profileContentContainer}>

        <ProfileTop user={user} grade={photographer.grade} />

        {pageBtnContainer}

        <div>
          {page === 1 && <Info user={user} />}
          {(page === 2 && user.isPhotographer) && <Work user={user} />}
          {(page === 3 && user.isPhotographer) && <Review user={user} />}
        </div>

      </div>
    </div>
  )
}

export default ProfileContainer
