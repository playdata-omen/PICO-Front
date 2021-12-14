import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getPhotographerUser } from '../../api/User';
import ChatRoomContainer from '../../components/ChatRoomContainer/ChatRoomContainer';
import styles from '../Pages.module.css'


function ChatRoomPage() {

  let { userIdx } = useParams();

  const [user, setUser] = useState({})

  useEffect(async() => {
    const response = await getPhotographerUser(userIdx)
    setUser(response)
    console.log(user)
  }, [])


  return (
    <div className={styles.container}>
      <ChatRoomContainer user={user}/>
    </div>
  )
}

export default ChatRoomPage
