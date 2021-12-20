import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getUserWithPIdx } from '../../api/User'

import ProfileContainer from '../../components/ProfileContainer/ProfileContainer'
import styles from '../Pages.module.css'

function ProfilePage({ user }) {

  const { photographerIdx } = useParams()

  const [pUser, setPUser] = useState(user)

  useEffect(async() => {
    console.log(photographerIdx)
    photographerIdx && setPUser(await getUserWithPIdx(photographerIdx))
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
