import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getEstimateReqList } from '../../api/Estimate'
import EstimateReqCard from '../Cards/EstimateCard/EstimateReqCard'
import MyInfoCard from '../Cards/MyInfoCard/MyInfoCard'
import WorkCard from '../Cards/WorkCard.js/WorkCard'
import Spinner from '../Spinner/Spinner'
import styles from './MyPageContents.module.css'

function MyPageContents({user}) {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true)
  const [estimates, setEstimates] = useState([])

  const [works, setWorks] = useState([
    {"workIdx" : 1, "name" : "작업1"},
    {"workIdx" : 2, "name" : "작업2"},
  ])

  const myProfilePage = () => {
    setTimeout(
      function(){
        navigate(`profile`)
      }, 500
    )
  }

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
        <div onClick={myProfilePage}>
          <MyInfoCard user={user}/>
        </div>
      </div>

      <div className={styles.cardList}>
        <label>견적요청</label>
        {
          estimates.map(estimate => 
            <EstimateReqCard estimateIdx={estimate.estimateIdx} name={estimate.name} />
          )
        }
      </div>
    </div>

  )
}

export default MyPageContents
