import React, { useState, useEffect } from 'react'
import { Form1, Form2, Form3, Form4 } from './ReqForm/EstimateReqForm'
import styles from './EstimateReqFormContainer.module.css'
import { reqEstimate } from '../../api/Estimate'

import { useNavigate } from 'react-router-dom'
import { ProgressBar } from '../ProgressBar/ProgressBar'

function EstimateReqFormContainer({ photographerIdx }) {

  // private long category;
  // private String content;
  // private String city;
  // private String address;
  // private LocalDate startDate;
  // private LocalDate endDate;

  const navigate = useNavigate()

  const [page, setPage] = useState(1)
  const [category, setCategory] = useState(6)
  const [city, setCity] = useState('서울특별시')
  const [address, setAddress] = useState('전체')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [content, setContent] = useState('')

  const handleCityChange = value => {
    setCity(value)
    setAddress('전체')
  }


  const nextPage = () => {
    if (page === 1 && category === '') alert('의뢰분야를 골라주세요')
    else if (page == 3 && startDate === '') alert('의뢰날짜 선택을 완료해주세요')
    else page < 4 && setPage(page => page + 1)
  }


  const prevPage = () => page > 1 && setPage(page => page - 1)

  const submitEstimate = () => {
    reqEstimate(navigate, category, content, city, address, startDate, endDate, photographerIdx)
  }
  
  return (
    <div className={styles.container}>
      <ProgressBar page={page} num={4} />
      {/* <ProgressBar page={page} num={4}/> */}
      <br/>

      <div>
        {page === 1 &&  <Form1 category={category} setCategory={setCategory} photographerIdx={photographerIdx}/>}
        {page === 2 && <Form2 city={city} address={address} handleCityChange={handleCityChange} setAddress={setAddress}/>}
        {page === 3 && <Form3 setStartDate={setStartDate} setEndDate={setEndDate} />}
        {page === 4 && <Form4 setContent={setContent}/>}
      </div>

      <div className={styles.formBtnContainer}>
        {page > 1 && <button className={styles.formBtn} onClick={prevPage}>이전</button> }
        {page < 4 && <button className={styles.formBtn} onClick={nextPage}>다음</button> }
        {page == 4 && <button className={styles.formBtn} onClick={submitEstimate}>견적요청 제출</button> }
      </div>

    </div>
  )
}

export default EstimateReqFormContainer
