import React from 'react';
import ProfileContainer from '../ProfileContainer/ProfileContainer';
import ChatContainer from './ChatContainer/ChatContainer';
import styles from './ChatRoomContainer.module.css';

function ChatRoomContainer({ user, applyIdx, chatRoomIdx }) {
  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <ChatContainer applyIdx={applyIdx} chatRoomIdx={chatRoomIdx} />
      </div>
      <div className={styles.profileContainer}>
        <ProfileContainer user={user} />
      </div>
    </div>
  );
}

export default ChatRoomContainer;
