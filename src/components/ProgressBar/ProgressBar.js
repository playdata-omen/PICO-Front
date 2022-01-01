import styles from './ProgressBar.module.css';
export const ProgressBar = ({ page, num }) => {
  let pLen = [];
  let i = 1;
  while (i <= num) {
    pLen.push(i);
    i++;
  }

  const barCount = pLen.map((v) => (
    <div>
      <input type="radio" value={page} checked={page >= v} />
      <div className={styles.bar} />
    </div>
  ));

  return (
    <div className={styles.progressBar}>{barCount}</div>
  );
};
