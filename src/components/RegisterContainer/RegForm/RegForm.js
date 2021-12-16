import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import DaumPostcode from 'react-daum-postcode';

import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { AREA } from '../../../constants';

import styles from './RegForm.module.css'

import { useDispatch } from 'react-redux';
import { auth_actions } from '../../../_actions/auth_action.js'
import { useNavigate } from 'react-router';


// hasStudio,
// activityAddress,

// activityCity,
// category,
// studioAddress,
// studioCity

function RegForm() {

  let navigate = useNavigate()

  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user)
  const photographer = useSelector(store => store.auth.photographer)
  const categories = useSelector(store => store.categories.categories)

  const areas = Object.keys(AREA)

  // 일반 유저 정보
  const [name, setName] = useState(user.name)
  const [nickName, setNickName] = useState(user.nickName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isPhotographer, setIsPhotographer] = useState(user.photographer)

  const handleIsPhotographerChange = value => {
    setIsPhotographer(value)
    !isPhotographer && setCategory([])
  }

  // 작가 정보등록용
  const [isOtherArea, setIsOtherArea] = useState(photographer? photographer.isOtherArea : false)
  const [activityCity, setActivityCity] = useState(photographer? photographer.activityCity : areas[0])
  const [activityAddress, setActivityAddress] = useState(photographer? photographer.activityAddress : '전체')
  const [studioAddress, setStudioAddress] = useState(photographer? photographer.studioAddress : '')
  const [studioCity, setStudioCity] = useState(photographer? photographer.studioCity : '')


  const [hasStudio, setHasStudio] = useState(photographer? photographer.hasStudio : false)
  const [openPostApi, setOpenPostApi] = useState(false)

  const [category, setCategory] = useState(photographer? [...photographer.category]: [])

  const handleHasStudioChange = value => {
    setHasStudio(JSON.parse(value))
    
    if(!hasStudio){
      setStudioAddress('')
      setStudioCity('')
    }
    
  }

  const handleActivityCityChange = value => {
    setActivityCity(value)
    setActivityAddress('전체')
  }
    
  const handleCategoryChange = categoryIdx => {
    !category.includes(categoryIdx)?
    setCategory([...category, categoryIdx])
    :
    setCategory(category.filter(cat => cat != categoryIdx))
  }

  const handleAddressChange = value => setStudioAddress(value)
  const handlestudioCityChange = value => setStudioCity(value)

  const handleRegister = () => {
    dispatch(auth_actions.registerUser(user.userIdx, name, nickName, email, phone, isPhotographer, user.register))
    
    isPhotographer &&
    dispatch(auth_actions.registerPhotographer(
      hasStudio,
      activityAddress,
      activityCity,
      category
    ))
    navigate('/')
  }

  useEffect(()=> {
    console.log(category)
  },[category])

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
        {activityCity} <br/>
        {activityAddress}
        {`${isPhotographer}`}
        <label>이름</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>닉네임</label>
        <input type="text" value={nickName} onChange={e => setNickName(e.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>전화번호</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
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
        
          activityCity={activityCity}
          activityAddress={activityAddress}
          categories={categories}
          
          hasStudio={hasStudio}
          studioAddress={studioAddress} 
          studioCity={studioCity}
        
          openPostApi={openPostApi} 
          category={category}

          isOtherArea={isOtherArea}
          setIsOtherArea={setIsOtherArea}

          handleActivityCityChange={handleActivityCityChange}
          setActivityAddress={setActivityAddress}

          handleHasStudioChange={handleHasStudioChange}

          setOpenPostApi={setOpenPostApi}
          handleCategoryChange={handleCategoryChange}
          
          handleAddressChange={handleAddressChange} 
          handlestudioCityChange={handlestudioCityChange}
        />
      }
      <button className={styles.submitBtn} onClick={handleRegister}>{user.register ? '정보수정' : '회원가입'}</button>      
    </div>


  )
}

function RegFormPhotographer(
  { 
    activityAddress,
    activityCity,
    hasStudio,
    studioAddress, 
    studioCity,
    openPostApi,
    category,
    isOtherArea,

    handleActivityCityChange, setActivityAddress,
    handleCategoryChange,
    handleHasStudioChange,
    handleAddressChange, handlestudioCityChange,
    setOpenPostApi
  }) {
  const categories = useSelector(store => store.categories.categories)

  const areas = Object.keys(AREA)

  const handlePostChange = data => {
    setOpenPostApi(false)
    handleAddressChange(data.address)
    console.log(studioAddress)
  }

  return (
    <div>
      <div className={styles.inputContainer}>

        <label>활동분야</label>
        <div className={`${styles.radioContainer} ${styles.categoryRadio}`}>
          {
            categories.map(cat => 
              <div>
                <input 
                  type="radio"
                  value={cat.categoryIdx}
                  checked={category.includes(cat.categoryIdx)}
                />
                <div key={cat.categoryIdx} className={styles.categoryBtn} onClick={() => handleCategoryChange(cat.categoryIdx)}>
                  <label>{cat.kind}</label>
                </div>
              </div>
            )
          }
        </div>

        <label>활동지역</label>
          <label>지역</label><br/>
          <select value={activityCity} onChange={e => handleActivityCityChange(e.target.value)}>
            {
              areas.map(area => 
                <option value={area} key={area}>{area}</option>
              )
            }
          </select>
          <br/>
          <select onChange={e => setActivityAddress(e.target.value)}>
            <option value={'전체'} >{activityCity} 전체</option>
            {
              Object.values(AREA[activityCity]).map(loc => 
                <option value={loc} key={loc}>{loc}</option>
              )
            }
          </select>
      </div>

      <div>
        <div className={styles.inputContainer}>
          <label>타지역 협의가능</label>
        </div>
        <div className={`${styles.radioContainer} ${styles.radio}`}>

          <div>
            <div className={styles.radioBtn} onClick={() => handleHasStudioChange(true)}>
              <PersonIcon />
              <label>협의가능</label>
            </div>
            <br />
            <input
              type="radio"
              value={true}
              checked={isOtherArea === true}
            />
          </div>
          <div>
            <div className={styles.radioBtn} onClick={() => handleHasStudioChange(false)}>
              <PersonIcon />
              <label>협의불가능</label>
            </div>
            <input
              type="radio"
              value={false}
              checked={isOtherArea === false}
            />
          </div>
        </div>
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
            <input type="text" value={activityAddress} onChange={e => handleActivityCityChange(e.target.value)} onClick={() => setOpenPostApi(!openPostApi)} />
          </div>
          <div className={styles.inputContainer}>
            <label>상세주소</label>
            <input type="text" value={studioCity} onChange={e => handlestudioCityChange(e.target.value)}/>
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
