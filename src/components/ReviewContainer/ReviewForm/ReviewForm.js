import styles from './ReviewForm.module.css';
import React from 'react';
import Stars from '../../Stars/Stars';

export const Form1 = ({ grade, setGrade }) => {
  return (
    <div className={styles.container}>
      <label>별점</label>
      <div className={styles.contentContainer}>
        <div>
          <select onChange={(e) => setGrade(e.target.value)}>
            {[...Array(6)].map((v, i) => (
              <option value={i}>{i}</option>
            ))}
          </select>
        </div>
        <Stars grade={grade} />
      </div>
    </div>
  );
};

export const Form2 = ({ setContent }) => {
  return (
    <div className={styles.container}>
      <label>리뷰</label>
      <div className={styles.contentContainer}>
        <textarea onChange={(e) => setContent(e.target.value)} />
      </div>
    </div>
  );
};
