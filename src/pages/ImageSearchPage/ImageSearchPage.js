import styles from '../Pages.module.css';
import ImageSearchContainer from '../../components/ImageSearchContainer/ImageSearchContainer';

function ImageSearchPage() {
  return (
    <div className={styles.container}>
      <div className={styles.componentContainer}>
        <ImageSearchContainer />
      </div>
    </div>
  );
}

export default ImageSearchPage;
