import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getUserWithPIdx } from '../../api/User';
import ChatRoomContainer from '../../components/ChatRoomContainer/ChatRoomContainer';
import styles from '../Pages.module.css'


function ChatRoomPage() {

  let { photographerIdx, applyIdx, chatRoomIdx } = useParams();

  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchData = async() => {
      const data = await getUserWithPIdx(photographerIdx)
      setUser(data)
      console.log(data)
    }
    fetchData()
  },[])

  return (
    <div className={styles.container}>
      <ChatRoomContainer user={user} applyIdx={applyIdx} chatRoomIdx={chatRoomIdx}/>
    </div>
  )
}

export default ChatRoomPage
