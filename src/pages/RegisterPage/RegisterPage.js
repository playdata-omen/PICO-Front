import React from 'react';
import RegisterContainer from '../../components/RegisterContainer/RegisterContainer';
import styles from '../Pages.module.css';

function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterContainer />
    </div>
  );
}

export default RegisterPage;
