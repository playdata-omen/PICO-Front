import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RegForm from './RegForm/RegForm'

import styles from './RegisterContainer.module.css'

function RegisterContainer() {
  return (
    <div className={styles.container}>
      <RegForm />
    </div>
  )
}

export default RegisterContainer
