import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getPhotographerUser } from '../../api/User'

import ProfileContainer from '../../components/ProfileContainer/ProfileContainer'
import styles from '../Pages.module.css'

function ProfilePage({ user }) {

  const { userIdx } = useParams()

  const [pUser, setPUser] = useState(user)

  useEffect(async() => {
    userIdx !== user.userIdx && setPUser(await getPhotographerUser(userIdx))
    console.log(userIdx)
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.componentContainer}>
        <ProfileContainer user={pUser}/>
      </div>
    </div>
  )
}

export default ProfilePage
