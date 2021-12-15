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

function RegForm() {
  let navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user)
  const photographer = useSelector(store => store.auth.photographer)
  const categories = useSelector(store => store.categories.categories)

  // 일반 유저 정보
  const [name, setName] = useState(user.name)
  const [nickName, setNickName] = useState(user.nickName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isPhotographer, setIsPhotographer] = useState(user.photographer)

  const handleIsPhotographerChange = value => {
    setIsPhotographer(value)
    !isPhotographer && setPCategory([])
  }

  // 작가 정보등록용
  const [address, setAddress] = useState(photographer? photographer.address : '')
  const [addressDetail, setAddressDetail] = useState(photographer? photographer.addressDetail : '')

  const areas = Object.keys(AREA)

  const [hasStudio, setHasStudio] = useState(photographer? photographer.hasStudio : false)
  const [openPostApi, setOpenPostApi] = useState(false)
  const [city, setCity] = useState(photographer? photographer.city : areas[0])
  const [location2, setLocation2] = useState(photographer? photographer.address : '전체')

  const [pCategory, setPCategory] = useState(photographer? [...photographer.pCategory]: [])

  const handleHasStudioChange = value => {
    setHasStudio(JSON.parse(value))
    
    if(!hasStudio){
      setAddress('')
      setAddressDetail('')
    }
    
  }

  const handleCityChange = value => {
    setCity(value)
    setLocation2('전체')
  }
    
  const handlePCategoryChange = categoryIdx => {
    !pCategory.includes(categoryIdx)?
    setPCategory([...pCategory, categoryIdx])
    :
    setPCategory(pCategory.filter(cat => cat != categoryIdx))
  }

  const handleAddressChange = value => setAddress(value)
  const handleAddressDetailChange = value => setAddressDetail(value)

  const handleRegister = () => {
    dispatch(auth_actions.registerUser(user.userIdx, name, nickName, email, phone, isPhotographer, user.register))
    
    isPhotographer &&
    dispatch(auth_actions.registerPhotographer(
      hasStudio,
      city,
      location2,
      pCategory
    ))
    navigate('/')
  }

  useEffect(()=> {
    console.log(pCategory)
  },[pCategory])

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <label>이름</label>
        <input type="text" value={name} onChange={event => setName(event.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>닉네임</label>
        <input type="text" value={nickName} onChange={event => setNickName(event.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>이메일</label>
        <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
      </div>

      <div className={styles.inputContainer}>
        <label>전화번호</label>
        <input type="text" value={phone} onChange={event => setPhone(event.target.value)} />
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
        
          city={city}
          location2={location2}
          categories={categories}
          
          hasStudio={hasStudio}
          address={address} 
          addressDetail={addressDetail}
        
          openPostApi={openPostApi} 
          pCategory={pCategory}

          handleCityChange={handleCityChange}
          setLocation2={setLocation2}

          handleHasStudioChange={handleHasStudioChange}

          setOpenPostApi={setOpenPostApi}
          handlePCategoryChange={handlePCategoryChange}
          
          handleAddressChange={handleAddressChange} 
          handleAddressDetailChange={handleAddressDetailChange}
        />
      }
      <button className={styles.submitBtn} onClick={handleRegister}>{user.register ? '정보수정' : '회원가입'}</button>      
    </div>


  )
}

function RegFormPhotographer(
  { 
    city,
    location2,
    hasStudio,
    address, 
    addressDetail,
    openPostApi,
    pCategory,


    handleCityChange, setLocation2,
    handlePCategoryChange,
    handleHasStudioChange,
    handleAddressChange, handleAddressDetailChange,
    setOpenPostApi
  }) {
  const categories = useSelector(store => store.categories.categories)

  const areas = Object.keys(AREA)

  const handlePostChange = data => {
    setOpenPostApi(false)
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
                  checked={pCategory.includes(category.categoryIdx)}
                />
                <div key={category.categoryIdx} className={styles.categoryBtn} onClick={() => handlePCategoryChange(category.categoryIdx)}>
                  <label>{category.kind}</label>
                </div>
              </div>
            )
          }
        </div>

        <label>활동지역</label>
          <label>지역</label><br/>
          <select value={city} onChange={event => handleCityChange(event.target.value)}>
            {
              areas.map(area => 
                <option value={area} key={area}>{area}</option>
              )
            }
          </select>
          <br/>
          <select onChange={event => setLocation2(event.target.value)}>
            <option value={'전체'} >{city} 전체</option>
            {
              Object.values(AREA[city]).map(loc => 
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
            <input type="text" value={address} onChange={event => handleCityChange(event.target.value)} onClick={() => setOpenPostApi(!openPostApi)} />
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
