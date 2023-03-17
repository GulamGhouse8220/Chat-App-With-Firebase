import { ref } from 'firebase/storage';
import React, { useContext, useEffect, useRef } from 'react'
import Img from "../../src/img/images.jpg";
import { AuthContext } from '../Context/AuthContext';
import { ChatContexts } from '../Context/ChatContexts';



const Message = ({ message }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContexts)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])


  return (
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="users" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img}
          alt="users" />}
      </div>
    </div>
  )
}

export default Message