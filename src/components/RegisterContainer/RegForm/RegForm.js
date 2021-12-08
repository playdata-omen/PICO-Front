import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import DaumPostcode from 'react-daum-postcode';

import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { AREA } from '../../../constants';

import styles from './RegForm.module.css'
import { getCategoryAll } from '../../../api/Category';

import { useDispatch } from 'react-redux';
import { auth_actions } from '../../../_actions/auth_action.js'

function RegForm() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user)

  // 일반 유저 정보
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isPhotographer, setIsPhotographer] = useState(false)

  const handleNameChange = value => setName(value)
  const handleEmailChange = value => setEmail(value)
  const handlePhoneChange = value => setPhone(value)
  const handleIsPhotographerChange = value => setIsPhotographer(JSON.parse(value))

  // 작가 정보등록용
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')

  const areas = Object.keys(AREA)

  const [hasStudio, setHasStudio] = useState(false)
  const [openPostApi, setOpenPostApi] = useState(false)
  const [location, setLocation] = useState(areas[0])
  const [location2, setLocation2] = useState('전체')

  const [pCategory, setPCategory] = useState([])
  const [categories, setCategories] = useState([{"categoryIdx":1,"kind":"웨딩"},{"categoryIdx":2,"kind":"스냅"},{"categoryIdx":3,"kind":"화보"}])

  const handleCategoryChange = value => setCategories(value)
  const handleHasStudioChange = value => {
    setHasStudio(JSON.parse(value))
    
    if(!hasStudio){
      setAddress('')
      setAddressDetail('')
    }
    
  }

  const handleLocationChange = value => {
    setLocation(value)
    setLocation2('전체')
  }

  const handleLocation2Change = value => setLocation2(value)
  const handleOpenPostApiChange = value => setOpenPostApi(value)

  const handlePCategoryChange = async value => {
    let categoryIdx = parseInt(value)
    console.log(value)
    !pCategory.includes(categoryIdx)?
    setPCategory([...pCategory, categoryIdx])
    :
    setPCategory(pCategory.filter(cat => cat != categoryIdx))
    console.log(pCategory)
  }

  const handleAddressChange = value => setAddress(value)
  const handleAddressDetailChange = value => setAddressDetail(value)

  const handleRegister = () => {
    dispatch(auth_actions.registerUser(name, email, phone))
    
    isPhotographer &&
    dispatch(auth_actions.registerPhotographer(
      hasStudio,
      location,
      location2,
      pCategory
    ))
  }

  return (
    <div className={`${styles.formContainer} ${styles.form}`}>
      <div className={styles.inputContainer}>
        <label>이름</label>
        <input type="text" value={name} onChange={event => handleNameChange(event.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input type="text" value={email} onChange={event => handleEmailChange(event.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>전화번호</label>
        <input type="text" value={phone} onChange={event => handlePhoneChange(event.target.value)} />
      </div>

      <div>
        <div className={styles.inputContainer}>
          <label>회원</label>
        </div>
        <div className={styles.radioContainer}>
          <div>
            <PersonIcon />
            <CameraAltIcon />
            <br />
            <label>작가</label>
            <input
              type="radio"
              checked={isPhotographer === true}
              value={true}
              onChange={event => handleIsPhotographerChange(event.target.value)}
              />
          </div>
          <div>
            <PersonIcon />
            <br />
            <label>일반유저</label>
            <input
              type="radio"
              checked={isPhotographer === false}
              value={false}
              onChange={event => handleIsPhotographerChange(event.target.value)}
            />
          </div>
        </div>
      </div>
      {
        isPhotographer && 
        <RegFormPhotographer className={styles.form}
        
          location={location}
          location2={location2}
          categories={categories}
          
          hasStudio={hasStudio}
          address={address} 
          addressDetail={addressDetail}
        
          openPostApi={openPostApi} 
          pCategory={pCategory}

          handleLocationChange={handleLocationChange}
          handleLocation2Change={handleLocation2Change}

          handleCategoryChange={handleCategoryChange}
          handleHasStudioChange={handleHasStudioChange}

          handleOpenPostApiChange={handleOpenPostApiChange}
          handlePCategoryChange={handlePCategoryChange}
          
          handleAddressChange={handleAddressChange} 
          handleAddressDetailChange={handleAddressDetailChange}
        />
      }
      <button className={styles.submitBtn} onClick={handleRegister}>회원가입</button>      
    </div>


  )
}

function RegFormPhotographer(
  { 
    location,
    location2,
    hasStudio,
    address, 
    addressDetail,
    openPostApi,
    pCategory,


    handleLocationChange, handleLocation2Change,
    handlePCategoryChange,
    handleHasStudioChange,
    handleAddressChange, handleAddressDetailChange,
    handleOpenPostApiChange
  }) {
  const categories = useSelector(store => store.categories.categories)

  const areas = Object.keys(AREA)
  const handlePostChange = data => {
    handleOpenPostApiChange(false)
    handleAddressChange(data.address)
    console.log(address)
  }


  return (
    <div>
      <div className={styles.inputContainer}>

        <label>활동분야</label>
        <div className={`${styles.radioContainer} ${styles.categoryRadio}`}>
          {
            categories.map(category => 
              <div>
                <input 
                  type="radio"
                  value={Object.values(category)[0]}
                  checked={pCategory.includes(parseInt(Object.values(category)[0]))}
                />
                <div key={Object.values(category)[1]} className={styles.categoryBtn} onClick={() => handlePCategoryChange(parseInt(parseInt(Object.values(category)[0])))}>
                  <label>{Object.values(category)[1]}</label>
                </div>
              </div>
            )
          }
        </div>

        <label>활동지역</label>
          <label>지역</label><br/>
          <select value={location} onChange={event => handleLocationChange(event.target.value)}>
            {
              areas.map(area => 
                <option value={area} key={area}>{area}</option>
              )
            }
          </select>
          <br/>
          <select onChange={event => handleLocation2Change(event.target.value)}>
            <option value={'전체'} >{location} 전체</option>
            {
              Object.values(AREA[location]).map(loc => 
                <option value={loc} key={loc}>{loc}</option>
              )
            }
          </select>
      </div>

      <div>
        <div className={styles.radioForm}>
          <label>스튜디오</label>
        </div>
        <div className={styles.radioContainer}>
          <div>
            보유
            <PersonIcon />
            <br />
            <input
              type="radio"
              value={true}
              checked={hasStudio === true}
              onChange={event => handleHasStudioChange(event.target.value)}
            />
          </div>
          <div>
            미보유
            <PersonIcon />
            <br />
            <input
              type="radio"
              value={false}
              checked={hasStudio === false}
              onChange={event => handleHasStudioChange(event.target.value)}
            />
          </div>
        </div>
      </div>

      {
        hasStudio &&
        <div>
          <div className={styles.inputContainer}>
            <label>스튜디오 주소</label>
            <input type="text" value={address} onChange={event => handleLocationChange(event.target.value)} onClick={() => handleOpenPostApiChange(!openPostApi)} />
          </div>
          <div className={styles.inputContainer}>
            <label>상세주소</label>
            <input type="text" value={addressDetail} onChange={event => handleAddressDetailChange(event.target.value)}/>
          </div>
        </div>
      }

      {
        openPostApi &&
        <div className={styles.postApiContainer}>
          <DaumPostcode onComplete={data => handlePostChange(data)}/>
        </div>
      }

   

    </div>
  )
}

export default RegForm
