import React, { useEffect, useState } from 'react'
import { getUserWithPIdx } from '../../api/User'
import { getWorkDetail } from '../../api/Work'
import ProfileTop from '../ProfileContainer/Contents/ProfileTop'
import Spinner from '../Spinner/Spinner'

import styles from './WorkContainer.module.css'
import WorkContent from './WorkContent/WorkContent'

function WorkContainer({ workIdx }) {
  const [work, setWork] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(async() => {
    const data = await getWorkDetail(workIdx)
    const userData = await getUserWithPIdx(data.photographerIdx)
    console.log(data)
    setWork(data)
    setUser(userData)
    setLoading(false)
  },[])
  return (
    loading ?

    <Spinner />

    :

    <div className={styles.container}>
      <ProfileTop user={user}/>
      <hr/>
      <WorkContent work={work}/>
    </div>
  )
}

export default WorkContainer
