import React from 'react'
import styles from './WorkCard.module.css'
import picoLogo from '../../../img/pico-logo.png'

function WorkCard({ work }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImgContainer}>
        {/* <img src={work.thumbnail} alt="test"/> */}
        <img src="https://i.smalljoys.me/2020/04/img_5e96ad75617c7.png?w=615&ssl=1&strip=all" alt="test"/>
      </div>
      <div className={styles.cardInfoContainer}>
        <span>{work.title}</span>
        <p><u>see more...</u></p>
      </div>
    </div>
  )
}

export default WorkCard
