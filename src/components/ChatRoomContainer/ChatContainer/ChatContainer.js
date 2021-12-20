import React, { useEffect, useState } from 'react'
import styles from './ChatContainer.module.css'

import SendIcon from '@mui/icons-material/Send';
import { getApplyDetail } from '../../../api/Apply';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { confirmEstimate, confirmOrder } from '../../../api/Estimate';

function ChatContainer({ applyIdx }) {

  let navigate = useNavigate()

  const photographer = useSelector(store => store.auth.photographer)
  const [apply, setApply] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async() => {
    setApply(await getApplyDetail(applyIdx))
    // console.log(apply)
    setLoading(false)
  },[])

  const confirmEstimateHandler = async(estimateIdx, photographerIdx) => {
    await confirmEstimate(estimateIdx, photographerIdx)
  }
  const confirmOrderHandler = async(estimateIdx, photographerIdx) => {
    await confirmOrder(estimateIdx, photographerIdx)
  }

  return (
    <div className={styles.container}>

      {
        !loading &&
        
        <div className={`${styles.content} ${styles.top}`}>
          {
            (photographer && photographer.photographerIdx === apply.photographerIdx) ?
            <div>
              <button>{apply.status}</button>
            </div>

            :
            <div>
              { (apply.estimate.status === 1 || apply.estimate.status ===2) && <button onClick={() => confirmEstimateHandler(apply.estimate.estimateIdx, apply.photographerIdx)}>의뢰확정</button>}
              { apply.estimate.status === 3 && <button onClick={() => confirmOrderHandler(apply.estimate.estimateIdx, 4)}>수행완료</button>}
              { apply.estimate.status === 4 && <button onClick={() => navigate(`/review/${apply.photographerIdx}`)}>리뷰달기</button>}
            </div>
          }
        </div>
      }


      <div className={`${styles.content} ${styles.read}`}>
        <div className={styles.chat}>
          <div>
            {photographer.photographerIdx}
            <br/>
            {apply.photographerIdx}
            chat content goes here
          </div>
        </div>
      </div>

      <div className={`${styles.content} ${styles.send}`}>
        <div className={styles.textArea}>
          <textarea/>
          <div className={styles.sendBtn}>
            <SendIcon />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChatContainer
