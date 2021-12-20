import React from 'react'
import styles from '../Cards.module.css'
import Stars from '../../Stars/Stars';

function ReviewCard({review}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInfoContainer}>
        <span>{review.user.name}</span>
        <span>{review.content}</span>
        <Stars grade={review.grade}/>
      </div>
    </div>
  )
}

export default ReviewCard
