import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatContainer.module.css';

import SendIcon from '@mui/icons-material/Send';
import { getApplyDetail } from '../../../api/Apply'
import { getChatMessageList } from '../../../api/Chat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { confirmEstimate, confirmOrder } from '../../../api/Estimate';

import SockJsClient from 'react-stomp';
import { ACCESS_TOKEN, SERVER_URL } from '../../../constants';

function ChatContainer({ applyIdx, chatRoomIdx }) {



  let navigate = useNavigate()



  const photographer = useSelector(store => store.auth.photographer)
  const [apply, setApply] = useState({})

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
      const chatMessageListData = await getChatMessageList(chatRoomIdx)
      console.log(chatMessageListData)
      chatMessageListData.sort((a, b) => a.chatMessageIdx - b.chatMessageIdx)
      setChatMessageList(chatMessageListData)
      setApply(applyData)
      console.log(applyData)
      setLoading(false)
    }
    fetchData()
  }, [])




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

      <div className={styles.bottom}>
        <ChatWebSocketContainer chatRoomIdx={chatRoomIdx} chatMessageList={chatMessageList} setChatMessageList={setChatMessageList} />
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

const ChatWebSocketContainer = ({ chatRoomIdx, chatMessageList, setChatMessageList }) => {

  const userIdx = useSelector(store => store.auth.user.userIdx)

  const $websocket = useRef(null);
  const [message, setMessage] = useState(null)
  const [send, setSend] = useState("")



  const handleClickSendTo = () => {
    console.log($websocket)
    console.log(localStorage.getItem(ACCESS_TOKEN))
    console.log(chatRoomIdx)
    console.log(message)
    console.log('start')
    $websocket.current.sendMessage(`/sendTo/${chatRoomIdx}/${send}/${localStorage.getItem(ACCESS_TOKEN)}`, send);
    console.log('end')
  }

  useEffect(() => {
    message && setChatMessageList([...chatMessageList, message])

    // chatMessageIdx: 16
    // chatRoomIdx: 1
    // created: 1640333290982
    // message: "hello"
    // userIdx: 1

    console.log(message)
  }, [message])


  return (

    <React.Fragment>
      <div className={styles.read}>
        <div className={styles.chat}>
          {/* onMessage={응답값} */}
          <SockJsClient url={`${SERVER_URL}start`} topics={[`/topics/sendTo/${chatRoomIdx}`]}
            onConnect={() => console.log('connected')}
            onMessage={msg => setMessage(msg)} ref={$websocket}
          />
          {chatMessageList.map(chatMessage => <MessageBox message={chatMessage} userIdx={userIdx} key={userIdx} />)}
        </div>
      </div>

      <div className={styles.send}>
        <div className={styles.textArea}>
          <textarea onChange={e => setSend(e.target.value)}/>
          <div className={styles.sendBtn} onClick={handleClickSendTo}>
            <SendIcon />
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}