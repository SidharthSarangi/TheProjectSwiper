import React,{useState, useRef, useEffect,useContext} from 'react'
import axios from "axios" ;
import { SocketContext } from '../context/socket';
// import {io} from "socket.io-client" ;

const ChatInput = (props) => {
  const {user,clickedUser,getUsersMessages,getClickedUsersMessages}= props ;
  
  const [textArea, setTextArea] = useState("") ;
  const userId = user?.user_id ;
  const clickedUserId = clickedUser?.user_id ;

  // =============================
  // const socket = useRef() ;
  const socket = useContext(SocketContext);
  // useEffect(()=>{
  //   socket.current = io("ws://localhost:8900") ;
  // },[])
  // ================================

  const addMessage = async () =>{
     const message = {
      timestamp: new Date().toISOString(),
      from_userId : userId ,
      to_userId : clickedUserId ,
      message: textArea 
     }

     socket.emit("sendMessage",{
        senderId: userId,
        receiverId: clickedUserId,
        text: textArea
     })
    

     try {
       const response = await axios.post('http://localhost:8000/message',{message})
       getUsersMessages() ;
       getClickedUsersMessages() ;
       setTextArea("") ;
     } catch (error) {
        console.log(error) ;
     }
  }


  return (
    <div className='chat-input'>
        <textarea value={textArea} onChange={(e)=>setTextArea(e.target.value)} className='textAreaSpace'/>
        <button className='secondary-btn' onClick={addMessage}>submit</button>
    </div>
  )
}
  
export default ChatInput