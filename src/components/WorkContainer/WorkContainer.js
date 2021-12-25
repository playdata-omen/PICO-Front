import React, { useEffect, useState } from 'react'
import { getPhotographerDetail, getUserWithPIdx } from '../../api/User'
import { getWorkDetail } from '../../api/Work'
import ProfileTop from '../ProfileContainer/Contents/ProfileTop'
import Spinner from '../Spinner/Spinner'

import styles from './WorkContainer.module.css'
import WorkContent from './WorkContent/WorkContent'

function WorkContainer({ workIdx }) {
  const [work, setWork] = useState(null)
  const [user, setUser] = useState(null)
  const [grade, setGrade] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const fetchData = async () => {
      const workData = await getWorkDetail(workIdx)
      const userData = await getUserWithPIdx(workData.photographerIdx)
      const photographerData = await getPhotographerDetail(userData.userIdx)
      setGrade(photographerData.grade)
      setWork(workData)
      setUser(userData)
      setLoading(false)
    }
    fetchData()
  }, [])


  return (
    loading ?

      <Spinner />

      :

      <div className={styles.container}>
        <ProfileTop user={user} grade={grade} />
        <hr />
        <WorkContent work={work} />
      </div>
  )
}

export default WorkContainer
