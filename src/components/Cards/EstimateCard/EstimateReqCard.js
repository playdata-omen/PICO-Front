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
  
  const created = estimate.created.split('T')[0]

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <label className={styles.statusLabel}>
          {
            estimate.status === 1 &&
            <div>
              <span>글로벌 견적</span>
              <span>매칭중</span>
            </div>
          }
          {
            estimate.status === 2 &&
            <div>
              <span>지정 견적</span>
              <span>매칭중</span>
            </div>
          }
          {estimate.status === 3 && "수행중"}
          {estimate.status === 4 && "수행완료"}
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
  console.log(apply.isApplied)
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <label className={styles.statusLabel}>
          {((apply.status === 1 || apply.status === 2) && !apply.isApplied) && "지원 대기중"}
          {((apply.status === 1 || apply.status === 2) && apply.isApplied) && "지원 완료"}
          {apply.status === 3 && "수행중"}
          {apply.status === 4 && "매칭실패"}
          {apply.status === 5 && "수행완료"}
          {apply.status === 6 && "수행완료"}
          {apply.status === 7 && "요청취소"}
          {apply.status === 8 && "거절"}
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