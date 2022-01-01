import React from 'react'
import styles from '../Cards.module.css'
import Stars from '../../Stars/Stars';
import { useSelector } from 'react-redux';
import { deleteReview } from '../../../api/Review';
import { useNavigate } from 'react-router';

function ReviewCard({review}) {

  let navigate = useNavigate()
  const userIdx = useSelector(store => store.auth.user.userIdx)

  const handleDeleteReview = async(e) => {
    e.stopPropagation()
    const data = await deleteReview(review.reviewIdx, review.photographerIdx)
    data ? handleDeleteReviewSucces() : alert("삭제 실패")
  }

  const handleDeleteReviewSucces = () => {
    alert("삭제성공")
    navigate('/myPage')
  }
  return (
    <div className={styles.card}>
      <div className={styles.cardInfoContainer}>
        <span>{review.user.name}</span>
        <span>{review.content}</span>
        <Stars grade={review.grade}/>
      </div>
      <div className={styles.delBtn}>
        {
          userIdx === review.user.userIdx &&
          <button onClick={handleDeleteReview}>삭제</button>
        }
      </div>
    </div>
  )
}

export default ReviewCard
