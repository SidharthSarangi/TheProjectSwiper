import React,{useEffect,useRef} from "react";
import {format} from "timeago.js" ;

const Chat = (props) => {
  const {descendingOrderMessages} = props ;
  const scrollRef = useRef() ;

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"}) ;
  },[descendingOrderMessages])

  return (
    <>
      <div className="chat-display">
          {
            descendingOrderMessages.map((ele,_index)=>(
              <div key={_index} ref={scrollRef} className={ele.own?'message own':'message'}>
                <div className="chat-message-header">
                  <div className="img-container">
                    <img src={ele.img} alt="profile"/>
                  </div>
                  <p>{ele.own?'You:':ele.name}</p>
                </div>
                <p className="messageText">{ele.message}</p>
                <div className='messageBottom'>{format(ele.timestamp)}</div>
              </div>
            ))
          }

      </div>
    </>
  );
}

export default Chat;
