import React, { useState, useEffect } from 'react'
import { getEstimateReqList } from '../../api/Estimate'
import EstimateReqCard from '../Cards/EstimateCard/EstimateReqCard'
import MyInfoCard from '../Cards/MyInfoCard/MyInfoCard'
import WorkCard from '../Cards/WorkCard.js/WorkCard'
import Spinner from '../Spinner/Spinner'
import styles from './MyPageContents.module.css'

function MyPageContents({user}) {

  const [loading, setLoading] = useState(true)
  const [estimates, setEstimates] = useState([])
  // const [estimates, setEstimates] = useState([
  // {"estimateIdx" : 1, "name" : "견적1"},
  //   {"estimateIdx" : 2, "name" : "견적2"},
  // ])

  // const [works, setWorks] = useState([])
  const [works, setWorks] = useState([
    {"workIdx" : 1, "name" : "작업1"},
    {"workIdx" : 2, "name" : "작업2"},
  ])

  useEffect(async() => {
    const data = await getEstimateReqList(user.idx);
    // console.log(data)
    setEstimates(data)
    console.log(estimates)
    setLoading(false)

  }, [])

  return (
    loading ?

    <Spinner />
    
    :

    <div className={styles.container}>
      <div className={styles.cardList}>
        <label>마이페이지</label>
        <MyInfoCard name={user.name} email={user.email} />
      </div>

      <div className={styles.cardList}>
        <label>견적요청</label>
        {
          estimates.map(estimate => 
            <EstimateReqCard estimateIdx={estimate.estimateIdx} name={estimate.name} />
          )
        }
      </div>
      
      {
        user.isPhotographer &&
        <div className={styles.cardList}>
          <label>작품</label>
        </div>
      }
        {
          user.isPhotographer && !works.length == 0 ?
          works.map(work => 
            <div className={styles.cardList}>
              <WorkCard name={work.name} />
            </div>
          )

          :

          <div>
            {
              user.isPhotographer ?
              <span>아직 등록하신 작품이 없습니다</span>

              :

              <span>작품을 등록하려먼 작가 등록을 하세요</span>
            }
          </div>
         
        }

    </div>

  )
}

export default MyPageContents
