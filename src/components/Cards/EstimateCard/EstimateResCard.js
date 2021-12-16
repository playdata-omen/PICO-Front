import React, { useEffect } from 'react'
import styles from '../Cards.module.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';


function EstimateResCard({ photographer }) {

  const fullStar = [...Array(Math.floor(photographer.grade))].map((e, i) => <StarIcon key={i}/>)
  const halfStar = [...Array(Math.ceil(photographer.grade) - Math.floor(photographer.grade))].map((e, i) => <StarHalfIcon key={i}/>)
  const voidStar = [...Array(5 - Math.ceil(photographer.grade))].map((e, i) => <StarOutlineIcon key={i}/>)

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}> 
        {photographer.responseIdx}
      </div>
      <div className={styles.cardInfoContainer}>
        <span>작가 이름: {photographer.name}</span>
        <span>{fullStar}{halfStar}{voidStar}</span>
      </div>
      <div className={styles.cardInfoBtn}>
        <ArrowRightIcon fontSize='large' className={styles.btn}/>
      </div>
    </div>
  )
}

export default EstimateResCard
