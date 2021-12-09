import React from 'react'
import styles from './MainPageContainer.module.css'

import MainContents from './MainContents/MainContents';

function MainPageContainer() {

  return (
    <div className={styles.container}> 
      <MainContents />
    </div>
  )
}

export default MainPageContainer
