import React from 'react';
import styles from './Button.module.css';

export function AddButton() {
  return (
    <div className={styles.btnFrame}>
      <div className={styles.plus} />
      <div className={styles.plus2} />
      <div className={styles.active} />
    </div>
  );
}
