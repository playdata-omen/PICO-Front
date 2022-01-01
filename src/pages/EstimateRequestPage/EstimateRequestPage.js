import React from 'react';
import EstimateReqFormContainer from '../../components/EstimateReqForm/EstimateReqFormContainer';
import styles from '../Pages.module.css';
import { useParams } from 'react-router';

function EstimateRequestPage() {
  let { photographerIdx } = useParams();

  return (
    <div className={styles.container}>
      <EstimateReqFormContainer photographerIdx={photographerIdx} />
    </div>
  );
}

export default EstimateRequestPage;
