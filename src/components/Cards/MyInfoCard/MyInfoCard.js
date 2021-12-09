import React from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function MyInfoCard({name, email}) {
  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}> 
        <AccountBoxIcon fontSize='large' className={styles.profile}/>
      </div>
      <div className={styles.cardInfoContainer}>
        <span>{name} 고객님</span>
        <span>{email}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn}/>
      </div>
    </div>
  )
}

export default MyInfoCard
