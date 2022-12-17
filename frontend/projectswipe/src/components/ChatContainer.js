import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import EditPost from "./EditPost";

const ChatContainer = (props) => {
  const { user } = props;
  const [clickedUser, setClickedUser] = useState(null);
  // let navigate = useNavigate() ;

 const [showEditModal, setShowEditModal] = useState(false) ;

 const handleEdit = () =>{
    setShowEditModal(true) ;
 }

  return (
    <div className="chat-container">
      <ChatHeader user={user} />
      <div>
        <button className="option" onClick={() => setClickedUser(null)}>
          Matches
        </button>
        <button className="option" disabled={!clickedUser}>
          Chat
        </button>
        <i className="fa fa-pencil editBtn" onClick={handleEdit} title='edit your details'>
          {/* <Link to='/edit' className="editWord">Edit</Link> */}
          <span className="editWord">edit</span>
        </i>
      </div>

      {!clickedUser && 
        <MatchesDisplay
          matches={user.matches}
          setClickedUser={setClickedUser}
        />
      }

      {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
      {showEditModal &&  <EditPost setShowEditModal={setShowEditModal}/> }
    </div>
  );
};

export default ChatContainer;
