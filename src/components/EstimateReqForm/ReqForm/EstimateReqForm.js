import styles from './EstimateReqForm.module.css'
import { useSelector } from 'react-redux'
import { AREA } from '../../../constants'
import { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { getPCategories } from '../../../api/Category';
import Spinner from '../../Spinner/Spinner';

export const Form1 = ({ category, setCategory, photographerIdx }) => {

  const [categories, setCategories] = useState(useSelector(state => state.categories.categories))
  
  useEffect(async() => {
    setCategories(photographerIdx ? await getPCategories(photographerIdx) : categories)
  },[])
  
  return (
    <div className={styles.container}>
      <label>의뢰분야</label>
      <div className={styles.contentContainer}>
        <div className={styles.category}>
        {
          categories.map(cat =>
            <div>
              <input type='radio' value={cat.categoryIdx} checked={cat.categoryIdx === category}/> 
              <div key={cat.categoryIdx} className={styles.categoryBtn} onClick={() => setCategory(cat.categoryIdx)}>
                <label>{cat.kind}</label>
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div>

  )
}

export const Form2 = ({ city, handleCityChange, setAddress }) => {

  const areas = Object.entries(AREA)

  return (
    <div className={styles.container}>
      <label>의뢰지역</label>
      <div className={`${styles.contentContainer} ${styles.form2}`}>
        <select onChange={event => handleCityChange(event.target.value)}>
          {
            areas.map(area =>
              <option key={area[0]} value={area[0]}>{area[0]}</option>
            )
          }
        </select>
        <select onChange={event => setAddress(event.target.value)}>
          <option value={'전체'} >{city} 전체</option>
          {
            Object.values(AREA[city]).map(loc =>
              <option value={loc} key={loc}>{loc}</option>
            )
          }
        </select>
      </div>
    </div>
  )
}

export const Form3 = ({setStartDate, setEndDate }) => {

  const [sDate, setSDate] = useState(null)
  const [eDate, setEDate] = useState(null)

  useEffect(() => {
    if(eDate && sDate) {
      eDate < sDate && setEDate(sDate)
    }
    if(sDate && eDate == null) {
      setEDate(sDate)
    }

    (eDate && sDate == null) && setSDate(eDate)
    // if(eDate && sDate == null) {
    //   setSDate(eDate)
    // }
    
    sDate != null && setStartDate(sDate.toLocaleDateString())
    eDate != null && setEndDate(eDate.toLocaleDateString())
    // (eDate && sDate && eDate > sDate) && setEDate(sDate.toLocaleDateString())
    console.log(sDate,eDate)
  },[sDate, eDate])

  return (
    <div className={styles.container}>
      <label>의뢰날짜</label>
      <div className={styles.contentContainer}>
        <div className={styles.datePicker}>
          <span>
            <label>시작일</label>
            <DatePicker selected={sDate} onChange={date => setSDate(date)}  dateFormat='yyyy-MM-dd' minDate={new Date()} value={sDate} inline/>
          </span>
          <span>
            <label>종료일</label>
            <DatePicker selected={eDate} onChange={date => setEDate(date)} dateFormat='yyyy-MM-dd' minDate={sDate} value={eDate} inline/>
          </span>
        </div>
      </div>
    </div>
  )
}

export const Form4 = ({ setContent }) => {
  return (
    <div className={styles.container}>
      <label>상세정보</label>
      <div className={styles.contentContainer}>
        <textarea onChange={event => setContent(event.target.value)} />
      </div>
    </div>
  )
}