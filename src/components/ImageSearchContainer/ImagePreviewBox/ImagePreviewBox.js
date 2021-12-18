import React from 'react';
import styles from './ImagePreviewBox.module.css'

export const ImagePreviewBox = ({ files }) => {
    return (
				<div className={styles.previewContainer}>
					{files.map(file => 
						<div key={file.name} className={styles.previewContainer}>
								<img src={file.preview} alt="1_snap.jpg"/>
						</div>
					)}
				</div>
    )
}
