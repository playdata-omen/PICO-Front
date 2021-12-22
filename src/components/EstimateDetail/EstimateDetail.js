import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getApplyDetail } from '../../api/Apply'
import { applyEstimate, getEstimateDetail } from '../../api/Estimate'
import { getUserWithUserIdx } from '../../api/User'
import EstimateResCard from '../Cards/EstimateCard/EstimateResCard'
import MyInfoCard from '../Cards/MyInfoCard/MyInfoCard'
import Spinner from '../Spinner/Spinner'
import styles from './EstimateDetail.module.css'

function EstimateDetail({ estimateIdx, applyIdx }) {

  const categories = useSelector(store => store.categories.categories)
  const user = useSelector(store => store.auth.user)
  const photographerIdx = useSelector(store => store.auth.photographer.photographerIdx)

  const [estimate, setEstimate] = useState({})
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)
  const [apply, setApply] = useState(null)
  const [reqUser, setReqUser] = useState(null)

  const applyEstimateHandler = async () => {
    const data = await applyEstimate(estimateIdx, photographerIdx)
    setEstimate(data)
    const applyData = await getApplyDetail(applyIdx)
    setApply(applyData)
  }

  useEffect(async () => {
    const estimateData = await getEstimateDetail(estimateIdx)
    console.log(estimateData)
    setEstimate(await getEstimateDetail(estimateIdx))
    const applyData = await getApplyDetail(applyIdx)
    const userData = await user.userIdx !== estimate.userIdx && await getUserWithUserIdx(estimateData.userIdx)
    setReqUser(userData)
    setApply(applyData)
    const cat = await categories.filter(cat => cat.categoryIdx === estimateData.categoryIdx)[0].kind
    setCategory(cat)
    setLoading(false)
  }, [])

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
                    apply.isApplied ?

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
              <label>{estimate.status < 3 ? "지원한 작가" : "매칭된 작가"}</label>
              <EstimateRes estimate={estimate} />
            </React.Fragment>

          }

          {
            ((user.userIdx === estimate.userIdx) && apply.isApplied) &&
            <React.Fragment>
              <label>요청고객</label>
              <EstimateReq user={reqUser} photographerIdx={photographerIdx} />
            </React.Fragment>
          }

        </div>
      </div>
  )
}

export default EstimateDetail

const EstimateRes = ({ estimate }) => {

  const unmatched = (
    estimate.applyList.map(apply =>
      <div onClick={() => navigate(`/chat/${apply.photographer.photographerIdx}/${apply.applyIdx}`)} >
        <EstimateResCard photographer={apply.photographer} />
      </div>
    )
  )

  const matched = (
    estimate.applyList.filter(apply => (apply.status !== 4 && apply.status > 2)).map(apply =>
      <div onClick={() => navigate(`/chat/${apply.photographer.photographerIdx}/${apply.applyIdx}`)} >
        <EstimateResCard photographer={apply.photographer} />
      </div>
    )
  )

  let navigate = useNavigate();
  return (
    !estimate.applyList.length == 0 ?

      <div>
        {estimate.status < 3 && estimate.status !== 4 ? unmatched : matched}
      </div>

      :

      <div>
        <span>아직 받은 견적이 없습니다</span>
      </div>
  )
}

const EstimateReq = ({ user, photographerIdx }) => {
  let navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/chat/${photographerIdx}/${1}`)} >
      {/* <MyInfoCard user={user} /> */}
    </div>
  )
}
