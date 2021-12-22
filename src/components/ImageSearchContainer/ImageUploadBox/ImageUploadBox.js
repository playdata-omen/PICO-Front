import React from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './ImageUploadBox.module.css';
import { AddButton } from '../../Button/Button';

export const ImageUploadBox = ({ setImages, setMultiple, analize }) => {
  const {getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: "image/*",
    maxSize: 100000000, // 100 mb
    multiple: setMultiple,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        alert("파일형식이나 파일크기를 확인해주세요")
      } else {
          setImages(
            acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }))
          )
          analize(acceptedFiles[0])
        }
      }
    })

  return (
    <div className={styles.container}>
      {
        isDragActive ?
          <div className={styles.container}>
            {
              isDragReject ?
                <div className={styles.dropzoneReject} {...getRootProps()}>
                  <input {...getInputProps()} />
                    <span><h3>파일형식이나 파일크기를 확인해주세요</h3></span>
                      <AddButton />
                </div>
              :
                <div className={styles.dropzoneAccept} {...getRootProps()}>
                  <input {...getInputProps()} />
                    <span><h3>여기에 사진을 끌어 놓으세요</h3></span>
                      <AddButton />
                </div>
            }
          </div>
        :
          <div className={styles.container} {...getRootProps()}>
             {/* <input type='file' onChange={test} /> */}
             <input {...getInputProps()} />
               <span><h3>원하는 이미지를 업로드하거나 드래그하세요</h3></span>
                 <AddButton />
          </div>
      }
    </div>
  )
}
