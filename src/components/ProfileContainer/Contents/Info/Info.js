import React from 'react'
import styles from './Info.module.css'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddButton } from '../../../Button/Button';

function Info({user}) {

  const photographer = useSelector(state => state.auth.photographer)

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
      {
        user.isPhotographer ?
        <div className={styles.basicInfoContainer}>
          <ul>
            <li><span>작업위치: {photographer.city} {photographer.address}</span></li>
            <li><span>스튜디오 보유: </span>{photographer.hasStudio ? <CheckCircleIcon/> : <CancelIcon/>}</li>
            {photographer.hasStudio && <li><span>스튜디오 주소: {photographer.studioAddress}</span></li>}
          </ul>
          <label>촬영 분야</label>
          <ul>
            <li><span>작업위치: {photographer.city} {photographer.address}</span></li>
            <li><span>스튜디오 보유: </span>{photographer.hasStudio ? <CheckCircleIcon/> : <CancelIcon/>}</li>
            {photographer.hasStudio && <li><span>스튜디오 주소: {photographer.studioAddress}</span></li>}
          </ul>
        </div>

        :

        <div className={styles.basicInfoContainer}>
          <AddButton />
          작가등록 버튼
        </div>

      }

    </div>
  )
}

export default Info
