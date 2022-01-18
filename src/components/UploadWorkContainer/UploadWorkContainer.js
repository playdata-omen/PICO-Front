import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { uploadWork } from '../../api/Work';
import { getBase64 } from '../../service/FileUtils';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import Spinner from '../Spinner/Spinner';
import { Form1, Form2, Form3, Form4 } from './UploadForm/UploadForm';
import styles from './UploadWorkContainer.module.css';

function UploadWorkContainer() {
  let navigate = useNavigate();
  const photographerIdx = useSelector(
    (store) => store.auth.photographer.photographerIdx,
  );

  const [converted, setConverted] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(6);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const nextPage = () => {
    if (page == 2 && title === '') alert('작품이름을 작성해주세요');
    else if (page == 3 && images.length === 0) alert('사진을 업로드 해주세요');
    else page < 4 && setPage((page) => page + 1);
  };

  const prevPage = () => page > 1 && setPage((page) => page - 1);

  const upload = async () => {
    setLoading(true);
    const response = await uploadWork(
      photographerIdx,
      category,
      title,
      converted,
      content,
    );
    response && setLoading(false);
    navigate('/myPage');
    alert('업로드 성공');
  };

  useEffect(() => {
    setConverted([]);
    images.forEach(async (image) => {
      setConverted([
        ...converted,
        await getBase64(image),
      ]);
    });
    console.log(converted);
  }, [images]);

  return loading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <ProgressBar page={page} num={4} />
      <br />
      <div>
        {page === 1 && <Form1 category={category} setCategory={setCategory} />}
        {page === 2 && <Form2 setTitle={setTitle} />}
        {page === 3 && <Form3 images={images} setImages={setImages} />}
        {page === 4 && <Form4 setContent={setContent} />}
      </div>

      <div className={styles.formBtnContainer}>
        {page > 1 && (
          <button className={styles.formBtn} onClick={prevPage}>
            이전
          </button>
        )}
        {page < 4 && (
          <button className={styles.formBtn} onClick={nextPage}>
            다음
          </button>
        )}
        {page == 4 && (
          <button className={styles.formBtn} onClick={upload}>
            작품 업로드
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadWorkContainer;
