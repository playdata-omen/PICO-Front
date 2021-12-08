import React from 'react'
import { CircularProgress } from '@mui/material';
import styles from './Spinner.module.css'

function Spinner() {
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  )
}

export default Spinner
