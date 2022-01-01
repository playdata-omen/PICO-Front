import React from 'react';
import RegForm from './RegForm/RegForm';
import styles from './RegisterContainer.module.css';

function RegisterContainer() {
  return (
    <div className={styles.container}>
      <RegForm />
    </div>
  );
}

export default RegisterContainer;
