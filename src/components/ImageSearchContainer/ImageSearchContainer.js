import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageSearchContainer.module.css'
import { ImagePreviewBox } from './ImagePreviewBox/ImagePreviewBox'
import { ImageUploadBox } from './ImageUploadBox/ImageUploadBox'
import { AddButton } from '../Button/Button';
import { getRecommendReqList, getRecommendDetail } from '../../api/Recommend'

import picoLogo from '../../img/pico-logo.png'

import snap_1 from './testImages/1_snap.jpg'
import wedding_2 from './testImages/2_wedding.jpg'
import product_3 from './testImages/3_product.jpg'
import photo_4 from './testImages/4_photo.jpg'
import event_5 from './testImages/5_event.jpg'

import axios from 'axios';

function ImageSearchContainer() {
  const [files, setFiles] = useState(null);
  const [recommendFiles, setRecommendFiles] = useState(false);
  // const [loading, setLoading] = useState(true)
  const [test, setTest] = useState('');
  const [test_src, setTest_src] = useState([
    "1_snap.jpg",
    "2_wedding.jpg",
    "3_product.jpg",
    "4_photo.jpg",
    "5_event.jpg",
  ]);

  // useEffect(async()  => {
  //   const data = await getRecommendReqList(files) // file 인코딩 필요 
  //   setRecommendFiles(data) //리턴 데이터 내용 확인 필 
  //   setLoading(false)
  // },[])

  const {getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: "image/*",
    maxSize: 100000000, // 100 mb
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        alert("파일형식이나 파일크기를 확인해주세요")
      } else {
          setFiles(
            acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }))
          )
          sendFile(acceptedFiles);
        }
      }
    })

  const sendFile = (files) => {
    for (let key in files) {
      let reader = new FileReader();
      reader.readAsDataURL(files[key]);
      reader.onload = () => {
        let data = reader.result.split(',')[1];
        getTestData(data)
      }
    }
  }
      
  const getTestData = (files) => {
    let formData = new FormData();
    formData.append("userfile", files);
    for (let key of formData.keys()) {
      console.log('key:',key);
    }
    // for (let val of formData.values()) {
    //   console.log('value:',val);
    // }
    setTest("");
    axios.post("http://localhost:5000/test_search_image", formData)
      .then(res => {
        console.log(res);
        // console.log(res.data);
        // console.log(res.data["result"]);
        let data = res.data["result"];
        console.log(data);
        // let list = [data[1],data[2],data[3],data[4],data[5]]
        // handleSetTest(list)
      })
      .catch(err => {
        console.log(err);
      });
    };

  const handleSetTest = (datas) => {
    setTest(datas);
  }


    
  return (
    <div className={styles.container}>
      {
        files ?
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
                          files={files}
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
                    // recommendFiles ?  //응답 전에는 false, 응답 후에는 배열(비어있든 아니든)
                    test ?  
                      <div>
                        {test}
                        {/* {
                          recommendFiles[0] ? 
                            <ImagePreviewBox 
                              files={recommendFiles[0]}
                            />
                          :
                            <p>일치하는 사진이 없습니다</p>
                        } */}
                      </div>
                    :
                    <div className={styles.testFirst}>
                      <div className={styles.testFirst}>
                        <img src={event_5} alt=""/>
                      </div>
                    </div>
                      // <div className={styles.loading}>
                      //   <p>분석결과 불러오는 중...</p>
                      // </div>
                  }
                </div>
              </div>
            </div>
            <div className={styles.lowerContainer}>
              <span>
                <p>다른 사진들은 어떠신가요?</p> 
              </span>
              <div className={styles.recommendOthersContainer}>
                <div className={styles.test}>
                  <div className={styles.test}>
                <img src={snap_1} alt=""/>
                {/* <img src='./testImages/1_snap.jpg' alt=""/> */}
                  </div>
                </div>
                <div className={styles.test}>
                  <div className={styles.test}>
                <img src={wedding_2} alt=""/>
                  </div>
                </div>
                <div className={styles.test}>
                  <div className={styles.test}>
                <img src={product_3} alt=""/>
                  </div>
                </div>
                <div className={styles.test}>
                  <div className={styles.test}>
                <img src={photo_4} alt=""/>
                  </div>
                </div>
              </div>
              <ImagePreviewBox
                files={[]}
              />
            </div>
          </div>
        :
          <div className={styles.subContainerMain}>
            <ImageUploadBox 
              setFiles={setFiles}
              setMultiple={false}
              sendFile={sendFile}
            />
          </div>
      }
    </div>

  ) 
}

export default ImageSearchContainer
