import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './UploadForm.module.css'

import { useDropzone } from 'react-dropzone';
import { style } from '@mui/system';
import { AddButton } from '../../Button/Button';



export const Form1 = ({ category, setCategory }) => {

  const [categories, setCategories] = useState(useSelector(state => state.categories.categories))
  
  return (
    <div className={styles.container}>
      <label>작품 분야</label>
      <div className={styles.contentContainer}>
        <div className={styles.category}>
        {
          categories.map(cat =>
            <div>
              <input type='radio' value={cat.categoryIdx} checked={cat.categoryIdx === category}/> 
              <div key={cat.categoryIdx} className={styles.categoryBtn} onClick={() => setCategory(cat.categoryIdx)}>
                <label>{cat.kind}</label>
              </div>
            </div>
          )
        }
        </div>
      </div>
    </div>

  )
}

export const Form2 = ({ setTitle }) => {
  return(
    <div className={styles.container}>
      <div className={`${styles.contentContainer} ${styles.form2}`}>
        <label>작품제목</label>
        <div className={styles.contentContainer}>
          <input type="text" onChange={event => setTitle(event.target.value)}/>
        </div>
      </div>
    </div>
  )
}

export const Form3 = () => {
  const [files, setFiles] = useState([])
  const {getRootProps, getInputProps} = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        // acceptedFiles
        acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
        )
      }
    })
    
    const images = files.map(file => 
      <div key={file.name} className={styles.image}>
      <div>
        <img src={file.preview} alt="" style={{
          width: '100px'
        }}/>
      </div>
    </div>  
  )
  console.log(files)

  const dropZone = (
    <div {...getRootProps()} className={styles.dropZoneContainer}> 
      <input {...getInputProps()}/>
      <AddButton />
      <span>Drop Files here</span>
    </div>
  )
  return(
    <div className={styles.container}>
      <label>사진 업로드</label>
      <div className={styles.contentContainer}>
        <div className={styles.uploadContainer}>
          { dropZone }
        </div>
          <div className={styles.previewContainer}>
            {images}
          </div>
      </div>
    </div>
  )
}

export const Form4 = ({ setContent }) => {

  return(
    <div className={styles.container}>
      <label>상세정보</label>
      <div className={styles.contentContainer}>
        <textarea onChange={event => setContent(event.target.value)} />
      </div>
    </div>
  )
}
