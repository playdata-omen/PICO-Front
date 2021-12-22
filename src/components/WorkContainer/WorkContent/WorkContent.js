import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './WorkContent.module.css'

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function WorkContent({ work }) {

  const categories = useSelector(store => store.categories.categories)
  const [category, setCategory] = useState(null)
  const [imageViewer, setImageViewer] = useState(false)
  const [image, setImage] = useState(null)

  const handleImageviewer = (photoUrl) => {
    setImageViewer(true)
    setImage(photoUrl)
    console.log(photoUrl)
  }

  useEffect(async () => {
    const cat = await categories.filter(cat => cat.categoryIdx === work.categoryIdx)[0].kind
    setCategory(cat)
  }, [])

  const imgContainer = work.photos.map(photoUrl =>
    <div className={styles.imgCard} onClick={() => handleImageviewer(photoUrl)}>
      <img src={photoUrl} alt={photoUrl} />
    </div>
  )

  return (
    <div className={styles.container}>
      <div className={styles.workInfoContainer}>
        <label><h3>{work.title}</h3></label>
        {work.content}<br />
      </div>
      <div className={styles.categoryLabel}>
        <label>{category}</label>
      </div>
      <div className={styles.workImgContainer}>
        {imgContainer}
      </div>


      {
        imageViewer &&
        <ImageViewerContainer setImageViewer={setImageViewer} image={image} setImage={setImage} photos={work.photos} />
      }
    </div>
  )
}

export default WorkContent

const ImageViewerContainer = ({ setImageViewer, image, setImage, photos }) => {

  const [index, setIndex] = useState(photos.indexOf(image))

  const closeImageViewer = () => {
    setImageViewer(false)
    setImage(null)
  }

  const prevIndex = () => {
    index == 0 ? setIndex(photos.length - 1) : setIndex(index - 1)
  }
  
  const nextIndex = () => {
    index < photos.length - 1 ? setIndex(index + 1) : setIndex(0)
  }

  return (
    <div className={styles.imageViewerContainer}>
      <div className={styles.imageViewer} >
        <div className={styles.imgContainer} onClick={closeImageViewer}>
          <img src={photos[index]} />
        </div>
        <div className={styles.btnContainer}>
          <label onClick={prevIndex}><ArrowCircleLeftIcon/></label>
          <label onClick={nextIndex}><ArrowCircleRightIcon/></label>
        </div>
      </div>
    </div>

  )
}
