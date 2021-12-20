import React, { useEffect } from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import Stars from '../../Stars/Stars';


function EstimateResCard({ photographer }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}> 
        {photographer.responseIdx}
      </div>
      <div className={styles.cardInfoContainer}>
        <span>작가 이름: {photographer.name}</span>

        <Stars grade={photographer.grade}/>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn}/>
      </div>
    </div>
  )
}

export default EstimateResCard
