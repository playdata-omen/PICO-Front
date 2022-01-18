import React from 'react';
import ProfileUpdateContainer from '../../components/ProfileUpdateContainer/ProfileUpdateContainer';
import styles from '../Pages.module.css';

function ProfileUpdatePage({ user }) {
  return (
    <div className={styles.container}>
      <ProfileUpdateContainer user={user} />
    </div>
  );
}

export default ProfileUpdatePage;
