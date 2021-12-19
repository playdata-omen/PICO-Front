import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import DaumPostcode from 'react-daum-postcode';

import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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

  const areas = Object.keys(AREA)

  // 일반 유저 정보
  const [name, setName] = useState(user.name)
  const [nickName, setNickName] = useState(user.nickName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isPhotographer, setIsPhotographer] = useState(user.isPhotographer)

  const handleIsPhotographerChange = value => {
    setIsPhotographer(value)
    !isPhotographer && setCategory([])
  }

  // 작가 정보등록용
  const [isOtherArea, setIsOtherArea] = useState(photographer !== null ? photographer.isOtherArea : false)
  const [activityCity, setActivityCity] = useState(photographer.activityCity ? photographer.activityCity : areas[0])
  const [activityAddress, setActivityAddress] = useState(photographer.activityAddress ? photographer.activityAddress : '전체')
  const [studioCity, setStudioCity] = useState(photographer ? photographer.studioCity : '')
  const [studioAddress, setStudioAddress] = useState(photographer ? photographer.studioAddress : '')


  const [hasStudio, setHasStudio] = useState(photographer.hasStudio ? photographer.hasStudio : false)
  const [openPostApi, setOpenPostApi] = useState(false)

  const [category, setCategory] = useState(photographer.category ? [...photographer.category] : [])

  const handleHasStudioChange = value => {
    setHasStudio(JSON.parse(value))
    if (!hasStudio) {
      setStudioAddress('')
      setStudioCity('')
    }
  }

  const handleActivityCityChange = value => {
    setActivityCity(value)
    setActivityAddress('전체')
  }

  const handleCategoryChange = categoryIdx => {
    !category.includes(categoryIdx) ?
      setCategory([...category, categoryIdx])
      :
      setCategory(category.filter(cat => cat != categoryIdx))
  }

  const handleRegister = () => {
    dispatch(auth_actions.registerUser(user.userIdx, name, nickName, email, phone, isPhotographer, user.register))

    isPhotographer &&
      dispatch(auth_actions.registerPhotographer(
        user.userIdx,
        activityCity,
        activityAddress,
        category,
        hasStudio,
        isOtherArea,
        studioAddress,
        studioCity,
      ))
    navigate('/')
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputContainer}>
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

          categories={categories}

          category={category}
          handleCategoryChange={handleCategoryChange}

          isOtherArea={isOtherArea}
          setIsOtherArea={setIsOtherArea}

          activityCity={activityCity}
          activityAddress={activityAddress}
          handleActivityCityChange={handleActivityCityChange}
          setActivityAddress={setActivityAddress}

          handleHasStudioChange={handleHasStudioChange}

          openPostApi={openPostApi}
          setOpenPostApi={setOpenPostApi}

          hasStudio={hasStudio}
          studioAddress={studioAddress}
          studioCity={studioCity}
          setStudioCity={setStudioCity}
          setStudioAddress={setStudioAddress}
        />
      }
      <button className={styles.submitBtn} onClick={handleRegister}>{user.isRegister ? '정보수정' : '회원가입'}</button>
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
    setIsOtherArea,
    handleActivityCityChange, setActivityAddress,
    handleCategoryChange,
    handleHasStudioChange,
    setStudioCity, setStudioAddress,
    setOpenPostApi
  }) {
  const categories = useSelector(store => store.categories.categories)

  const areas = Object.keys(AREA)

  const handlePostChange = data => {
    setOpenPostApi(false)
    setStudioCity(data.address)
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
        <label>지역</label><br />
        <select value={activityCity} onChange={e => handleActivityCityChange(e.target.value)}>
          {
            areas.map(area =>
              <option value={area} key={area}>{area}</option>
            )
          }
        </select>
        <br />
        <select value={activityAddress} onChange={e => setActivityAddress(e.target.value)}>
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
            <input
              type="radio"
              value={true}
              checked={isOtherArea === true}
            />
            <div className={styles.radioBtn} onClick={() => setIsOtherArea(true)}>
              <CheckCircleIcon />
            </div>
            <br />
          </div>
          <div>
            <input
              type="radio"
              value={false}
              checked={isOtherArea === false}
            />
            <div className={styles.radioBtn} onClick={() => setIsOtherArea(false)}>
              <CancelIcon />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.inputContainer}>
          <label>스튜디오</label>
        </div>
        <div className={`${styles.radioContainer} ${styles.radio}`}>

          <div>
            <input
              type="radio"
              value={true}
              checked={hasStudio}
            />
            <div className={styles.radioBtn} onClick={() => handleHasStudioChange(true)}>
              <PersonIcon />
              <label>보유</label>
            </div>
            <br />
          </div>
          <div>
            <input
              type="radio"
              value={false}
              checked={hasStudio === false}
            />
            <div className={styles.radioBtn} onClick={() => handleHasStudioChange(false)}>
              <PersonIcon />
              <label>미보유</label>
            </div>
          </div>
        </div>
      </div>


      {
        hasStudio &&
        <div>
          <div className={styles.inputContainer}>
            <label>스튜디오 주소</label>
            <input type="text" value={studioCity} onChange={e => setStudioCity(e.target.value)} onClick={() => setOpenPostApi(!openPostApi)} />
          </div>
          <div className={styles.inputContainer}>
            <label>상세주소</label>
            <input type="text" value={studioAddress} onChange={e => setStudioAddress(e.target.value)} />
          </div>
        </div>
      }

      {
        openPostApi &&
        <div className={styles.postApiContainer}>
          <DaumPostcode onComplete={data => handlePostChange(data)} />
        </div>
      }

    </div>
  )
}

export default RegForm
