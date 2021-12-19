import React from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function MyInfoCard({ user }) {

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}> 
        <AccountBoxIcon fontSize='large' className={styles.profile}/>
      </div>
      <div className={styles.cardInfoContainer}>
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn}/>
      </div>
    </div>
  )
}

export default MyInfoCard
