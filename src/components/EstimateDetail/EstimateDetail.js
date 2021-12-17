import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getEstimateDetail } from '../../api/Estimate'
import EstimateResCard from '../Cards/EstimateCard/EstimateResCard'
import Spinner from '../Spinner/Spinner'
import styles from './EstimateDetail.module.css'

function EstimateDetail({ estimateIdx }) {

  const categories = useSelector(store => store.categories.categories)

  const [ estimate, setEstimate ] = useState({})
  const [ loading, setLoading ] = useState(true)

  let navigate = useNavigate();
  
  useEffect(async()=> {
    const data = await getEstimateDetail(estimateIdx)
    setEstimate(data)
    console.log(estimate)
    setLoading(false)
  },[])

  const categoryLabel = categories.filter(async(cat) => cat.categoryIdx === await estimate.categoryIdx)[0].kind

  return (
    loading ?
    
    <Spinner />

    :

    <div className={styles.container}>
      <div className={styles.requestInfoContainer}>
        <div className={styles.estimateHeader}>
          <label>견적요청 번호 : {estimateIdx}</label>
        </div>
        <div className={styles.categoryLabel}>
          <label>{categoryLabel}</label>
        </div>
        <div>
          <label>지역: </label>
        </div>
        <div className={styles.info}>
          {estimate.city} {estimate.address}
        </div>
        <br/>
        <div>
          <label>상세정보: </label>
          <div className={styles.info}>
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
