import React, { useEffect } from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useNavigate } from 'react-router';


function EstimateResCard({ photographer }) {

  const navigate = useNavigate();

  useEffect(() => {
    console.log(photographer)
  },[])

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}> 
        {photographer.responseIdx}
      </div>
      <div className={styles.cardInfoContainer}>
        <span>작가 이름: {photographer.name}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn}/>
      </div>
    </div>
  )
}

export default EstimateResCard
