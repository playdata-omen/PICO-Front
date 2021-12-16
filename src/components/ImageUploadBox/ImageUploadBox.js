import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageUploadBox.module.css';
import { AddButton } from '../Button/Button';

export function ImageUploadBox(props) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 0) {
      alert("파일형식이나 파일크기를 확인해주세요")
    }
    fileChange(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/gif", "image/*"],
    maxSize: 100000000, // 100 mb
    multiple: props.multiple,
    onDrop
  })

  const fileChange = (acceptedFiles) => {
    if (acceptedFiles) {
      let encoded = [];
      for (let key in acceptedFiles) {
        let reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[key])
        reader.onload = () => {
          encoded.push(reader.result);
          if (encoded.length === acceptedFiles.length) {
            props.fileChange(encoded)
          }
        }
      }
    }
  };


  return (
    <div className={styles.container}>
      {
        isDragActive ?
          <div className={styles.container}>
            {
              isDragReject ? 
                <div className={styles.dropzoneReject} {...getRootProps()}>
                  <input hidden={true} type="file" {...getInputProps()} />
                    <h3>
                      파일형식이나 파일크기를 확인해주세요
                    </h3>
                  <div className={styles.btn}>
                      <AddButton />
                  </div>
                </div>
                :
                <div className={styles.dropzoneAccept} {...getRootProps()}>
                  <input hidden={true} type="file" {...getInputProps()} />
                    <h3>
                      여기에 사진을 끌어 놓으세요
                    </h3>
                  <div className={styles.btn}>
                      <AddButton />
                  </div>
                </div>
            }
          </div>
        :
          <div className={styles.container} {...getRootProps()}>
            <input hidden={true} type="file" {...getInputProps()} />
                  <h3>
                    원하는 이미지를 업로드하거나 드래그하세요
                  </h3>
            <div className={styles.btn}>
                <AddButton />
            </div>
          </div>
      }
    </div>
  )
}
