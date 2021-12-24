import React from 'react'
import { useParams } from 'react-router'
import ReviewContainer from '../../components/ReviewContainer/ReviewContainer'
import styles from '../Pages.module.css'

export default function ReviewPage() {

  const { photographerIdx, applyIdx } = useParams()
  return (
    <div className={styles.container}>
      <ReviewContainer photographerIdx={photographerIdx} applyIdx={applyIdx} />
    </div>
  )
}
