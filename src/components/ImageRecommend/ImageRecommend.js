import React, { useState, useEffect } from 'react';
import styles from './ImageRecommend.module.css'
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export function RecommendContainer(props) {
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    setFile(props.file)
  }, [])

  const handleFileSend = () => {
    let formData = new FormData();

    formData.append("userfile", file);
    axios.post("http://localhost:5000/search_image", formData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.uploadContainer}>
          <div className={styles.previewContainer}>
            <div className={styles.uploadPreview}>
              <img className={styles.imgSize} src={file} />
            </div>
          </div>
          <div className={styles.resultContainer}>
            <div className={styles.uploadResult}>
              <div className={styles.iconBox} onClick={handleFileSend}>
                <SearchIcon />
              </div>
              <div className={styles.resultDetail}>
                <h3>
                  추천정보
                </h3>
              </div>
            </div>
          </div>
      </div>
      <div className={styles.recommendContainer}>
        <div className={styles.recommendTitle}>
         추천 이미지들 
        </div>
        <div className={styles.imgsRecommended}>
          이미지
        </div>
      </div>
    </div>
  )
}
