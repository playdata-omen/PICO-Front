import React, { useState } from 'react';
import styles from './ImageSearchContainer.module.css'
import { ImagePreviewBox } from '../ImagePreviewBox/ImagePreviewBox'
import { ImageUploadBox } from '../ImageUploadBox/ImageUploadBox'

function ImageSearchContainer() {
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
          <ImagePreviewBox 
            file={file}
          />
        :
          <ImageUploadBox 
            fileChange={handleFileChange}
            multiple={false}
          />
      }
    </div>
  ) 
}

export default ImageSearchContainer
