import React from 'react';
import RegForm from '../RegisterContainer/RegForm/RegForm';
import styles from './ProfileUpdateContainer.module.css';

function ProfileUpdateContainer() {
  return (
    <div className={styles.container}>
      <RegForm />
    </div>
  );
}

export default ProfileUpdateContainer;
