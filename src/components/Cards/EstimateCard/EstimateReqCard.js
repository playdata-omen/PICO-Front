import React from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router';
import { style } from '@mui/system';


function EstimateReqCard({ estimate, apply }) {

  return (
    <div>
      {estimate && <EstimateCard estimate={estimate} />}
      {apply && <ApplyCard apply={apply}/>}
    </div>
  )
}

export default EstimateReqCard

const EstimateCard = ({ estimate }) => {
  let estimateStatus = parseInt(estimate.status)
  const created = estimate.created.split('T')[0]

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <label className={styles.statusLabel}>
          {
            estimateStatus === 1 &&
            <div>
              <span>글로벌 견적</span>
              <span>매칭중</span>
            </div>
          }
          {
            estimateStatus === 2 &&
            <div>
              <span>지정 견적</span>
              <span>매칭중</span>
            </div>
          }
          {estimateStatus === 3 && "수행중"}
          {estimateStatus === 4 && "수행완료"}
        </label>
      </div>
      <div className={styles.cardInfoContainer}>
        <span>견적서 번호 : {estimate.estimateIdx}</span>
        <span>created : {created}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn} />
      </div>
    </div>
  )
}

const ApplyCard = ({ apply }) => {
  console.log(apply.status)
  const applyStatus = parseInt(apply.status)

  console.log(apply)
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <label className={styles.statusLabel}>
          {(applyStatus === 1 || applyStatus === 2) && "지원 대기중"}
          {applyStatus === 3 && "수행중"}
          {applyStatus === 4 && "보류"}
          {applyStatus === 5 && "수행완료"}
          {applyStatus === 6 && "수행완료"}
          {applyStatus === 7 && "요청취소"}
          {applyStatus === 8 && "거절"}
        </label>
      </div>
      <div className={styles.cardInfoContainer}>
        <span>견적서 번호 : {apply.estimateIdx}</span>
        {/* <span>created : </span> */}
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn} />
      </div>
    </div>
  )
}