import React from 'react'
import { useSelector } from 'react-redux'
import styles from './WorkContent.module.css'

function WorkContent({work}) {

  const categories = useSelector(store => store.categories.categories)

  const imgContainer = work.photos.map(photoUrl => 
    <div className={styles.imgCard}>
      <img src={photoUrl} alt={photoUrl}/>
    </div>
  )

  const categoryLabel = categories[categories.indexOf(categories.filter(cat => cat.categoryIdx === work.category)[0])].kind
  
  return (
    <div className={styles.container}>
      {/* 작품정보 컨테이너 */}
      <div className={styles.workInfoContainer}>
        <label><h3>{work.title}</h3></label>
        {work.content}<br/>
      </div>
      <div className={styles.categoryLabel}>
        <label>{categoryLabel}</label>
      </div>
      {/* 사진 컨테이너 */}
      <div className={styles.workImgContainer}>
        {imgContainer}
      </div>
    </div>
  )
}

export default WorkContent
