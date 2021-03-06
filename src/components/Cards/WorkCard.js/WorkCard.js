import React from 'react'
import styles from './WorkCard.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import picoLogo from '../../../img/pico-logo.png'

function WorkCard({ work }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImgContainer}>
        <img src={work.thumbnail} alt="test"/>
        {/* <img src={picoLogo} alt="test"/> */}
      </div>
      <div className={styles.cardInfoContainer}>
        <span>{work.title}</span>
        <p><u>see more...</u></p>
      </div>
    </div>
  )
}

export default WorkCard
