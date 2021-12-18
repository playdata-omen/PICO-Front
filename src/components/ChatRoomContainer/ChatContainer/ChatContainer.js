import React, { useState } from 'react'
import styles from './ChatContainer.module.css'

import SendIcon from '@mui/icons-material/Send';

function ChatContainer() {
  return (
    <div className={styles.container}>

      <div className={`${styles.content} ${styles.top}`}>
        <button>의뢰확정</button>
        <button>완료</button>
      </div>

      <div className={`${styles.content} ${styles.read}`}>
        <div className={styles.chat}>
          <div>
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

function ChatScreen() {
  const [chatRoom, setChatRoom] = useState({
    chatRoomIdx: 0,
  })
}
