import styles from './ReviewForm.module.css'

export const Form1 = () => {
  return (
    <div>
      <label>별점</label>
    </div>
  )
}
export const Form2 = () => {
  return (
    <div className={styles.container}>
      <label>리뷰</label>
      <div className={styles.contentContainer}>
        <textarea onChange={event => console.log(event.target.value)} />
      </div>
    </div>
  )
}

