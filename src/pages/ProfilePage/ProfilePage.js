import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getUserWithPIdx } from '../../api/User'

import ProfileContainer from '../../components/ProfileContainer/ProfileContainer'
import Spinner from '../../components/Spinner/Spinner'
import styles from '../Pages.module.css'

function ProfilePage({ user }) {

  const { photographerIdx } = useParams()

  const [pUser, setPUser] = useState(user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      photographerIdx && setPUser(await getUserWithPIdx(photographerIdx))
      setLoading(false)
    }
    fetchData()
  }, [])
  
  return (
    loading ?

    <Spinner />

    :

    <div className={styles.container}>
      <div className={styles.componentContainer}>
        <ProfileContainer user={pUser}/>
      </div>
    </div>
  )
}

export default ProfilePage
