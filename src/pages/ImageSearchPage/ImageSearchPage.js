import React from 'react'
import ImageUploadContainer from '../../components/ImageUploadContainer/ImageUploadContainer'
import styles from '../Pages.module.css'

function ImageSearchPage() {
  return (
    <div className={styles.container}>
      <ImageUploadContainer />
    </div>
  )
}

export default ImageSearchPage
