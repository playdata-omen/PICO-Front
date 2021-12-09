import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import DaumPostcode from 'react-daum-postcode';

import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { AREA } from '../../../constants';

import styles from './RegForm.module.css'

import { useDispatch } from 'react-redux';
import { auth_actions } from '../../../_actions/auth_action.js'

function RegForm() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user)
  const categories = useSelector(store => store.categories.categories)

  // 일반 유저 정보
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isPhotographer, setIsPhotographer] = useState(false)

  const handleNameChange = value => setName(value)
  const handleEmailChange = value => setEmail(value)
  const handlePhoneChange = value => setPhone(value)
  const handleIsPhotographerChange = value => {
    setIsPhotographer(value)
    !isPhotographer && setPCategory([])
  }

  // 작가 정보등록용
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')

  const areas = Object.keys(AREA)

  const [hasStudio, setHasStudio] = useState(false)
  const [openPostApi, setOpenPostApi] = useState(false)
  const [location, setLocation] = useState(areas[0])
  const [location2, setLocation2] = useState('전체')

  const [pCategory, setPCategory] = useState([])

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
    <div className={styles.formContainer}>
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
        <div className={`${styles.radioContainer} ${styles.radio}`}>
          <div>
            <input
              type="radio"
              checked={isPhotographer === true}
              value={true}
              />
            <div className={styles.radioBtn} onClick={() => handleIsPhotographerChange(true)}>
              <div>
                <PersonIcon />
                <CameraAltIcon />
              </div>
              <label>작가</label>
            </div>
          </div>
          <div>
            <input
              type="radio"
              checked={isPhotographer === false}
              value={false}
            />
            <div className={styles.radioBtn} onClick={() => handleIsPhotographerChange(false)}>
              <PersonIcon />
              <label>일반유저</label>
            </div>
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
                  value={category.categoryIdx}
                  // checked={pCategory.includes(parseInt(Object.values(category)[0]))}
                  checked={pCategory.includes(parseInt(category.categoryIdx))}
                />
                <div key={category.categoryIdx} className={styles.categoryBtn} onClick={() => handlePCategoryChange(parseInt(parseInt(Object.values(category)[0])))}>
                  <label>{category.kind}</label>
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
        <div className={styles.inputContainer}>
          <label>스튜디오</label>
        </div>
        <div className={`${styles.radioContainer} ${styles.radio}`}>

          <div>
            <div className={styles.radioBtn} onClick={() => handleHasStudioChange(true)}>
              <PersonIcon />
              <label>보유</label>
            </div>
            <br />
            <input
              type="radio"
              value={true}
              checked={hasStudio === true}
            />
          </div>
          <div>
            <div className={styles.radioBtn} onClick={() => handleHasStudioChange(false)}>
              <PersonIcon />
              <label>미보유</label>
            </div>
            <input
              type="radio"
              value={false}
              checked={hasStudio === false}
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
