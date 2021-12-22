import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { getApplyList } from '../../api/Apply'
import { getEstimateReqList } from '../../api/Estimate'
import EstimateReqCard from '../Cards/EstimateCard/EstimateReqCard'
import MyInfoCard from '../Cards/MyInfoCard/MyInfoCard'
import Spinner from '../Spinner/Spinner'
import styles from './MyPageContents.module.css'

function MyPageContents({ user }) {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true)
  const [estimates, setEstimates] = useState([])
  const [applyList, setApplyList] = useState([])

  const myProfilePage = () => {
    setTimeout(
      function () {
        navigate(`profile`)
      }, 500
    )
  }



  useEffect(async () => {
    const estimateData = await getEstimateReqList();
    const applyListData = await getApplyList()
    // console.log(data)
    setEstimates(estimateData)
    setApplyList(applyListData)
    console.log(applyList)
    setLoading(false)
  }, [])

  return (
    loading ?

      <Spinner />

      :

      <div className={styles.container}>
        <div className={styles.cardList}>
          <label>마이페이지</label>
          <div onClick={myProfilePage} onTouchStart={myProfilePage}>
            <MyInfoCard user={user} />
          </div>
        </div>

        <div className={styles.cardList}>
          {estimates.length !== 0 && <EstimateCardsContainer estimates={estimates} />}
        </div>

        <div className={styles.cardList}>
          {applyList.length !== 0 && <ApplyCardsContainer applyList={applyList} />}
        </div>

        {/* {
          user.isPhotographer &&
          <div className={styles.cardList}>
            <label>의뢰지원</label>
            {
              applyList.map(apply =>
                <div onClick={() => estimateDetailPage(apply.estimateIdx, apply.applyIdx)}>
                  <EstimateReqCard apply={apply} />
                </div>
              )
            }
          </div>
        } */}
      </div>

  )
}

export default MyPageContents

const EstimateCardsContainer = ({ estimates }) => {

  let navigate = useNavigate();

  const estimateDetailPage = (estimateIdx, applyIdx) => {
    setTimeout(
      function () {
        navigate(`/estimate/${estimateIdx}/${applyIdx}`)
      }, 500
    )
  }

  return (
    <div className={styles.cardList}>
      <label>견적요청서</label>
      {
        estimates.map(estimate =>
          <div onClick={() => estimateDetailPage(estimate.estimateIdx)}>
            <EstimateReqCard estimate={estimate} />
          </div>
        )
      }
    </div>
  )
}
const ApplyCardsContainer = ({ applyList }) => {

  let navigate = useNavigate();

  const estimateDetailPage = (estimateIdx, applyIdx) => {
    setTimeout(
      function () {
        navigate(`/estimate/${estimateIdx}/${applyIdx}`)
      }, 500
    )
  }

  return (
    <div className={styles.cardList}>
      <label>의뢰요청서</label>
      {
        applyList.map(apply =>
          <div onClick={() => estimateDetailPage(apply.estimateIdx, apply.applyIdx)}>
            <EstimateReqCard apply={apply} />
          </div>
        )
      }
    </div>
  )
}
