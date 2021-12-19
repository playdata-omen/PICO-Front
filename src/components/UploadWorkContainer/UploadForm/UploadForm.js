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

export const Form3 = ({images, setImages}) => {

  const {getRootProps, getInputProps} = useDropzone({
    accept: "image/*",
    onDrop: (acceptedimages) => {
      acceptedimages.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })).forEach(file => setImages([...images, file]))
    }
  })

  const deleteImg = name => {
    images.forEach((file, index) => {
      file.name === name && setImages(images.filter((f, i) => i != index))
    })
  }

  const handleImgLimit = name => {
    alert('작품 사진 업로드는 6장까지만 가능합니다')
    deleteImg(name)
  }

  const imageContainer = images.map((file, i) => 
    <div key={`${file.name}${i}`} className={styles.image}>
      <div onClick={()=> deleteImg(file.name)}>
        <img src={file.preview} alt=""/>
      </div>
    </div>  
  )

  const dropZone = (
    <div {...getRootProps()} className={styles.dropZoneContainer}> 
      <input {...getInputProps()}/>
      <AddButton />
      <span>Drop images here</span>
    </div>
  )

  useEffect(() => {
    images.length > 6 && handleImgLimit(images.slice(-1)[0].name)
  },[images])

  return(
    <div className={styles.container}>
      <label>사진 업로드</label>
      <div className={styles.contentContainer}>
        <div className={styles.uploadContainer}>
          { dropZone }
        </div>
          <div className={styles.previewContainer}>
            {imageContainer}
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
