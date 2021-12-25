import React from 'react'
import { useParams } from 'react-router'
import WorkContainer from '../../components/WorkContainer/WorkContainer'
import styles from '../Pages.module.css'

function WorkPage() {

  const { workIdx } = useParams()

  return (

    <div className={styles.container}>
      <div className={styles.componentContainer}>
        <WorkContainer workIdx={workIdx} />
      </div>
    </div>
  )
}

export default WorkPage
