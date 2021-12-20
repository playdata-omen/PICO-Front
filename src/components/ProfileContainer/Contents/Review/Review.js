import React, { useState, useEffect } from 'react'
import { getReviewList } from '../../../../api/Review'
import ReviewCard from '../../../Cards/ReviewCard/ReviewCard'
import styles from './Review.module.css'

function Review({ user }) {

  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const data = await getReviewList(user.userIdx)
    setReviews(data)
    setLoading(false)
    console.log(data)
  }, [])


//   {
//     "reviewList": [
//         {
//             "reviewIdx": 1,
//             "created": "2021-12-20T01:00:37.000+0000",
//             "content": "i'm so sad",
//             "grade": 4.6
//         },
//         {
//             "reviewIdx": 6,
//             "created": "2021-12-20T08:01:43.000+0000",
//             "content": "i'm so happy",
//             "grade": 4.2
//         }
//     ]
// }

  return (
    loading ?

      <div>
        작업 불러오는 중...
      </div>

      :

      <div className={styles.container}>
        {
          reviews.map(review =>
            <ReviewCard review={review}/>
          )
        }
      </div>
  )
}

export default Review
