import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import RegForm from './RegForm/RegForm'

import styles from './RegisterContainer.module.css'

function RegisterContainer() {
  const user = useSelector(store => store.auth.user)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)

  const [isPhotographer, setIsPhotographer] = useState(false)
  
  const handleNameChange = value => setName(value)
  const handleEmailChange = value => setEmail(value)
  const handlePhoneChange = value => setPhone(value)
  const handleIsPhotographerChange = value => setIsPhotographer(value)




  return (
    <div className={styles.container}>
      <RegForm />
    </div>
  )
}

export default RegisterContainer
