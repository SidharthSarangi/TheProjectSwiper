import React ,{useState,useEffect,useRef,useContext} from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from "axios" ;
import { SocketContext } from '../context/socket';
// import {io} from "socket.io-client" ;

const ChatDisplay = (props) => {

  const {user, clickedUser} = props ;

  const userId = user?.user_id ;
  const clickedUserId = clickedUser?.user_id ;
  const [usersMessages, setUsersMessages] = useState(null) ;
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null) ;

  const [arrivalMessage, setArrivalMessage] = useState(null) ;
  // const socket= useRef() ;
  const socket = useContext(SocketContext);
  

  const getUsersMessages = async () =>{
    try {
      const response = await axios.get('http://localhost:8000/messages',{params:{userId : userId, correspondingUserId: clickedUserId}})
      setUsersMessages(response.data) ;
    } catch (error) {
      console.log(error) ;
    }
  }

  const getClickedUsersMessages = async () =>{
    try {
      const response = await axios.get('http://localhost:8000/messages',{params:{userId : clickedUserId, correspondingUserId: userId}})
      setClickedUsersMessages(response.data) ;
    } catch (error) {
      console.log(error) ;
    }
  }

  useEffect(() => {
    getUsersMessages() ;
    getClickedUsersMessages() ;
  }, [])


  const messages = [] ;

  usersMessages?.forEach(message =>{
    const formattedMessage = {} ;
    formattedMessage['name'] = user?.first_name ;
    formattedMessage['img'] = user?.url ;
    formattedMessage['message'] = message.message ;
    formattedMessage['timestamp'] = message.timestamp ;
    formattedMessage['own'] = 1 ;
    messages.push(formattedMessage) ;
  })

  clickedUsersMessages?.forEach(message =>{
    const formattedMessage = {} ;
    formattedMessage['name'] = clickedUser?.first_name ;
    formattedMessage['img'] = clickedUser?.url ;
    formattedMessage['message'] = message.message ;
    formattedMessage['timestamp'] = message.timestamp ;
    formattedMessage['own'] = 0 ;
    messages.push(formattedMessage) ;
  })

  const descendingOrderMessages = messages?.sort((a,b)=>a.timestamp.localeCompare(b.timestamp)) ;
  

  useEffect(()=>{
    // socket.current = io("ws://localhost:8900") ;
      socket.on("getMessage",(data)=>{
        setArrivalMessage({
          // sender: data.senderId,
          // text : data.text,
          // createdAt: Date.now(),
          timestamp: new Date().toISOString(),
          from_userId : data.senderId ,
          to_userId : data.receiverId ,
          message: data.text 
        })
      })
  },[])

  useEffect(() => {
    arrivalMessage && 
    arrivalMessage.to_userId===userId && arrivalMessage.from_userId===clickedUserId &&
    setClickedUsersMessages((prev)=> [...prev, arrivalMessage]); 
  }, [arrivalMessage, clickedUser])
  
  useEffect(()=>{
    socket.emit("addUser", userId) ;
    socket.on("getUsers", users=>{
      // console.log(users) ;
    })
  },[userId])
  

  // console.log(socket) ;


  return (
    <>
        <Chat descendingOrderMessages={descendingOrderMessages}/>
        <ChatInput 
          user={user}
          clickedUser = {clickedUser}
          getUsersMessages= {getUsersMessages}
          getClickedUsersMessages={getClickedUsersMessages}
        />
    </>
  )
}

export default ChatDisplay 