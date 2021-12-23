import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';

import SendIcon from '@mui/icons-material/Send';
import { getApplyDetail } from '../../../api/Apply';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { confirmEstimate, confirmOrder } from '../../../api/Estimate';

import SockJsClient from 'react-stomp';
import SockJS from 'sockjs-client';
import { SERVER_URL } from '../../../constants';

function ChatContainer({ applyIdx, chatRoomIdx }) {

  const $websocket = useRef(null);

  let navigate = useNavigate()

  const userIdx = useSelector(store => store.auth.user.userIdx)

  const photographer = useSelector(store => store.auth.photographer)
  const [apply, setApply] = useState({})
  const [message, setMessage] = useState('')
  const [chatMessageList, setChatMessageList] = useState([
    {
      "chatMessageIdx": 4,
      "message": "ahaoaoaoao",
      "created": "2021-12-23T01:27:46.000+0000",
      "user": {
        "userIdx": 1,
        "name": "이기환",
        "nickName": "nickname1"
      }
    },
    {
      "chatMessageIdx": 5,
      "message": "ahaoaoaoao",
      "created": "2021-12-23T01:29:37.000+0000",
      "user": {
        "userIdx": 2,
        "name": "이기환",
        "nickName": "nickname2"
      }
    }
  ])
  const [loading, setLoading] = useState(true)



  const confirmEstimateHandler = async (estimateIdx, photographerIdx) => {
    const data = await confirmEstimate(estimateIdx, photographerIdx)
    setApply(data)
  }
  const confirmOrderHandler = async (estimateIdx, photographerIdx) => {
    const data = await confirmOrder(estimateIdx, photographerIdx)
    setApply(data)
  }
  useEffect(() => {
    const fetchData = async () => {
      const applyData = await getApplyDetail(applyIdx)
      setApply(applyData)
      console.log(applyData)
      setLoading(false)
    }
    fetchData()
  }, [])


  const handleMsg = msg => { console.log(msg); };
  const handleClickSendTemplate = () => { $websocket.current.sendMessage('/Template'); };
  const handleClickSendTo = () => {
    $websocket.current.sendMessage(message);
  };


  return (
    <div className={styles.container}>

      {
        !loading &&

        <div className={styles.top}>
          {
            (photographer && photographer.photographerIdx === apply.photographerIdx) ?
              <div>
                <button>{apply.status}</button>
              </div>

              :

              <div>
                {(apply.estimate.status === 1 || apply.estimate.status === 2) && <button onClick={() => confirmEstimateHandler(apply.estimate.estimateIdx, apply.photographerIdx)}>의뢰확정</button>}
                {apply.estimate.status === 3 && <button onClick={() => confirmOrderHandler(apply.estimate.estimateIdx, apply.photographerIdx)}>수행완료</button>}
                {apply.estimate.status === 4 && <button onClick={() => navigate(`/review/${apply.photographerIdx}/${apply.applyIdx}`)}>리뷰달기</button>}
              </div>
          }
        </div>
      }


      <div className={styles.read}>
        <div className={styles.chat}>
          {chatMessageList.map(chatMessage => <MessageBox message={chatMessage} userIdx={userIdx} />)}

          {/* 
            url : WebSocketConfig endpoint = baseUrl/start
            topic : 서버가 메시지를 보낼 시 수신할 토픽을 지정. 다중지정 가능 = @sendTo(여기있는 url)
          */}
          {/* <SockJsClient
            url={`${SERVER_URL}start`}
            topics={[`/topics/sendTo/${chatRoomIdx}`]}
            onMessage={msg => setMessage([msg])} ref={$websocket}
          /> */}

          <SockJsClient url={`${SERVER_URL}start`} topics={[`/topics/sendTo/${chatRoomIdx}/${message}`]}
            onMessage={msg =>
              setMessage([message, msg])
            } ref={$websocket} />
          <button onClick={handleClickSendTo}>SendTo</button>
          <button onClick={handleClickSendTemplate}>SendTemplate</button>
          <button onClick={handleClickSendTo}>SendTo</button>


          {/* {
            JSON.parse(message).map(message => {
              <MessageBox message={message} />
            })
          } */}

        </div>
      </div>

      <div className={styles.send}>
        <div className={styles.textArea}>
          <textarea value={message} onChange={e => setMessage(e.target.value)} />
          <div className={styles.sendBtn} onClick={handleClickSendTo}>
            <SendIcon />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ChatContainer

const MessageBox = ({ message, userIdx }) => {

  const messageBox = (
    <div className={styles.box}>
      <label>{message.user.nickName}</label>
      <div>
        {message.message}
      </div>
    </div>
  )
  return (
    message.user.userIdx === userIdx ?
      <div className={styles.myMessage}>
        {messageBox}
      </div>

      :

      <div className={styles.otherMessage}>
        {messageBox}
      </div>
  )
}