import React, { useContext, useEffect, useState } from 'react'
import Img1 from "../../src/img/589a1e343537f02984bed8d57bdf0bf9.jpg"
import Img2 from "../../src/img/hd-a5u9zq0a0ymy2dug.jpg"
import Img3 from "../../src/img/83b001d629f121eea6797b62cdcb4c68.jpeg"
import Img4 from "../../src/img/photo-1615572766543-06c21416eb05.jpg"
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { updateCurrentUser } from 'firebase/auth'
import { AuthContext } from '../Context/AuthContext'
import { ChatContexts } from '../Context/ChatContexts'

const Chats = () => {

  const [chats, setChats] = useState([])

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContexts);


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  return (
    <div className='Chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt='user icon' />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats