import React, { useState, useEffect } from 'react'
import MyInfoCard from '../../components/Cards/MyInfoCard/MyInfoCard'
import MyPageContents from '../../components/MyPageContainer/MyPageContents'
import styles from '../Pages.module.css'

function MyPage({ user }) {


  return (
    <div className={styles.container}>
      <MyPageContents user={user} />
    </div>
  )
}

export default MyPage
