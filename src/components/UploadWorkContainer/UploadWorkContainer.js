import React, { useEffect, useState } from 'react'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { Form1, Form2, Form3, Form4 } from './UploadForm/UploadForm'
import styles from './UploadWorkContainer.module.css'

function UploadWorkContainer() {
  const [category, setCategory] = useState(6)
  const [page, setPage] = useState(1)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const nextPage = () => {
    // if (page === 1 && category === '') alert('의뢰분야를 골라주세요')
    // else if (page == 3 && startDate === '') alert('의뢰날짜 선택을 완료해주세요')
    // else page < 4 && setPage(page => page + 1)
    setPage(page => page + 1)
  }

  const prevPage = () => page > 1 && setPage(page => page - 1)

  return (
    <div className={styles.container}>
      <ProgressBar page={page} num={4}/>
      <br/>
      <div>
        {page === 1 &&  <Form1 category={category} setCategory={setCategory}/>}
        {page === 2 &&  <Form2 setTitle={setTitle}/>}
        {page === 3 &&  <Form3 />}
        {page === 4 &&  <Form4 setContent={setContent}/>}
      </div>

      <div className={styles.formBtnContainer}>
        {page > 1 && <button className={styles.formBtn} onClick={prevPage}>이전</button> }
        {page < 4 && <button className={styles.formBtn} onClick={nextPage}>다음</button> }
        {/* {page == 4 && <button className={styles.formBtn} onClick={submitEstimate}>견적요청 제출</button> } */}
      </div>
    </div>
  )
}

export default UploadWorkContainer
