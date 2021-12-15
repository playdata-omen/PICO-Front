import styles from './ProgressBar.module.css'
export const ProgressBar = ({page, num}) => {

  let pLen = []
  let i = 1
  while(i <= num) {
    pLen.push(i)
    i++
  }

  return (
    <div className={styles.progressBar}>
      {
        pLen.map(v =>
          <div>
            <input type="radio" value={page} checked={page >= v}/>
            <div className={styles.bar}/>
          </div>
        )
      }
    </div>
  )
}