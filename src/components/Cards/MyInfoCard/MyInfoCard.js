import React from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router';


function MyInfoCard({name, email}) {

  const navigate = useNavigate();

  const myProfilePage = () => {
    setTimeout(
      function(){
        navigate(`profile`)
      }, 500
    )
  }

  return (
    <div className={styles.card} onClick={myProfilePage}>
      <div className={styles.imgContainer}> 
        <AccountBoxIcon fontSize='large' className={styles.profile}/>
      </div>
      <div className={styles.cardInfoContainer}>
        <span>{name}</span>
        <span>{email}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn}/>
      </div>
    </div>
  )
}

export default MyInfoCard
