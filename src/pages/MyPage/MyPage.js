import React from 'react'
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
