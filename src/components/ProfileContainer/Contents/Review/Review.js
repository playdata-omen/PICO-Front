import React, { useState, useEffect } from 'react'
import { getReviewList } from '../../../../api/Review'
import ReviewCard from '../../../Cards/ReviewCard/ReviewCard'
import styles from './Review.module.css'

function Review({ user }) {

  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      const data = await getReviewList(user.userIdx)
      console.log(data)
      setReviews(data)
      setLoading(false)
    }
    fetchData()
  }, [])

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
