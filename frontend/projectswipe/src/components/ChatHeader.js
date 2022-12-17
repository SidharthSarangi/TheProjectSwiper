import React from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


const ChatHeader = (props) => {
  const {user} = props ;
  let navigate = useNavigate() ;
  const [cookies , setCookie, removeCookie] = useCookies(['user']) ;

  const logout = () => {
    removeCookie('UserId' , cookies.UserId) ;
    removeCookie('AuthToken', cookies.AuthToken) ;
    navigate('/') ;
    window.location.reload() ;
  }

  return (
    <div className='chat-container-header'>
        <div className='profile'>
            <div className='img-container'>
                <img src={user.url} alt="profile pic"/>
            </div>
      <h3>{user.first_name}</h3>
        </div>
        <i className="fa fa-sign-out log-out-icon logoutBtn" style={{fontSize:'30px',color:'red'}} onClick={logout} title='Logout'>
          <span className='logoutWord'>Logout</span>
        </i>
    </div>
  )
}

export default ChatHeader