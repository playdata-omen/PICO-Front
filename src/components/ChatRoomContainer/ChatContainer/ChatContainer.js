import React, { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { getApplyDetail } from '../../../api/Apply';
import { getChatMessageList } from '../../../api/Chat';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { confirmEstimate, confirmOrder } from '../../../api/Estimate';
import { ACCESS_TOKEN, SERVER_URL } from '../../../constants';
import SockJsClient from 'react-stomp';
import styles from './ChatContainer.module.css';

function ChatContainer({ applyIdx, chatRoomIdx }) {
  let navigate = useNavigate();

  const photographer = useSelector((store) => store.auth.photographer);
  const [apply, setApply] = useState({});

  const [loading, setLoading] = useState(true);

  const confirmEstimateHandler = async (estimateIdx, photographerIdx) => {
    const data = await confirmEstimate(estimateIdx, photographerIdx);
    setApply(data);
  };

  const confirmOrderHandler = async (estimateIdx, photographerIdx) => {
    const data = await confirmOrder(estimateIdx, photographerIdx);
    setApply(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const applyData = await getApplyDetail(applyIdx);
      setApply(applyData);
      console.log(applyData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {!loading && (
        <div className={styles.top}>
          {photographer &&
            photographer.photographerIdx === apply.photographerIdx ? (
            <div>
              <button>{apply.status}</button>
            </div>
          ) : (
            <div>
              {(apply.estimate.status === 1 || apply.estimate.status === 2) && (
                <button onClick={() => confirmEstimateHandler(apply.estimate.estimateIdx, apply.photographerIdx)}>
                  의뢰확정
                </button>
              )}

              {apply.estimate.status === 3 && (
                <button onClick={() => confirmOrderHandler(apply.estimate.estimateIdx, apply.photographerIdx)}>
                  수행완료
                </button>
              )}

              {apply.estimate.status === 4 && (
                <button onClick={() => navigate(`/review/${apply.photographerIdx}/${apply.applyIdx}`)}>
                  리뷰달기
                </button>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.bottom}>
        <ChatWebSocketContainer chatRoomIdx={chatRoomIdx} />
      </div>
    </div>
  );
}

export default ChatContainer;

const MessageBox = ({ message, userIdx }) => {
  const messageBox = (
    <div className={styles.box}>
      <label>{message.user.nickName}</label>
      <div>{message.message}</div>
    </div>
  );
  return (
    message.user.userIdx === userIdx ? (
      <div className={styles.myMessage}>{messageBox}</div>
    ) : (
      <div className={styles.otherMessage}>{messageBox}</div>
    )
  );
};

const ChatWebSocketContainer = ({ chatRoomIdx }) => {
  const userIdx = useSelector((store) => store.auth.user.userIdx);

  const $websocket = useRef(null);
  const scrollRef = useRef();

  const [chatMessageList, setChatMessageList] = useState([]);
  const [message, setMessage] = useState(null);
  const [send, setSend] = useState('');

  const handleClickSendTo = () => {
    $websocket.current.sendMessage(
      `/sendTo/${chatRoomIdx}/${send}/${localStorage.getItem(ACCESS_TOKEN)}`,
      send,
    );
    setSend('');
  };

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollRef.current;
    scrollRef.current.scrollTop = scrollHeight - clientHeight;
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      handleClickSendTo();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const chatMessageListData = await getChatMessageList(chatRoomIdx);
      console.log(chatMessageListData);
      chatMessageListData.sort((a, b) => a.chatMessageIdx - b.chatMessageIdx);
      setChatMessageList(chatMessageListData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    message && setChatMessageList([...chatMessageList, message]);
  }, [message]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessageList]);

  return (
    <React.Fragment>
      <div className={styles.read}>
        <div className={styles.chat} ref={scrollRef}>
          <SockJsClient
            url={`${SERVER_URL}start`}
            topics={[`/topics/sendTo/${chatRoomIdx}`]}
            onConnect={() => console.log('connected')}
            onMessage={(msg) => setMessage(msg)}
            ref={$websocket}
          />
          {chatMessageList.map((chatMessage) => (
            <MessageBox
              message={chatMessage}
              userIdx={userIdx}
              key={chatMessage.chatMessageIdx}
            />
          ))}
        </div>
      </div>

      <div className={styles.send}>
        <div className={styles.textArea}>
          <textarea
            value={send}
            onChange={(e) => setSend(e.target.value)}
            onKeyDown={(e) => onEnterPress(e)}
          />
          <div className={styles.sendBtn} onClick={handleClickSendTo}>
            <SendIcon />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
