import React from 'react';
import styles from './ImagePreviewBox.module.css'
import { useNavigate } from 'react-router'

export const ImagePreviewBox = ({ images }) => {
	return (
			<div className={styles.previewContainer}>
				{images.map(file => 
					<div key={file.name} className={styles.previewContainer}>
						<img src={file.preview} alt=""/>
					</div>
				)}
			</div>
	)
}

export const ImagePreviewBox2 = ({ recommendImages }) => {
	let navigate = useNavigate()

	if (recommendImages.length === 1) {
		const recommendImage = recommendImages[0]
		return (
			<div className={styles.previewContainer}
				   key={recommendImage["photoIdx"]} 
					//  onClick={navigate(`/profile/${recommendImage["photographerIdx"]}`)}
			>
				<img src={recommendImage["storedFilePath"]} alt=""/>
			</div>
		)
	}else {
		return (
			<div className={styles.previewOthersContainer}>
				{recommendImages.map(file => 
					<div className={styles.previewContainer}
							 key={file["photoIdx"]} 
							//  onClick={navigate(`/profile/${file["photographerIdx"]}`)}
					>
						<img src={file["storedFilePath"]} alt=""/>
					</div>
				)}
			</div>
		)
	}
}
