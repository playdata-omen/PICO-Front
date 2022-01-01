import React, { useState } from 'react'
import { uploadReview } from '../../api/Review'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import styles from './ReviewContainer.module.css'
import { Form1, Form2 } from './ReviewForm/ReviewForm'

function ReviewContainer({ photographerIdx, applyIdx }) {

  console.log(photographerIdx)
  console.log(applyIdx)

  const [page, setPage] = useState(1)
  const [grade, setGrade] = useState('0')
  const [content, setContent] = useState('')

  const nextPage = () => setPage(page => page + 1)
  const prevPage = () => page > 1 && setPage(page => page - 1)

  const submitReview = async() => {
    const data = await uploadReview(photographerIdx, applyIdx, grade, content)
    data && alert('review 작성 성공')
  }

  return (
    <div className={styles.container}>
      <ProgressBar page={page} num={2} />
      <br />
      <div>
        {page === 1 && <Form1 grade={grade} setGrade={setGrade} />}
        {page === 2 && <Form2 setContent={setContent} />}
      </div>

      <div className={styles.formBtnContainer}>
        {page > 1 && <button className={styles.formBtn} onClick={prevPage}>이전</button>}
        {page < 2 && <button className={styles.formBtn} onClick={nextPage}>다음</button>}
        {page == 2 && <button className={styles.formBtn} onClick={submitReview}>리뷰 작성</button>}
      </div>

    </div>
  )
}

export default ReviewContainer
