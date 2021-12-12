import React from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router';


function EstimateReqCard({ estimateIdx, name }) {

  const navigate = useNavigate();

  const estimateDetailPage = () => {
    setTimeout(
      function(){
        navigate(`estimate/${estimateIdx}`)
      }, 500
    )
  }

  return (
    <div className={styles.card} onClick={estimateDetailPage}>
      <div className={styles.imgContainer}> 
        { estimateIdx }
      </div>
      <div className={styles.cardInfoContainer}>
        <span>{name}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn}/>
      </div>
    </div>
  )
}

export default EstimateReqCard
