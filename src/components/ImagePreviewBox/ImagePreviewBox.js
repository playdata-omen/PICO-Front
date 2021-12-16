import React from 'react';
import styles from './ImagePreviewBox.module.css'

export function ImagePreviewBox(props) {
    return (
        <div className={styles.previewContainer}>
            <img src={props.file} />
        </div>
    )
}
