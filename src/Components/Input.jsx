import React, { useContext, useState } from 'react'
import Img from "../../src/img/images (4).png"
import Attach from "../../src/img/Ic_attach_file_48px.svg.png"
import { async } from '@firebase/util';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { arrayUnion, Timestamp, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../Context/AuthContext';
import { ChatContexts } from '../Context/ChatContexts';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContexts);

  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(

        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    }
    else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".data"]: serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".data"]: serverTimestamp()
    });

    setText("");
    setImg(null);
  };
  return (
    <div className='inputs'>
      <input type="text" placeholder='type something...' onChange={e => setText(e.target.value)} value={text} />
      <div className="send">
        <img src={Attach} alt='files' width={30} />
        <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} />
        <label htmlFor='file'>
          <img src={Img} alt='images' width={30} />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input