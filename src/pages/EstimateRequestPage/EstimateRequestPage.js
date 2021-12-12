import React from 'react'
import EstimateReqFormContainer from '../../components/EstimateReqForm/EstimateReqFormContainer'
import styles from '../Pages.module.css'

function EstimateRequestPage() {
  return (
    <div className={styles.container}>
      <EstimateReqFormContainer />
    </div>
  )
}

export default EstimateRequestPage


