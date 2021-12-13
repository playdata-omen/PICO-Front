import React from 'react'

import ProfileContainer from '../../components/ProfileContainer/ProfileContainer'
import styles from '../Pages.module.css'

function ProfilePage({ user }) {
  return (
    <div className={styles.container}>
      <ProfileContainer user={user}/>
    </div>
  )
}

export default ProfilePage
