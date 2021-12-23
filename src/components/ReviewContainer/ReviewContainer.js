import React, { useState } from 'react'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import styles from './ReviewContainer.module.css'
import { Form1, Form2 } from './ReviewForm/ReviewForm'

function ReviewContainer({ photographerIdx, applyIdx }) {

  const [page, setPage] = useState(1)

  // applyIdx,
  // photographerIdx,
  // created
  // content
  // grade


  const nextPage = () => {
    setPage(page => page + 1)
  }

  const prevPage = () => page > 1 && setPage(page => page - 1)

  const submitReview = () => {
    alert('review')
  }

  return (
    <div className={styles.container}>
      <ProgressBar page={page} num={2} />
      <br />

      <div>
        {page === 1 && <Form1 />}
        {page === 2 && <Form2 />}
      </div>

      <div className={styles.formBtnContainer}>
        {page > 1 && <button className={styles.formBtn} onClick={prevPage}>이전</button>}
        {page < 2 && <button className={styles.formBtn} onClick={nextPage}>다음</button>}
        {page == 2 && <button className={styles.formBtn} onClick={submitReview}>견적요청 제출</button>}
      </div>

    </div>
  )
}

export default ReviewContainer
