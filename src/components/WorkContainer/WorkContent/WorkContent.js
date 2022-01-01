import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { deleteWork } from '../../../api/Work';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import styles from './WorkContent.module.css';
import { useNavigate } from 'react-router';
function WorkContent({ work }) {
  let navigate = useNavigate();

  const categories = useSelector((store) => store.categories.categories);
  const photographerIdx = useSelector((store) => store.auth.photographer.photographerIdx);
  const [category, setCategory] = useState(null);
  const [imageViewer, setImageViewer] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageviewer = (photoUrl) => {
    setImageViewer(true);
    setImage(photoUrl);
  };

  const handleDeleteWork = async () => {
    navigate('/');
    const flag = await deleteWork(work.workIdx);
    flag ? handleDeleteSuccess() : alert('삭제 실패');
  };

  const handleDeleteSuccess = () => {
    alert('삭제성공');
    navigate('/myPage');
  };

  useEffect(() => {
    const fetchData = async () => {
      const cat = await categories.filter(
        (cat) => cat.categoryIdx === work.categoryIdx,
      )[0].kind;
      setCategory(cat);
      console.log(work);
    };
    fetchData();
  }, []);

  const imgContainer = work.photos.map((photoUrl) => (
    <div className={styles.imgCard} onClick={() => handleImageviewer(photoUrl)}>
      <img src={photoUrl} alt={photoUrl} />
    </div>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.workInfoContainer}>
        <div className={styles.workInfoHeader}>
          <label>{work.title}</label>
          {
            work.photographerIdx === photographerIdx &&
            (
              <button onClick={handleDeleteWork}>작품삭제</button>
            )
          }
        </div>
        <label>{work.content}</label>
        <br />
      </div>
      <div className={styles.categoryLabel}>
        <label>{category}</label>
      </div>
      <div className={styles.workImgContainer}>{imgContainer}</div>

      {
        imageViewer &&
        (
          <ImageViewerContainer
            setImageViewer={setImageViewer}
            image={image}
            setImage={setImage}
            photos={work.photos}
          />
        )
      }
    </div>
  );
}

export default WorkContent;

const ImageViewerContainer = ({ setImageViewer, image, setImage, photos }) => {
  const [index, setIndex] = useState(photos.indexOf(image));

  const closeImageViewer = () => {
    setImageViewer(false);
    setImage(null);
  };

  const prevIndex = (e) => {
    e.stopPropagation();
    index == 0 ? setIndex(photos.length - 1) : setIndex(index - 1);
  };

  const nextIndex = (e) => {
    e.stopPropagation();
    index < photos.length - 1 ? setIndex(index + 1) : setIndex(0);
  };

  return (
    <div className={styles.imageViewerContainer} onClick={closeImageViewer}>
      <div className={styles.imageViewer}>
        <div className={styles.imgContainer}>
          <img src={photos[index]} />
        </div>
        <div className={styles.btnContainer}>
          <label onClick={(e) => prevIndex(e)}>
            <ArrowCircleLeftIcon />
          </label>
          <label onClick={(e) => nextIndex(e)}>
            <ArrowCircleRightIcon />
          </label>
        </div>
      </div>
    </div>
  );
};
