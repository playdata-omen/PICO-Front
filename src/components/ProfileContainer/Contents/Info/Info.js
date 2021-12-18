import React, { useState, useEffect } from 'react'
import styles from './Info.module.css'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddButton } from '../../../Button/Button';
import { getPhotographerDetail } from '../../../../api/User';
import { useNavigate } from 'react-router';

function Info({ user }) {
  let navigate = useNavigate()

  const categories = useSelector(store => store.categories.categories)

  const [photographer, setPhotographer] = useState(null)
  const [photographerLoading, setPhotographerLoading] = useState(true)

  const updateProfile = () => {
    setTimeout(
      function () {
        navigate('update')
      }, 700
    )
  }
  
  useEffect( async() => {
    setPhotographer(await getPhotographerDetail(user.userIdx))
    setPhotographerLoading(false)
  }, [photographerLoading])

  return (

    <div className={styles.container}>
      <div className={styles.basicInfoContainer}>
        <label>{user.isPhotographer ? "작가" : "기본"} 정보</label>
        <ul>
          <li>이름: {user.name}</li>
          <li>이메일: {user.email}</li>
          <li>전화번호: {user.phone}</li>
        </ul>
      </div>

      {user.isPhotographer && <PhotographerInfo photographer={photographer} categories={categories} photographerLoading={photographerLoading} />}


      {!user.isPhotographer &&

        <div className={styles.basicInfoContainer} onClick={updateProfile}>
          <div className={styles.btnContainer}>
            <div className={styles.btn}>
              <div><AddButton /></div>
              <span>작품을 등록하고싶으면 작가 등록을 하세요</span>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default Info


const PhotographerInfo = ({ photographer, categories, photographerLoading }) => {

  return (
    photographerLoading ?

      <div>작가 정보 불러오는 중...</div>

      :

      <div className={styles.basicInfoContainer}>
        <ul>
          <li><span>활동 지역: {photographer.activityCity} {photographer.activityAddress}</span></li>
          <li><span>타지역 활동 가능: </span>{photographer.isOtherArea ? <CheckCircleIcon /> : <CancelIcon />}</li>
          <li><span>스튜디오 보유: </span>{photographer.hasStudio ? <CheckCircleIcon /> : <CancelIcon />}</li>
          {photographer.hasStudio && <li><span>스튜디오 주소: {photographer.studioCity} {photographer.studioAddress}</span></li>}
        </ul>
        <label>촬영 분야</label>
        <ul>
          <div className={styles.categoryContainer}>
            {
              categories.filter(category => photographer.category.includes(category.categoryIdx))
                .map(category =>
                  <div className={styles.categoryLabel}>
                    {category.kind}
                  </div>
                )
            }
          </div>
        </ul>
      </div>
  )
}