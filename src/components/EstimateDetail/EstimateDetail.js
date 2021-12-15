import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getEstimateDetail } from '../../api/Estimate'
import EstimateResCard from '../Cards/EstimateCard/EstimateResCard'
import Spinner from '../Spinner/Spinner'
import styles from './EstimateDetail.module.css'

function EstimateDetail({ estimateIdx }) {

  const [ estimate, setEstimate ] = useState({})
  const [ loading, setLoading ] = useState(true)

  let navigate = useNavigate();

  // {
  //   "categoryIdx" : 1,
  //   "city" : "서울",
  //   "address" : "은평구",
  //   "startDate" : "",
  //   "endDate" : "",
  //   "content" : "dasdfjahsdkhvlalsdfkjlashdfklalscdkjh"
  // }

  useEffect(async()=> {
    const data = await getEstimateDetail(estimateIdx)
    setEstimate(data)
    console.log(estimate)
    estimate && setLoading(false)
  },[])

  return (
    loading ?
    
    <Spinner />

    :

    <div className={styles.container}>
      <div className={styles.requestInfoContainer}>
        견적 요청서{estimateIdx}
        <div>
          <label>분야: {estimate.category.kind}</label>
        </div>
        <div>
          <label>지역: {estimate.city} {estimate.address}</label>
        </div>
        <div>
          <label>상세정보: </label>
          <div>
            {estimate.content}
          </div>
        </div>
      </div>

      <div>
        <label>받은 견적서</label>
        {
          !estimate.applyList.length == 0?
          estimate.applyList.map(photographer => 
            <div onClick={() => navigate(`chat/${photographer.userIdx}`)} >
              <EstimateResCard photographer={photographer} />
            </div>
          )
          :
          <div>아직 받은 견적이 없습니다</div>
        }
      </div>
    </div>
  )
}

export default EstimateDetail
