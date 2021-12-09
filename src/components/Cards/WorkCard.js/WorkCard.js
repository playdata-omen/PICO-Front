import React from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function WorkCard({ name }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}> 
        {/* <AccountBoxIcon fontSize='large' className={styles.profile}/> */}
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

export default WorkCard
