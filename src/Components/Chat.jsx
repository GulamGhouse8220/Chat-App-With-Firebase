import React, { useContext } from 'react';
import Gam from "../../src/img/1024px-Video_camera_icon.svg.png";
import Add from "../../src/img/add-friends-14.png";
import More from "../../src/img/more-512 (1).webp";
import Messages from './Messages';
import Input from './Input';
import { ChatContexts } from '../Context/ChatContexts';


const Chat = () => {
  const { data } = useContext(ChatContexts);

  return (
    <div className='Chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Gam} alt='camera' />
          <img src={Add} alt='add person' />
          <img src={More} alt='more edit' />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>

  )
}

export default Chat