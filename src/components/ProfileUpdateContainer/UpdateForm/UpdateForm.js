import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './UpdateForm.module.css'

import { AREA } from '../../../constants';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch } from 'react-redux';
import { auth_actions } from '../../../_actions/auth_action.js'

function UpdateForm() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user)
  const categories = useSelector(store => store.categories.categories)

  // 일반 유저 정보
  const [name, setName] = useState(user.name)
  const [nickName, setNickName] = useState(user.nickName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isPhotographer, setIsPhotographer] = useState(false)

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
    dispatch(auth_actions.registerUser(user.userIdx, name, nickName, email, phone, isPhotographer))
    
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
      {/* {
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
          setLocation2={setLocation2}

          handleHasStudioChange={handleHasStudioChange}

          setOpenPostApi={setOpenPostApi}
          handlePCategoryChange={handlePCategoryChange}
          
          handleAddressChange={handleAddressChange} 
          handleAddressDetailChange={handleAddressDetailChange}
        />
      } */}
      <button className={styles.submitBtn} onClick={handleRegister}>회원가입</button>      
    </div>
  )
}

export default UpdateForm
