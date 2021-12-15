import React, { useState } from 'react';
import styles from '../Pages.module.css'
import { RecommendContainer } from '../../components/ImageRecommend/ImageRecommend'

function imageRecommendedPage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (encoded) => {
    if (encoded) {
      setFile(encoded[0]);
    }
  } 


  return (
    <div className={styles.container}>
      {
        file ?
          <RecommendContainer 
            file={file}
          />

        :
          
          <ImageUploadContainer 
            fileChange={handleFileChange}
            multiple={false}
          />
      }
    </div>
  ) 
}

export default imageRecommendedPage
