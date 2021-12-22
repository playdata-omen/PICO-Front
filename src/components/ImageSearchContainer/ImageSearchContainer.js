import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageSearchContainer.module.css'
import { ImagePreviewBox, ImagePreviewBox2, ImagePreviewBox3 } from './ImagePreviewBox/ImagePreviewBox'
import { ImageUploadBox } from './ImageUploadBox/ImageUploadBox'
import { AddButton } from '../Button/Button';
import { getRecommendListFromFlask } from '../../api/Recommend'


function ImageSearchContainer() {
  const [images, setImages] = useState([]);
  const [recommendImages, setRecommendImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: "image/*",
    maxSize: 100000000, // 100 mb
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        alert("파일형식이나 파일크기를 확인해주세요")
      } else {
          setImages(
            acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }))
          )
          analize(acceptedFiles[0]);
        }
      }
    })

  const analize = async (image) => {
    setMessage("이미지 분석 중입니다");
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      const resData = await getRecommendListFromFlask(reader.result);
      if (resData) {
        setRecommendImages([])
        await setRecommendImages(resData["search_result"]);
      }
      setMessage("유사한 이미지가 없습니다");
      setLoading(false);
    };
  }
    
  return (
    <div className={styles.container}>
      {
        images[0] ?
          <div className={styles.subContainer}>
            <div className={styles.upperContainer}>
              {
                isDragActive ?
                  <div className={styles.upperSubContainer}>
                    {
                      isDragReject ?
                        <div className={styles.upperLeftReject} {...getRootProps()}>
                          <input {...getInputProps()} />
                          <span><h3>파일형식이나 파일크기를 확인해주세요</h3></span>
                        </div>
                      :
                        <div className={styles.upperLeftAccept} {...getRootProps()}>
                          <input {...getInputProps()} />
                          <span><h3>여기에 사진을 끌어 놓으세요</h3></span>
                        </div>
                    }
                  </div>
                :
                  <div className={styles.upperSubContainer}>
                    <div className={styles.upperLeft} {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className={styles.hideUploadBox}>
                        <h3>원하는 이미지를 업로드하거나 드래그하세요</h3>
                        <AddButton />
                      </div>
                      <div className={styles.previewContainer}>
                        <ImagePreviewBox 
                          images={images}
                        />
                      </div>
                    </div> 
                  </div>
              }
              <div className={styles.upperRight}>
                <label>
                  <h3>분석 결과</h3>
                </label>
                <div className={styles.recommendFirst}>
                  {
                    loading ?  
                      <div>
                        {message}
                      </div>
                    :
                      <div className={styles.recommendFirst}> 
                      {
                        recommendImages[0] ?
                          <ImagePreviewBox2
                          recommendImages={recommendImages.slice(0,1)}
                          />
                        :
                          <div>
                            {message}
                          </div>
                      }
                      </div>    
                  }
                </div>
              </div>
            </div>
            <div>
              {recommendImages[1] &&
                <div className={styles.lowerContainer}>
                  <span>
                    <h3>다른 사진들은 어떠신가요?</h3> 
                  </span>
                  <div className={styles.otherImagesContainer}>
                    <ImagePreviewBox2
                      recommendImages={recommendImages.slice(1)}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        :
          <div className={styles.subContainerMain}>
            <ImageUploadBox 
              setImages={setImages}
              setMultiple={false}
              analize={analize}
            />
          </div>
      }
    </div>

  ) 
}

export default ImageSearchContainer
