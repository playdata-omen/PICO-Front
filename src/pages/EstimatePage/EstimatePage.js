import React from 'react'
import { useParams } from 'react-router'
import EstimateDetail from '../../components/EstimateDetail/EstimateDetail'
import styles from '../Pages.module.css'

function EstimatePage() {

  let { estimateIdx } = useParams()
  return (
    <div className={styles.container}>
      <EstimateDetail estimateIdx={estimateIdx} />
    </div>
  )
}

export default EstimatePage
