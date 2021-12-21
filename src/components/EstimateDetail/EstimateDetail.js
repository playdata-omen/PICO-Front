import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getApplyDetail } from '../../api/Apply'
import { applyEstimate, getEstimateDetail } from '../../api/Estimate'
import EstimateResCard from '../Cards/EstimateCard/EstimateResCard'
import Spinner from '../Spinner/Spinner'
import styles from './EstimateDetail.module.css'

function EstimateDetail({ estimateIdx, applyIdx }) {

  const categories = useSelector(store => store.categories.categories)
  const user = useSelector(store => store.auth.user)
  const photographerIdx = useSelector(store => store.auth.photographer.photographerIdx)

  const [estimate, setEstimate] = useState({})
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)
  const [applied, setApplied] = useState(null)

  useEffect(async () => {
    const data = await getEstimateDetail(estimateIdx)
    setEstimate(await getEstimateDetail(estimateIdx))
    const cat = await categories.filter(cat => cat.categoryIdx === data.categoryIdx)[0].kind
    const apply = await getApplyDetail(applyIdx)
    setApplied(apply.isApplied)
    setCategory(cat)
    setLoading(false)
  }, [])

  const categoryLabel = categories.filter(async (cat) => cat.categoryIdx === await estimate.categoryIdx)[0].kind

  const applyEstimateHandler = async() => {
    setEstimate(await applyEstimate(estimateIdx, photographerIdx))
    console.log(estimate)
  }

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
            <label>{category}</label>
          </div>
          <div>
            <label>지역: </label>
          </div>
          <div className={styles.info}>
            {estimate.city} {estimate.address}
          </div>
          <br />
          <div>
            <label>상세정보: </label>
            <div className={styles.info}>
              {estimate.content}
            </div>
          </div>
          <br />
          <div className={styles.info}>
            {
              user.userIdx === estimate.userIdx ?
                <React.Fragment>
                  <button>삭제</button>
                </React.Fragment>
                :
                <React.Fragment>
                  {
                    applied ?
                    
                    <label>지원완료</label>

                    :

                    <button onClick={applyEstimateHandler}>지원하기</button>
                  }
                </React.Fragment>
            }
          </div>
        </div>

        <div className={styles.cardsContainer}>
          {
            user.userIdx === estimate.userIdx &&
            <React.Fragment>
              <label>받은 견적서</label>
              <EstimateRes estimate={estimate} />
            </React.Fragment>
          }

        </div>
      </div>
  )
}

export default EstimateDetail

const EstimateRes = ({ estimate }) => {
  let navigate = useNavigate();
  return (
    !estimate.applyList.length == 0 ?
      estimate.applyList.map(apply =>
        <div onClick={() => navigate(`/chat/${apply.photographer.photographerIdx}/${apply.applyIdx}`)} >
          <EstimateResCard photographer={apply.photographer} />
        </div>
      )
      :
      <div>아직 받은 견적이 없습니다</div>
  )
}
