import styles from './EstimateReqForm.module.css'
import { useSelector } from 'react-redux'
import { AREA } from '../../../constants'
import { useEffect, useState } from 'react'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export const Form1 = ({ rCategory, handleRCategoryChange }) => {

  const categories = useSelector(state => state.categories.categories)

  return (

    <div className={styles.container}>
      <label>의뢰분야</label>
      <div className={styles.category}>
        {
          categories.map(category =>
            <div>
              <input type='radio' value={category.categoryIdx} checked={category.categoryIdx === rCategory}/> 
              <div key={category.categoryIdx} className={styles.categoryBtn} onClick={() => handleRCategoryChange(parseInt(parseInt(category.categoryIdx)))}>
                <label>{category.kind}</label>
              </div>
            </div>
          )
        }
      </div>
    </div>

  )
}

export const Form2 = ({ location, handleLocationChange, handleLocation2Change }) => {

  const areas = Object.entries(AREA)

  return (
    <div className={styles.container}>
      <label>의뢰지역</label>
      <select onChange={event => handleLocationChange(event.target.value)}>
        {
          areas.map(area =>
            <option key={area[0]} value={area[0]}>{area[0]}</option>
          )
        }
      </select>
      <select onChange={event => handleLocation2Change(event.target.value)}>
        <option value={'전체'} >{location} 전체</option>
        {
          Object.values(AREA[location]).map(loc =>
            <option value={loc} key={loc}>{loc}</option>
          )
        }
      </select>
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
    
    sDate != null && setStartDate(sDate.toLocaleDateString())
    eDate != null && setEndDate(eDate.toLocaleDateString())
    // (eDate && sDate && eDate > sDate) && setEDate(sDate.toLocaleDateString())
    console.log(sDate,eDate)
  },[sDate, eDate])

  return (
    <div className={styles.container}>
      <label>의뢰날짜</label>
      <DatePicker selected={sDate} onChange={date => setSDate(date)} dateFormat='yyyy-MM-dd' minDate={new Date()} value={sDate}/>
      <DatePicker selected={eDate} onChange={date => setEDate(date)} dateFormat='yyyy-MM-dd' minDate={sDate} value={eDate}/>
    </div>
  )
}

export const Form4 = ({ setContent }) => {
  return (
    <div className={styles.container}>
      <textarea onChange={event => setContent(event.target.value)} />
    </div>
  )
}