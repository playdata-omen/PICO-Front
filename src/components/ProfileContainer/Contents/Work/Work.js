import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getWorksList } from '../../../../api/Work'
import { AddButton } from '../../../Button/Button'
import WorkCard from '../../../Cards/WorkCard.js/WorkCard'
import styles from './Work.module.css'

function Work({ user }) {
  let navigate = useNavigate()

  const userIdx = useSelector(store => store.auth.user.userIdx)
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)

  const workPage = workIdx => {
    navigate(`/work/${workIdx}`)
  }

  const uploadWorkPage = () => {
    navigate('/uploadWork')
  }
 

  useEffect(async()  => {
    console.log(user.userIdx)
    const data = await getWorksList(user.userIdx)
    setWorks(data)
    setLoading(false)
  },[])

  return (

    <div className={styles.container}>
      {
        loading ?
        <div>
          작업 불러오는 중...
        </div>
        :
        <div>
          {
            works.length !== 0 &&
            <div className={styles.workCardContainer}>
              {
                works.map(work =>
                  <div onClick={() => workPage(work.workIdx)}>
                    <WorkCard work={work}/>
                  </div>
                )
              }

              {
                user.userIdx === userIdx &&
                <div className={styles.addBtnContainer} onClick={uploadWorkPage}>
                  <AddButton />
                </div>
              }
            </div>
          }
          {
            (user.userIdx === userIdx && works.length === 0) && 
            <div className={styles.add}>
              <div className={styles.addBtnContainer} onClick={uploadWorkPage}>
                <AddButton />
                <label>작품을 업로드 하세요</label>
              </div>
            </div>
          }
        </div>
        
      }

    </div>
  )
}

export default Work
