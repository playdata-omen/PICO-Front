import React, { useState } from 'react'
import { Form1, Form2, Form3, Form4 } from './ReqForm/EstimateReqForm'
import styles from './EstimateReqFormContainer.module.css'

function EstimateReqFormContainer() {

  // private long category;
  // private String content;
  // private String city;
  // private String address;
  // private LocalDate startDate;
  // private LocalDate endDate;

  const [page, setPage] = useState(1)
  const [rCategory, setRCateogory] = useState('')
  const [location, setLocation] = useState('서울특별시')
  const [location2, setLocation2] = useState('전체')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [content, setContent] = useState('')

  
  const handleRCategoryChange = value => setRCateogory(value)

  const handleLocationChange = value => {
    setLocation(value)
    setLocation2('전체')
  }

  const handleLocation2Change = value => setLocation2(value)

  const nextPage = () => {
    if (page === 1 && rCategory === '') alert('의뢰분야를 골라주세요')
    else if (page == 3 && startDate === '') alert('의뢰날짜 선택을 완료해주세요')
    else page < 4 && setPage(page => page + 1)
  }

  // const handleStartDateChange = async value => {
  //   const data = value.toLocaleDateString()
  //   console.log(data)
  //   console.log(typeof(data))
  //   // console.log(typeof(value))
  //   await setStartDate(data)
  //   // console.log(startDate)
  // }

  const prevPage = () => page > 1 && setPage(page => page - 1)
  

  const submitEstimate = () => {
    alert('제출')
  }
  
  return (
    <div className={styles.container}>
      <div>progressbar</div>
      <br/>

      <div>
        {page === 1 && <Form1 rCategory={rCategory} handleRCategoryChange={handleRCategoryChange}/>}
        {page === 2 && <Form2 location={location} location2={location2} handleLocationChange={handleLocationChange} handleLocation2Change={handleLocation2Change}/>}
        {page === 3 && <Form3 setStartDate={setStartDate} setEndDate={setEndDate} />}
        {page === 4 && <Form4 setContent={setContent}/>}
      </div>

      <div>
        {page > 1 && <button className={styles.formBtn} onClick={prevPage}>이전</button> }
        {page < 4 && <button className={styles.formBtn} onClick={nextPage}>다음</button> }
        {page == 4 && <button className={styles.formBtn} onClick={submitEstimate}>견적요청 제출</button> }
      </div>

    </div>
  )
}

export default EstimateReqFormContainer
